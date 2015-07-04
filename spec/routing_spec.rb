require "rails_helper"

RSpec.describe "routes", type: :routing do

  it "should route root to home controller" do
    expect(get: "/").to route_to(
      controller: "home",
      action: "index"
    )
  end
end
