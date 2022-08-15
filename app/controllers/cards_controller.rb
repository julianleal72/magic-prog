class CardsController < ApplicationController
    def index
        render json: Card.all, status: :ok
    end

    def show
        card = Card.find(params[:id])
        render json: card, status: :found
    end

    def create
        card = Card.create!(card_params)
        render json: card, status: :created
    end
    
    def update
        card = Card.find(params[:id])
        card.update!(card_params)
        render json: card, status: :ok
    end

    def destroy
        card = Card.find(params[:id])
        card.destroy
        render json: {message: "Deleted"}, status: :ok
    end

    private

    def card_params
        params.permit(:collection_id, info: {})
    end
end
