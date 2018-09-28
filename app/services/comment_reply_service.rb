# frozen_string_literal: true

class Notifications::CommentReplyService
  def initialize(comment)
    @comment = comment
  end

  def perform
    ActivityNotification::Notification.notify :users, @comment, key: 'comment.reply', notifier: @comment.user, group: @comment.recipe
    notification_targets(@comment, key).each do |target_user|
      Notifications::CommentReplyBroadcastJob.perform_later target_user
    end
  end

  private

  def notification_targets(comment, _key)
    ([comment.recipe.user] + comment.recipe.commented_users.to_a - [comment.user]).uniq
  end
end
