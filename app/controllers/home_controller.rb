class HomeController < ApplicationController

  def index
    @must_render_navbar = false
    render :home
  end

end
