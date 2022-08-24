class FixinsController < ApplicationController
    def index
        render json: Fixin.all, status: :ok
    end
end
