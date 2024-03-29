class CreateCharacterItems < ActiveRecord::Migration[7.0]
  def change
    create_table :character_items do |t|
      t.references :character, null: false, foreign_key: true
      t.references :item, null: false, foreign_key: true
      t.string :item_name
      t.timestamps
    end
  end
end
