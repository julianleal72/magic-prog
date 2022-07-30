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
        render json: user, status: :created
    end
    def update
        user = User.find(params[:id])
        user.update!(user_params)
        render json: user, status: :ok
    end
    def destroy
        user = User.find(params[:id])
        user.destroy
        render json: {message: "Deleted"}, status: :ok
    end

    private

    def user_params
        params.permit(:username, :password_digest, :bio)
    end
end
