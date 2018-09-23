class FriendshipsController < ApplicationController
  before_action :authenticate_user!

  def new
    @friendship = Friendship.new
  end
  
  def create
    @friendship = current_user.user_request.build(friend_ship)
     if @friendship.save
     end
  end

  private

  def friend_ship
    params.require(:friendship).permit(:user_response)
  end
end