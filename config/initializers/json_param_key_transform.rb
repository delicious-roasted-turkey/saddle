# Converts casing of JSON parameters, so that JSON calls and responses to controllers
# can be in standard camelCase, while being automatically converted to snake_case for
# use within controllers
# https://github.com/rails/rails/pull/20389
Rails.application.config.middleware.swap(
    ::ActionDispatch::ParamsParser, ::ActionDispatch::ParamsParser,
    ::Mime::JSON => Proc.new { |raw_post|
      # Borrowed from action_dispatch/middleware/params_parser.rb except for
      # data.deep_transform_keys!(&:underscore) :
      data = ::ActiveSupport::JSON.decode(raw_post)
      data = {:_json => data} unless data.is_a?(::Hash)
      data = ::ActionDispatch::Request::Utils.deep_munge(data)
      data.deep_transform_keys!(&:underscore)
      data.with_indifferent_access
    }
)