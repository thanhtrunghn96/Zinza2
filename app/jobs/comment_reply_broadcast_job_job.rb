# frozen_string_literal: true

class Notifications::CommentReplyBroadcastJobJob < ApplicationJob
  queue_as :default

  def perform(user)
    ActionCable.server.broadcast "notification_channel_#{user.id}",
                                 notifications: render_notifications_for(user)
  end

  private

  def render_notifications_for(user)
    ApplicationController.renderer.render partial: 'activity_notification/socket_notifications',
                                          locals: { user: user }
  end
end
