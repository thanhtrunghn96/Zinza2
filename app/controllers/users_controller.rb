class UsersController < ApplicationController
  before_action :authenticate_user!
  before_action :find_user, only: [:edit, :update, :show]
  def show; end
  
  def edit
    respond_to do |format|
      format html do
        render 'edit', layout:false
      end
    end
  end
  def update
    @user.update(user_params)
  end

  private

  def find_user
    @user = User.find_by(id: params[:id])
  end

  def user_params
    params.require(:user).permit(:email, :password, :name, :avatar)
  end
end