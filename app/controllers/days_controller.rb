class DaysController < ApplicationController

  def show
    date = params.require :date
    @day = Day.by_date date, :put_def_outings => true
  end

  def range
    start_str = params.require :start
    end_str = params.require :end
    @days = Day.includes({:outings => :reservations}, :dismissed_default_outings).range start_str, end_str
  end

end
