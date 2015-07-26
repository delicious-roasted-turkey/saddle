require 'rails_helper'

RSpec.describe 'routes', type: :routing do

  it 'should route root to home controller' do
    expect(get: '/').to route_to(
      controller: 'home',
      action: 'index'
    )
  end

  describe 'days are identified by date in routes' do

    it 'should get a day by date' do
      expect(get: '/days/2023-04-12').to route_to(
        :controller => 'days',
        :action => 'show',
        :date => '2023-04-12'
      )
    end


  end


end
