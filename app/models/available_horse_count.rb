class AvailableHorseCount < ActiveRecord::Base

  @@mutex = Mutex.new

  validates :num_horses, :presence => true, :numericality => true
  validates :from, :presence => true

  default_scope { order(:from) }

  after_create do
    self.class.clear_cached_counts
  end

  after_update do
    self.class.clear_cached_counts
  end

  after_destroy do
    self.class.clear_cached_counts
  end

  def self.current_count
    count_at_date DateTime.now
  end

  def self.count_at_date date_time

    @@mutex.synchronize do

      if @@cached_counts.nil?
        @@cached_counts = order(:from => :asc).all
      end

      last_count_index = @@cached_counts.rindex do |ahc|
        ahc.from <= date_time
      end

      if last_count_index.nil?
        count = 0
      else
        count = @@cached_counts[last_count_index].num_horses
      end

      count

    end
  end

  def self.clear_cached_counts
    @@cached_counts = nil
  end

  clear_cached_counts
end
