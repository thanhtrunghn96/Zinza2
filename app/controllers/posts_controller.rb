class PostsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :authenticate_user!
  before_action :find_id, only: [:show, :edit, :destroy, :update, :show]
  
  def index
    @posts = Post.page(params[:page]).per(5)
    @post =  Post.new
    render_load_perpage and return if request.xhr?
  end
 
  def new ;end

  def create
    @post = current_user.posts.build(post_params)
    if @post.save
      if params[:images]
        params[:images].each do |img|
          @post.photos.create(image: img)
        end
      end
      respond_to do |format|
        # format.json {render json: @post }
        format.html do
          render '_listposts', layout: false, locals: {post: @post}
        end
      end
    else
      flash[:danger] = "Can't save"
      redirect_to posts_path
    end
  end

  def show   
    respond_to do |format|
      format.html do
        render '_listposts', layout: false, locals: {post: @post}
      end
    end
  end

  def edit 
    respond_to do |format|
      format.html do
        render 'edit', layout: false, locals: {post: @post}
      end
    end
  end

  def update
    respond_to do |format|
      if @post.update(post_params)
        # format.json { render json: @post.to_json (only: [:content]) }
        format.json { render json: {success: true} }
      end
    end
  end

  def destroy
    respond_to do |format|
      if @post.destroy
        format.json { render json: {success: true} }
      end
    end
  end

  private
  
  def post_params
    params.require(:post).permit(:content)
  end

  def find_id
    @post = Post.find_by(id: params[:id])
  end

  def render_load_perpage
    render 'pagekaminari', layout: false
  end
end