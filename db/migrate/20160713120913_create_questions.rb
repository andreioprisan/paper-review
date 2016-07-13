class CreateQuestions < ActiveRecord::Migration[5.0]
  def change
    create_table :questions do |t|
      t.text :text, null: false
      t.string :question_type, null: false
      t.integer :steps

      t.timestamps
    end
  end
end
