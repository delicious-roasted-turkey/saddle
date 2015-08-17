class AvailableHorseCountsController < ApplicationController

  def count_at
    date = params.require :date
    count = AvailableHorseCount.count_at_date date
    render json: {
      :count => count
    }
  end

  def index
    @available_horse_counts = AvailableHorseCount.all
  end

  def destroy
    id = params.require :id
    AvailableHorseCount.destroy id
    render json: nil
  end

  def create
    AvailableHorseCount.create! model_params
    render json: nil
  end

  private

  def model_params
    params.require(:available_horse_count)
        .permit(
            :num_horses,
            :from
        )
  end
end
