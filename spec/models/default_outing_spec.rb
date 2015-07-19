require 'rails_helper'
require 'spec_helper'

RSpec.describe DefaultOuting, type: :model do

  describe "attributes" do
    it {should respond_to :name, :time}
  end

  describe "validation" do

    it { should accept_values_for(:name, "Morning walk", "!!") }
    it { should_not accept_values_for(:name, nil, "", " ")}

  end

end
