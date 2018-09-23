class UsersController < ApplicationController
  before_action :authenticate_user!
  before_action :find_user, only: [:edit, :update, :show]
  
  def show
    @posts = @user.posts.page(params[:page]).per(5)
    render_load_perpage and return if request.xhr?
  end

  def edit
    # respond_to do |format|
    #   format html do
    #     render 'edit', layout:false
    #   end
    # end
  end
  def update
    @user.update(user_params)
  end

  private

  def find_user
    @user = User.find_by(id: params[:id])
    render 'shared/_404' if @user.nil?
  end

  def user_params
    params.require(:user).permit(:email, :password, :name, :avatar)
  end

  def render_load_perpage
    render 'posts/_pagekaminari', layout: false
  end
end