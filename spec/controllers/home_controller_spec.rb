require 'rails_helper'

RSpec.describe HomeController, type: :controller do

  it "renders main layout" do
    expect(get :index).to render_template("layouts/application")
  end

end
