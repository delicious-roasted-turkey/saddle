require 'rails_helper'

RSpec.describe Day, type: :model do
  
  describe 'get the date given a date' do
    
    before :each do
      Day.delete_all
      Day.create({:date => '2015-07-25'})
    end
    
    it 'should return the corresponding day if it exists' do
      day = Day.by_date '2015-07-25'
      expect(day.persisted?).to be true
    end

    it 'should return a day even if it has not been persisted' do
      day = Day.by_date '2215-07-25'
      expect(day.persisted?).to be false
    end

  end

  # describe 'unconfirmed outings by default' do
  #
  #   before :each do
  #     # Create default outings
  #     DefaultOuting.create :name => 'Morning', :time => '09:00'
  #     DefaultOuting.create :name => 'Afternoon', :time => '17:00'
  #   end
  #
  #   it 'returns default unconfirmed outings for an unpersisted day in the future' do
  #     day = Day.by_date 2.days.from_now
  #     outing = day.outings.select{|o| o.name.eql? 'Morning'}.first
  #     expect(outing).to_not be_nil
  #     expect(outing.confirmed).to be false
  #   end
  #
  #   it 'does not return default outings for a persisted day in the future' do
  #     Day.create! date: 2.days.from_now
  #     day = Day.by_date 2.days.from_now
  #     expect(day.outings).to be_empty
  #   end
  #
  #   it 'does not return default outings for a day in the past' do
  #     day = Day.by_date 2.days.ago
  #     expect(day.outings).to be_empty
  #   end
  #
  # end
  
end
