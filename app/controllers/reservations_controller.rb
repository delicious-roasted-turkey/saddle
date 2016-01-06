class ReservationsController < ApplicationController

  def create
    Reservation.create! model_params
    render json: nil
  end

  def update
    Reservation.find(params[:id]).update! model_params
    render json: nil
  end

  def show
    @reservation = Reservation.find params[:id]
  end

  def destroy
    Reservation.destroy params[:id]
    render json: nil
  end

  private

  def model_params
    params.require(:reservation)
    .permit(
      :num_adults,
      :num_children,
      :skill_level,
      :name,
      :phone,
      :comments,
      :price_adult,
      :price_child,
      :outing_id
    )
  end
end
