class DaysController < ApplicationController

  def show
    date = params.require :date
    @day = Day.by_date date
    # render json: @day.to_json(:include => {:outings => {:include => :reservations}})
  end

end
