require 'rails_helper'

RSpec.describe AvailableHorseCount, type: :model do

  describe 'get current number of horses' do

    it 'should return 0 if there is no info' do
      expect(AvailableHorseCount.current_count).to be 0
    end

    it 'should return the correct number of horses' do
      AvailableHorseCount.create! num_horses: 15, from: 2.days.ago
      AvailableHorseCount.create! num_horses: 13, from: 4.days.ago
      AvailableHorseCount.create! num_horses: 17, from: 2.days.from_now
      expect(AvailableHorseCount.current_count).to be 15
    end
  end

end
