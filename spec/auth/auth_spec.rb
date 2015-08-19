require 'rails_helper'

describe 'restricted areas', :type => :request do

  describe 'without user logged in' do

    it 'html requests should redirect to login page' do
      get '/'
      expect(response).to redirect_to('/users/sign_in')
    end

    it 'json requests should return forbidden' do
      get '/default_outings.json'
      expect(response).to have_http_status(401)
    end

  end

  describe 'with user logged in' do

    before :each do
      user = FactoryGirl.create :user
      post '/users/sign_in', {
        :user => {
          :email => user.email,
          :password => user.password
        }
      }
    end

    it 'home page can be successfully accessed' do
      get '/'
      expect(response).to have_http_status(200)
      expect(response).to render_template(:home)
    end

    it 'JSON api can be accessed' do
      get '/default_outings.json'
      expect(response).to have_http_status(200)
    end

  end

end
