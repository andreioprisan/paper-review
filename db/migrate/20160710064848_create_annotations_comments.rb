class CreateAnnotationsComments < ActiveRecord::Migration[5.0]
  def change
    create_table :annotations do |t|
      t.json :annotation, null: false

      t.timestamps
    end
    create_table :comments do |t|
      t.text :content, null: false
      t.belongs_to :annotation, null: false, index: true, foreign_key: {on_delete: :cascade}

      t.timestamps
    end
  end
end
