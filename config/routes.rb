Rails.application.routes.draw do

  devise_for :users, :controllers => {
    sessions: 'sessions',
    registrations: 'registrations'
  }
  resources :outings
  resources :default_outings

  get 'reservations/by_outings' => 'reservations#by_outings'
  resources :reservations

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  root 'home#index'

  #Days are referenced by date
  resources :days, :except => :show
  get 'days/range' => 'days#range'
  get 'days/:date' => 'days#show'

  post 'outings/confirm' => 'outings#confirm'
  post 'outings/dismiss_default' => 'outings#dismiss_default'

  get 'available_horse_counts/count_at' => 'available_horse_counts#count_at'
  resources :available_horse_counts

  get 'backup_file/:date/get_json' => 'backup_file#get_json'
  get 'backup_file/:date/get_text' => 'backup_file#get_text'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
