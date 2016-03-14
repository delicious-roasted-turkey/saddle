class Day < ActiveRecord::Base

  has_many :outings, :autosave => false

  # has_many :reservations, :through => :outings

  has_and_belongs_to_many :dismissed_default_outings,
                          :class_name => 'DefaultOuting',
                          :join_table => 'dismissed_default_outings',
                          :readonly => true,
                          :after_remove => :uncache,
                          :after_add => :uncache

  after_touch :uncache

  validates :date, presence: true

  @@cache = Hash.new

  def self.clear_full_cache
    @@cache = Hash.new
  end

  def uncache obj=nil
    @@cache.delete self.date
  end

  def self.by_date(date, options={})
    day = existing_or_new date
    if options[:with_def_outings]
      day.put_def_outings
    end
    day
  end

  def put_def_outings
    Day.put_def_outings [self]
  end

  def self.put_def_outings(days)

    global_def_outs = DefaultOuting.all

    days.each do |day|
      if day.date < Date.today.at_beginning_of_day
        # Date in the past. Must not return default outings
      else
        # Create default outings for this day by copying the data
        # from the global default outings
        existing_outings_def_out_ids = Set.new (day.outings.map { |o| o.default_outing_id })
        dismissed_def_out_ids = Set.new (day.dismissed_default_outings.map {|ddo| ddo.id})
        global_def_outs.each do |def_out|
          if existing_outings_def_out_ids.include? def_out.id
            # There's already an outing that corresponds to this default
            # outing
          elsif dismissed_def_out_ids.include? def_out.id
            # The default outing has been dismissed for this day
          else
            day.outings.new (Outing.by_default_outing_params def_out)
          end
        end
      end
    end
  end


  def dismiss_default_outing def_outing_id
    def_outing = DefaultOuting.find def_outing_id
    dismissed_default_outings << def_outing
    save! if !persisted?
    outings.reload
    put_def_outings
  end

  private

  def self.existing_or_new date
    if Day.where(date: date).present?
      Day.find_by_date date
    else
      new date: date
    end
  end

  def self.cached_for_calendar start_date_str, end_date_str
    start_date = Date.parse start_date_str
    end_date = Date.parse end_date_str
    dates = (start_date..end_date).to_set
    days_from_cache = []

    # Get the days that we have in cache
    dates.each do |date|
      if @@cache.has_key? date
        # days_from_cache << @@cache[date]
      end
    end

    # See which dates we still have to resolve, because they weren't cached
    dates.subtract days_from_cache.map { |d| d.date}

    # Obtain from the database whichever days are there
    days_from_db = Day.includes({:outings => :reservations}, :dismissed_default_outings)
              .where(:date => dates.to_a)

    # See which days we still don't have. These will need to be created (but not
    # persisted).
    dates.subtract days_from_db.map { |d| d.date}
    new_days = dates.collect { |d|
        new ({date: d.iso8601})
    }

    not_cached_days = [days_from_db, new_days].flatten

    Day.put_def_outings not_cached_days

    not_cached_days.each do |d|
      @@cache[d.date] = d
    end

    result = [days_from_cache, not_cached_days].flatten

    result

  end

end
