require 'rails_helper'

RSpec.describe DaysController, type: :controller do

  describe 'show' do

    it 'should return a day that corresponds to the given date' do
      get 'show', date: '2123-02-23'
      expect(response).to be_success
      body = JSON.parse(response.body)
      expect(body['date']).to eq '2123-02-23'
    end

  end

end
