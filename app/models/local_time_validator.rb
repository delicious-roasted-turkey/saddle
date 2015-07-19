class LocalTimeValidator < ActiveModel::EachValidator

  def validate_each(record, attribute, value)
    if !valid_local_time? value then
       #record.errors[attribute] = "Not a valid local time"
      record.errors[attribute] << (options[:message] || "Not a valid local time")
    end
  end

  private

  # Returns true if and only if the passed string
  # represents a valid local time
  def valid_local_time? time
    if !time.instance_of? String then
      return false
    end
    if !time.match /^[0-9]{2}:[0-9]{2}$/
      return false
    end
    hours_str = time[0..1]
    minutes_str = time[3..4]
    if(!(hours_str.between? "00", "23")) then
      return false
    end
    if(!(minutes_str.between? "00", "59")) then
      return false
    end
    return true
  end

end