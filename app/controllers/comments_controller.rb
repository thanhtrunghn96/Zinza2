# frozen_string_literal: true

class CommentsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :authenticate_user!
  before_action :find_comment, only: %i[update edit destroy]
  before_action :find_post, only: %i[index edit destroy]
  def index
    respond_to do |format|
      format.html do
        render 'index', layout: false, locals: { post: @post }
      end
    end
  end

  def create
    @comment = current_user.comments.build(comment_params)
    return count_comments = @comment.post.comments.count if @comment.save
    respond_to do |format|
      format.html do
        render 'create', layout: false, locals: { comment: @comment, count_comments: count_comments }
      end
    end
  end

  def edit
    respond_to do |format|
      format.html do
        render 'edit', layout: false, locals: { comment: @comment, post: @post }
      end
    end
  end

  def update
    return count_comments = @comment.post.comments.count if @comment.update(comment_params)
    respond_to do |format|
      format.html do
        render 'create', layout: false, locals: { comment: @comment, count_comments: count_comments }
      end
    end
  end

  def destroy
    return count_comments = @post.comments.count if @comment.destroy
    respond_to do |format|
      format.json { render json: { count_comments: count_comments } }
    end
  end

  private

  def find_post
    @post = Post.find_by(id: params[:post_id])
    render 'shared/_404' if @post.nil?
  end

  def find_comment
    @comment = Comment.find_by(id: params[:id])
    render 'shared/_404' if @comment.nil?
  end

  def comment_params
    params.require(:comment).permit(:post_id, :content)
  end
end
