class OutingsController < ApplicationController

  def create
    date = params.require(:outing).require(:day).require(:date)
    Outing.create_confirmed(model_params, date)
    render json: nil
  end

  def show
    @outing = Outing.find(params[:id])
  end

  def update
    Outing.find(params[:id]).update! model_params
    render json: nil
  end

  def destroy
    Outing.destroy(params[:id])
    render json: nil
  end

  def confirm
    date = params.require :date
    default_outing_id = params.require :default_outing_id
    default_outing = DefaultOuting.find default_outing_id
    Outing.create_from_default default_outing, date
    render json: nil
  end

  def dismiss_default
    date = params.require :date
    default_outing_id = params.require :default_outing_id
    Day.by_date(date).dismiss_default_outing default_outing_id
    render json: nil
  end

  def model_params
    params.require(:outing).permit(:time, :name, :num_horses, :price_adult, :price_child)
  end

end
