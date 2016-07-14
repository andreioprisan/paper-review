class PaperSerializer < ActiveModel::Serializer
  attributes :id, :name, :finished, :user_reviewed

  def user_reviewed
    object.user_reviewed(current_user)
  end

end
