require 'rails_helper'

RSpec.describe OutingsController, type: :controller do

  before :each do
    Outing.create_confirmed({:time => '09:00'}, '2012-12-12')
    @outing = Outing.order(:created_at).last
  end

  describe 'create' do

    def do_request
      params = {
        :outing => {
          :time => '09:00',
          :day => {
            :date => '2012-12-12'
          }
        }
      }
      post 'create', params
    end

    it 'responds to create' do
      expect{do_request}.to_not raise_error
    end

    it 'creates an outing' do
      expect{do_request}.to change{Outing.count}.by 1
    end

  end

  describe 'show' do

    it 'responds' do
      expect{get 'show', :id => @outing.id}.to_not raise_error
    end
  end

end
