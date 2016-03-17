class DaysController < ApplicationController

  def show
    date = params.require :date
    @day = Day.by_date date, :with_def_outings => true
  end

  def range
    Benchmark.bm(7) do |x|
      x.report('range method: ') { bmarked_range }
    end

    # start_str = params.require :start
    # end_str = params.require :end
    # @days = Day.includes({:outings => :reservations}, :dismissed_default_outings).range start_str, end_str
  end

  private

  def bmarked_range
    start_str = params.require :start
    end_str = params.require :end
    @days = Day.cached_for_calendar start_str, end_str
  end
end
