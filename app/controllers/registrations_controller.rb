class RegistrationsController < Devise::RegistrationsController

  respond_to :json

  prepend_before_filter :return_forbidden

  private

  def return_forbidden
    render :json => nil, :status => :forbidden
  end

end
