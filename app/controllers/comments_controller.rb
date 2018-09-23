# frozen_string_literal: true

class CommentsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :authenticate_user!
  before_action :find_comment, only: [:update, :edit, :destroy]
  before_action :find_post, only: [:index, :edit, :destroy]
  def index
    respond_to do |format|
      format.html do
        render 'index', layout: false, locals: { post: @post }
      end
    end
  end

  def create
    @comment = current_user.comments.build(comment_params)
    if @comment.save 
      count_comments = @comment.post.comments.count
      respond_to do |format|
        format.html do
          render 'create', layout: false, locals: { comment: @comment, count_comments: count_comments }
        end
      end
    end
  end

  def edit
    respond_to do |format|
      format.html do
        render 'edit', layout:false, locals: { comment: @comment, post: @post }
      end
    end
  end

  def update
    if @comment.update(comment_params)
      count_comments = @comment.post.comments.count
      respond_to do |format|
        format.html do
          render 'create', layout:false, locals: { comment: @comment, count_comments: count_comments }
        end
      end
    end
  end

  def destroy
    if @comment.destroy
      count_comments = @post.comments.count
      respond_to do |format|
        format.json { render json: { count_comments: count_comments } }
      end
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
