class ReservationsController < ApplicationController

  def create
    Reservation.create! model_params
    render json: nil
  end

  def update
    Reservation.find(params[:id]).update! model_params
    render json: nil
  end

  def move_to_outing
    rsv_id = params.require(:rsv_id)
    outing_id = params.require(:outing_id)
    Reservation.find(rsv_id).update!(:outing_id => outing_id)
    render json:nil
  end

  def show
    @reservation = Reservation.find params[:id]
  end

  def destroy
    Reservation.destroy params[:id]
    render json: nil
  end

  def by_outings
    outing_ids = JSON.parse params[:outing_ids]
    @reservations = Reservation.where(:outing_id => outing_ids)
    render 'reservations/list'
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
