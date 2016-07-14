class AddRequiredNumberOfReviewsToPaper < ActiveRecord::Migration[5.0]
  def change
    add_column :papers, :requested_reviews, :integer, null: false
  end
end
