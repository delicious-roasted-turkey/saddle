class DefaultOutingsController < ApplicationController

  def index
    render json: DefaultOuting.all
  end

end
