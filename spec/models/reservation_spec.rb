require 'rails_helper'

RSpec.describe Reservation, type: :model do


  describe 'changes update outing' do

    before_each do
      Reservation.delete_all
      Outing.delete_all
      Day.delete_all
    end

    #Day.create :date => '2015-07-25'
    #day = Day.by_date '2105-07-25'

    #outing = Outing.new
    #outing.time = '09:00'
    #outing.day = day

    it 'the outing gets marked as updated when a reservation is created' do
      day = FactoryGirl.create(:day)
    #  rsv = Reservation.new
    #  rsv.outing = outing
    #  rsv.save!
    end
    
  end

  #pending "add some examples to (or delete) #{__FILE__}"
end
