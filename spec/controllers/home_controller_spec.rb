require 'rails_helper'

RSpec.describe HomeController, type: :controller do

  before :each do 
      user = FactoryBot.create :user
      sign_in user
  end

  it "renders main layout" do
    expect(get :index).to render_template("layouts/application")
  end

end
