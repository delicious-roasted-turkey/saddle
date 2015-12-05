class Day < ActiveRecord::Base

  has_many :outings, :autosave => false

  has_and_belongs_to_many :dismissed_default_outings,
                          :class_name => 'DefaultOuting',
                          :join_table => 'dismissed_default_outings',
                          :readonly => true

  validates :date, presence: true

  private_class_method :new

  def self.by_date(date, options={})
    day = existing_or_new date
    if options[:put_def_outings]
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

  def self.range start_date_str, end_date_str
    start_date = Date.parse start_date_str
    end_date = Date.parse end_date_str
    days = Day.where(:date => start_date..end_date)
    pointer = start_date
    present_dates = Set.new (days.map { |day| day.date })
    while pointer <= end_date
      if !present_dates.include? pointer
        days << (new ({date: pointer.iso8601}))
      end
      pointer = pointer.next_day
    end
    Benchmark.bm(7) do |x|
      x.report("put_def_outings: ") { Day.put_def_outings(days) }
    end
    # Day.put_def_outings days
    days
  end

end
