require 'rails_helper'

RSpec.describe RegistrationsController do

  describe 'registration of users via controllers is disabled' do

    it 'responds with status "forbidden" to all actions' do

      actions = [
        {method: :get, name: :new},
        {method: :post, name: :create},
        {method: :get, name: :edit},
        {method: :put, name: :update},
        {method: :delete, name: :destroy},
        {method: :get, name: :cancel}
      ]

      actions.each do |action|
        @request.env['devise.mapping'] = Devise.mappings[:user]
        request.accept = 'application/json'
        meth = method(action[:method])
        # e.g. get :new, :format => :json
        meth.call action[:name]
        expect(response).to have_http_status(403)
      end
    end
  end

end