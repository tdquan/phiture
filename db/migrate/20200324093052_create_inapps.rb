class CreateInapps < ActiveRecord::Migration[6.0]
  def change
    create_table :inapps do |t|
      t.string      :name
      t.string      :description
      t.string      :title
      t.string      :content
      t.string      :image
      t.references  :users, null: false, foreign_key: true
    end
  end
end
