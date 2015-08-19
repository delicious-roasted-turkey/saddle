class HomeController < ApplicationController

  prepend_before_filter do
    # This is NOT the main mechanism for keeping out unauthenticated
    # users. It's just there because, if we let Devise handle the
    # redirection, an undesired 'unauthorized' flash message would
    # be rendered.
    if !user_signed_in?
      redirect_to '/users/sign_in'
    end
  end

  def index
    @must_render_navbar = false
    render :home
  end

end
