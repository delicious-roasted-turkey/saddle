class Day < ActiveRecord::Base

  has_many :outings

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
        puts def_out
        if (outings.find_by_default_outing_id def_out.id).nil?
          outings.new (Outing.by_default_outing_params def_out)
        end
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
