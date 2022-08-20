class CollectionsController < ApplicationController
    def index
        render json: Collection.all, status: :ok
    end

    def show
        collection = Collection.find(params[:id])
        render json: collection, status: :found
    end

    def create
        collection = Collection.create!(collection_params)
        render json: collection, status: :created
    end
    def update
        collection = Collection.find(params[:id])
        collection.update!(collection_params)
        render json: collection, status: :ok
    end
    def destroy
        collection = Collection.find(params[:id])
        collection.decks.destroy_all
        collection.cards.destroy_all
        collection.destroy
        render json: {message: "Deleted"}, status: :ok
    end

    private

    def collection_params
        params.permit(:user_id, :title, :description, :icon)
    end
end
