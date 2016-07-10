Rails.application.routes.draw do
  namespace :api do
    resources :annotations do
      resources :comments
    end
  end
  get '/', to: 'home#index', as: :home_index

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
