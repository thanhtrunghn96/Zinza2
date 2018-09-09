class PostsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :authenticate_user!
  before_action :find_id, only: [:show, :edit]
  def index
    # @posts = Post.all.limit(10).includes(:photos)
    @posts = Post.all
    @post =  Post.new
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
          render '_listpost', layout: false, locals: {post: @post}
        end
      end
    else
      flash[:danger] = "Can't save"
      redirect_to posts_path
    end
  end

  def destroy
    post = Post.find_by(id: params[:id])
    respond_to do |format|
      post.destroy
      format.json {render json: {success: true} }
    end
  end

  private
  
  def post_params
    params.require(:post).permit(:content)
  end

  def find_id
    @post = Post.find_by(id: params[:id])
  end
end