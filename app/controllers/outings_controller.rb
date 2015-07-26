class OutingsController < ApplicationController

  def create
    date = params.require(:outing).require(:day).require(:date)
    Outing.create_confirmed(model_params, date)
    render json: nil
  end

  def show
    outing = Outing.find(params[:id])
    render json: outing.to_json(:include => :day)
  end

  def update
    Outing.find(params[:id]).update! model_params
    render json: nil
  end

  def destroy
    Outing.destroy(params[:id])
    render json: nil
  end

  def model_params
    params.require(:outing).permit(:time, :name)
  end

end
