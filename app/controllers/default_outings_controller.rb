class DefaultOutingsController < ApplicationController

  respond_to :json

  def index
    render json: DefaultOuting.all
  end

  def create
    DefaultOuting.create!(model_params)
    render json: nil
  end

  def destroy
    id = params.require(:id)
    model = DefaultOuting.find(id)
    model.destroy
    render json: nil
  end

  def show
    id = params.require(:id)
    render json: DefaultOuting.find(id)
  end

  private

  def model_params
    params.require(:default_outing).permit(:time, :name)
  end
end
