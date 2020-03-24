class AddTypeReferenceToInapp < ActiveRecord::Migration[6.0]
  def change
    add_reference :inapps, :type, index: true, null:false, foreign_key: true
  end
end
