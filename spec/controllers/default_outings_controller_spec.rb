require 'rails_helper'

RSpec.describe DefaultOutingsController, type: :controller do

  describe 'GET index' do

    before :each do
      DefaultOuting.create(name: 'Midday Trip', time: '12:30')
      DefaultOuting.create(name: 'Morning Trip', time: '09:00')
      get 'index', format: :json
    end

    it 'should be successful' do
      expect(response).to be_success
    end

    it 'should return a JSON array' do
      body = JSON.parse(response.body)
      expect(body).to be_an Array
    end

    it 'should return existing default outings in natural order' do
      body = JSON.parse(response.body)
      expect(body.length).to eql 2
      expect(body[0]['name']).to eql 'Morning Trip'
      expect(body[1]['name']).to eql 'Midday Trip'
      expect(body[0]['time']).to eql '09:00'
      expect(body[1]['time']).to eql '12:30'
    end
  end

end
