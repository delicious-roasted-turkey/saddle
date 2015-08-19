require 'rails_helper'

RSpec.describe RegistrationsController do

  describe 'registration of users via controllers is disabled' do

    it 'responds with status "forbidden" to registration action' do
      @request.env['devise.mapping'] = Devise.mappings[:user]
      request.accept = 'application/json'
      post :create, :format => :json
      expect(response).to have_http_status(403)
    end
  end

end