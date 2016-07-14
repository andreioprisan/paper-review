class Paper < ApplicationRecord
  def initialize(params = {})
    file = params.delete(:data)
    super
    if file
      self.name = sanitize_filename(file.original_filename)
      self.data = file.read
    end
  end

  def finished
    # TODO: terribly inefficient, use database for this
    reviews.where(finished: true).count >= requested_reviews
  end

  def user_reviewed(user)
    reviews.where(finished: true, reviewer: user).exists?
  end

private
  def sanitize_filename(filename)
    # Get only the filename, not the whole path (for IE)
    # Thanks to this article I just found for the tip: http://mattberther.com/2007/10/19/uploading-files-to-a-database-using-rails
    return File.basename(filename)
  end
  has_many :reviews
  belongs_to :submitter, class_name: 'User'
end
