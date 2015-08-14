class AvailableHorseCountsController < ApplicationController

  def current_count
    render json: {
      :count => AvailableHorseCount.current_count
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
