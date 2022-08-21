class UsersController < ApplicationController
    
    def index
        render json: User.all, status: :ok
    end

    def show
        user = User.find(params[:id])
        render json: user, status: :found
    end

    def create
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created
    end

    def update
        user = User.find(params[:id])
        user.update!(user_params)
        render json: user, status: :ok
    end
    
    def destroy
        user = User.find(params[:id])
        user.decks.destroy_all
        user.collections.destroy_all
        user.cards.destroy_all
        user.destroy
        render json: {message: "Deleted"}, status: :ok
    end

    def me
        render json:  @current_user
    end

    private

    def user_params
        params.permit(:username, :password, :bio, :avatar)
    end
end
