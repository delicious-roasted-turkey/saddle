require 'rails_helper'
require 'spec_helper'

RSpec.describe DefaultOuting, type: :model do

  describe 'attributes' do
    it {should respond_to :name, :time}
  end

  describe 'validation' do

    describe 'name' do
      it { should accept_values_for(:name, 'Morning walk', '!!') }
      it { should_not accept_values_for(:name, nil, '', ' ')}
    end

    describe 'time' do
      it { should accept_values_for(:time, '08:23', '22:55') }
      it { should_not accept_values_for(:time, nil, '', '09:65', 'foo')}
    end

  end

end
