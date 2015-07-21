# Make helpers available to assets, so that they can be used
# in templates served by angular-rails-templates.
#
# Obviously, those helpers will not be able to access any
# controller since the template is rendered without reference
# to any particular request.
#
# The server must be restarted after any change on any of the helpers
#
# See https://github.com/pitr/angular-rails-templates/issues/45
Rails.application.assets.context_class.class_eval do
  include ApplicationHelper
  include ActionView::Helpers
  include Rails.application.routes.url_helpers
end
