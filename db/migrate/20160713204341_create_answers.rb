class CreateAnswers < ActiveRecord::Migration[5.0]
  def change
    create_table :answers do |t|
      t.text :question, null: false
      t.text :answer
      t.string :question_type, null: false
      t.belongs_to :review, null: false, index: true, foreign_key: {on_delete: :cascade}

      t.timestamps
    end
  end
end
