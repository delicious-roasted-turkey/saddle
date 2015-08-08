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
    if date < Date.today.at_beginning_of_day
      # Date in the past. Must not return default outings
    else
      # Create default outings for this day by copying the data
      # from the global default outings
      DefaultOuting.all.each do |def_out|
        if outings.exists? :default_outing_id => def_out.id
          # There's already an outing that corresponds to this default
          # outing
        elsif dismissed_default_outings.exists? def_out.id
          # The default outing has been dismissed for this day
        else
          outings.new (Outing.by_default_outing_params def_out)
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

end
