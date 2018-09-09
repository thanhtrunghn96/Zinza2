class LikesController < ApplicationController
before_action :authenticate_user!
skip_before_action :verify_authenticity_token
  def create  
    @like = current_user.likes.build(like_params)
    post = Post.find_by(id: params[:post][:post_id])
    if @like.save()
      count_likes = post.likes.count()
      respond_to do |format|
        format.json { render json: {count: count_likes, post_id: @like.post_id, like_id: @like.id} }
      end
    end
  end
  
  def destroy
    @like = Like.find_by(id: params[:id])
    post_id = @like.post_id
    post = Post.find_by(id: post_id)
    if @like.destroy
      count_likes = post.likes.count()
      respond_to do |format|
        format.json{ render json: {count: count_likes, post_id: post_id} }
      end
    end
  end

  private

  def like_params
    params.require(:post).permit(:post_id)
  end
end