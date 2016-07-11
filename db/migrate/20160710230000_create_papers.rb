class CreatePapers < ActiveRecord::Migration[5.0]
  def change
    create_table :papers do |t|
      t.string :name, null: false
      t.binary :data, null: false

      t.timestamps
    end
  end
end
