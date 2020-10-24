source 'https://rubygems.org'

ruby '2.3.8'


# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '4.2.6'

gem 'responders', '~>2.0'

# Use paranoia for soft-delete
gem 'paranoia', '~>2.0'

# Use sqlite3 as the database for Active Record
# gem 'sqlite3'

# Use postgres as the database for Active Record
gem 'pg', '~> 0.20'

# Use SCSS for stylesheets
gem 'sass-rails', '~> 5.0'
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.0'
# bundle exec rake doc:rails generates the API under doc/api.
gem 'sdoc', '~> 0.4.0', group: :doc

# Specify version of sprockets in order to avoid incompatibilities
# with angular-rails-templates
gem 'sprockets', '2.12.5'

gem 'angular-rails-templates'

# Devise for authentication
gem 'devise'
gem 'devise-bootstrap-views', '~> 0.0.6'

gem 'rails-i18n', '~> 4.0.0'

# Figaro lets us put sensitive configuration values in a yml file
gem 'figaro'

# Use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Use Unicorn as the app server
# gem 'unicorn'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

gem 'yajl-ruby'
gem 'multi_json', '~> 1.11'

group :development, :test do

  gem 'byebug'

  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'

  gem 'rspec-rails', '~> 3.9'
  gem 'rspec-activemodel-mocks'

  gem 'factory_bot_rails'
end

group :development do

  # Access an IRB console on exception pages or by using <%= console %> in views
  gem 'web-console', '~> 2.0'

end

group :test do
  gem "accept_values_for"
end

group :production do
  gem 'rails_12factor'
end

