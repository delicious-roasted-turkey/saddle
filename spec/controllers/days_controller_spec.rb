require 'rails_helper'
require 'support/render_views'

RSpec.describe DaysController, type: :controller do

  describe 'show' do

    before :each do
      user = FactoryBot.create :user
      sign_in user
    end

    it 'should return a day that corresponds to the given date' do
      get 'show', date: '2123-02-23', format: :json
      expect(response).to be_success
      body = JSON.parse(response.body)
      expect(body['date']).to eq '2123-02-23'
    end

  end

end
