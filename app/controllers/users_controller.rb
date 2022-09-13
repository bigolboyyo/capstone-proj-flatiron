class UsersController < ApplicationController

#before_action :find_user, only [:destroy, :update]
skip_before_action :authorize, only: [:create]


    def index 
        render json: User.all, adapter: nil,
        except: creation_ref, status: :ok
    end

    def show 
        if @current_user
            render json: @current_user, status: :ok
        else 
            render json: {error: "No active session"}, status: :unauthorized
        end
    end

    def create 
        @user.update!(user_params)
        render json: @user, status: :ok
    end

# Update and destroy? 
# Probably not at the start, you make an account and it's forever nerd

private 

def user_params
    params.permit(:username, :password, :password_confirmation)
  end

def find_user
    @user = User.find(params[:id])
    !@user ? record_not_found(@user) : @user
  end

end
