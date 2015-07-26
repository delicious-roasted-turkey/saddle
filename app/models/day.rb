class Day < ActiveRecord::Base

  has_many :outings

  validates :date, presence: true

  private_class_method :new

  def self.by_date date
    day = existing_or_new date
    # day.obtain_outings
    day
  end

  def obtain_outings
    if persisted?
      # Nothing to do, since outings will be obtained from database
    elsif date < Date.today.at_beginning_of_day
       # Date in the past. Must not return default outings
    else
      # Create default outings for this day by copying the data
      # from the global default outings
      DefaultOuting.all.each do |def_out|
        outings.new({
          :name => def_out.name,
          :time => def_out.time
        })
      end
    end
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
