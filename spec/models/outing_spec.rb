require 'rails_helper'

RSpec.describe Outing, type: :model do

  describe 'confirming an outing' do

    it 'simply updates the outing if it is already persisted' do
      o = Outing.new time: '09:00', name: 'Morning trip'
      o.day = Day.by_date 2.days.from_now
      o.save!
      expect(o.confirmed?).to be false
      o.confirm!
      expect(o.confirmed?).to be true
    end

    it 'persists and confirms the outing if it is not persisted' do
      o = Outing.new time: '09:00', name: 'Morning trip'
      o.day = Day.by_date 2.days.from_now
      expect(o.confirmed?).to be false
      o.confirm!
      expect(o.confirmed?).to be true
      expect(o.persisted?).to be true
    end

  end

end
