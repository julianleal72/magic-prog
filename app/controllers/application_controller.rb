class ApplicationController < ActionController::API
    include ActionController::Cookies
    rescue_from ActiveRecord::RecordInvalid, with: :render_invalid
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found

    def hello_world
        session[:count] = (session[:count] || 0) + 1
        render json: { count: session[:count]}
    end

    def render_invalid invalid
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end
    def render_not_found
        render json: {error: "Sorry, we couldn't find that."}, status: :not_found
    end
end
