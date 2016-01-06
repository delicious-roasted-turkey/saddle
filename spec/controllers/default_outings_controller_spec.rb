require 'rails_helper'

RSpec.describe DefaultOutingsController, type: :controller do

  before :each do
    user = FactoryGirl.create :user
    sign_in user
  end

  describe 'index' do

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

  describe 'create' do

    before :each do
      DefaultOuting.delete_all
      post 'create',  { 'default_outing' => {'name' => 'My testing outing', 'time' => '23:00'}}
    end

    it 'should be successful' do
      expect(response).to be_success
    end

    it 'should create a default outing' do
      expect(DefaultOuting.count).to eq 1
      expect(DefaultOuting.first.name).to eq 'My testing outing'
    end
  end

  describe 'delete' do

    before :each do
      @defOut = DefaultOuting.create(name: 'An example', time: '09:00')
      delete 'destroy', {'id' => @defOut.id}
    end

    it 'should be successful' do
      expect(response).to be_success
    end

    it 'should delete the model' do
      expect(DefaultOuting.exists?(@defOut.id)).to be false
    end
  end

  describe 'show' do

    before :each do
      @defOut = DefaultOuting.create(name: 'An example', time: '09:00')
      get 'show', {'id' => @defOut.id, 'format' => :json}
    end

    it 'should be successful' do
      expect(response).to be_success
    end

    it 'should get the correct object' do
      body = JSON.parse(response.body)
      expect(body['id']).to eq(@defOut.id)
    end

  end
end
