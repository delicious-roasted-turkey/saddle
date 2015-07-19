require 'spec_helper'
require 'rspec-rails'

RSpec.describe LocalTimeValidator do

  before(:each) do
    @validator = LocalTimeValidator.new({:attributes => [:time]})
    @mock = mock_model("AModel")
    allow(@mock).to receive_messages(:time= => nil)
    allow(@mock).to receive_messages(:errors => [])
    allow(@mock.errors).to receive_messages(:[] => [])
  end

  valid_values = ["09:00", "00:00", "23:59", "12:32"];
  invalid_values = [
      nil,
      "",
      " ",
      "09",
      "012:00",
      "12:000",
      "12:0",
      23,
      "22:65",
      "40:00"
  ]

  valid_values.each do |val|
    it "should validate valid localtime" do
      expect(@mock).to_not receive('errors')
      @validator.validate_each(@mock, "time", val)
    end
  end

  invalid_values.each do |val|
    it "should validate invalid localtime" do
      expect(@mock).to receive('errors')
      @validator.validate_each(@mock, "time", val)
    end
  end

end