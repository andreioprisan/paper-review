class CreateReviews < ActiveRecord::Migration[5.0]
  def change
    create_table :reviews do |t|
      t.boolean :finished, null: false, default: false
      t.belongs_to :reviewer, null: false, index: true, foreign_key: {to_table: :users, on_delete: :cascade}
      t.belongs_to :paper, null: false, index: true, foreign_key: {on_delete: :cascade}

      t.timestamps
    end
    add_reference :annotations, :review, null: false, index: true, foreign_key: {on_delete: :cascade}
    add_reference :papers, :submitter, null: false, index: true, foreign_key: {to_table: :users, on_delete: :cascade}
  end
end
