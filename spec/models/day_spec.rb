require 'rails_helper'

RSpec.describe Day, type: :model do
  
  describe 'get the day given a date' do
    
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

  describe 'unconfirmed outings by default' do

    before :each do
      # Create default outings
      @morning_def_o = DefaultOuting.create :name => 'Morning', :time => '09:00'
      @afternoon_def_o = DefaultOuting.create :name => 'Afternoon', :time => '17:00'
    end

    describe 'for days in the future' do

      before :each do
        @day = Day.by_date 2.days.from_now, :with_def_outings => true
      end

      it 'returns default unconfirmed outings' do
        outing = @day.outings.select{|o| o.name.eql? 'Morning'}.first
        expect(outing).to_not be_nil
        expect(outing.confirmed?).to be false
      end

      it 'does not return a default outing if it has been cancelled' do
        @day.dismiss_default_outing @morning_def_o.id
        outing = @day.outings.select{|o| o.name.eql? 'Morning'}.first
        expect(outing).to be_nil
      end

    end

    it 'does not return default outings for a day in the past' do
      day = Day.by_date 2.days.ago
      expect(day.outings).to be_empty
    end

  end
end
