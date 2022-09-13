class CreateBackgrounds < ActiveRecord::Migration[7.0]
  def change
    create_table :backgrounds do |t|
      t.boolean :lawyer
      t.boolean :vagrant
      t.boolean :otaku

      t.timestamps
    end
  end
end