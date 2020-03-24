class CreateButtons < ActiveRecord::Migration[6.0]
  def change
    create_table :buttons do |t|
      t.string      :content
      t.string      :link
      t.string      :fill_color
      t.string      :border_color
      t.references  :inapp, null: false, foreign_key: true
    end
  end
end
