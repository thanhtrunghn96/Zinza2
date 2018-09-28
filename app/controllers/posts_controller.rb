# frozen_string_literal: true

class PostsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :authenticate_user!
  before_action :find_id, only: %i[show edit destroy update show]

  def index
    # @search = Post.ransack(params[:q])
    # @posts = @search.result.includes(:user).page(params[:page]).per(5)
    @posts = Post.page(params[:page]).per(5)
    @post =  Post.new
    render_load_perpage && return if request.xhr?
  end

  def new; end

  def create
    @post = current_user.posts.build(post_params)
    if @post.save
      @post.photos.create(image: params[:images]) if params[:images]
      # respond_to do |format|
      #   format.html do
      #     render '_listposts', layout: false, locals: { post: @post }
      #   end
      # end
      flash[:notice] = 'Post success ...'
    else
      flash[:alert] = "Can't save ..."
    end
    redirect_to root_path
  end

  def show
    respond_to do |format|
      format.html do
        render '_listposts', layout: false, locals: { post: @post }
      end
    end
  end

  def edit
    respond_to do |format|
      format.html do
        render 'edit', layout: false, locals: { post: @post }
      end
    end
  end

  def update
    if @post.update(post_params)
      respond_to do |format|
        # format.json { render json: @post.to_json (only: [:content]) }
        format.json { render json: { success: true } }
      end
    end
  end

  def destroy
    respond_to do |format|
      format.json { render json: { success: true } } if @post.destroy
    end
  end

  private

  def post_params
    params.require(:post).permit(:content)
  end

  def find_id
    @post = Post.find_by(id: params[:id])
    render 'shared/_404' if @post.nil?
  end

  def render_load_perpage
    render '_pagekaminari', layout: false
  end
end
