# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_03_24_093558) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "buttons", force: :cascade do |t|
    t.string "content"
    t.string "link"
    t.string "fill_color"
    t.string "border_color"
    t.bigint "inapp_id", null: false
    t.index ["inapp_id"], name: "index_buttons_on_inapp_id"
  end

  create_table "inapps", force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.string "title"
    t.string "content"
    t.string "image"
    t.bigint "users_id", null: false
    t.index ["users_id"], name: "index_inapps_on_users_id"
  end

  create_table "jwt_blacklist", force: :cascade do |t|
    t.string "jti", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["jti"], name: "index_jwt_blacklist_on_jti"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "company"
    t.index ["email"], name: "index_users_on_email", unique: true
  end

  add_foreign_key "buttons", "inapps"
  add_foreign_key "inapps", "users", column: "users_id"
end
