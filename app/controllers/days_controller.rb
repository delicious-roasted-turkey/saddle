class DaysController < ApplicationController

  def show
    date = params.require :date
    @day = Day.by_date date, :put_def_outings => true
  end

end
