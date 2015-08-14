require 'rails_helper'

RSpec.describe AvailableHorseCountsController, type: :controller do

  describe 'create' do

    before :each do
      post :create, {:available_horse_count => {:num_horses => 42, :from => '2013-02-01'}}
    end

    it 'should be successful' do
      expect(response).to be_success
    end

  end

end
