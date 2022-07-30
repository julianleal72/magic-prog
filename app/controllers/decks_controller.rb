class DecksController < ApplicationController

    def index
        render json: Deck.all, status: :ok
    end

    def show
        deck = Deck.find(params[:id])
        render json: deck, status: :found
    end

    def create
        deck = Deck.create!(deck_params)
        render json: deck, status: :created
    end
    def update
        deck = Deck.find(params[:id])
        deck.update!(deck_params)
        render json: deck, status: :ok
    end
    def destroy
        deck = Deck.find(params[:id])
        deck.destroy
        render json: {message: "Deleted"}, status: :ok
    end

    private

    def deck_params
        params.permit(:user_id, :name, :description, :card_id, :size)
    end
end
