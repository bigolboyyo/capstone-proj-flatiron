class CreateChoices < ActiveRecord::Migration[7.0]
  def change
    create_table :choices do |t|
      t.references :option, null: false, foreign_key: true
      t.string :choice_text
      t.string :next_choice
      t.timestamps
    end
  end
end
