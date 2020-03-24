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

ActiveRecord::Schema.define(version: 2020_03_24_094912) do

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
    t.bigint "user_id", null: false
    t.bigint "type_id", null: false
    t.index ["type_id"], name: "index_inapps_on_type_id"
    t.index ["user_id"], name: "index_inapps_on_user_id"
  end

  create_table "jwt_blacklist", force: :cascade do |t|
    t.string "jti", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["jti"], name: "index_jwt_blacklist_on_jti"
  end

  create_table "types", force: :cascade do |t|
    t.string "title_margin_top"
    t.string "title_font_family"
    t.string "title_font_size"
    t.string "title_font_color"
    t.string "title_line_height"
    t.string "title_text_align"
    t.string "content_margin_top"
    t.string "content_font_family"
    t.string "content_font_size"
    t.string "content_font_color"
    t.string "content_line_height"
    t.string "content_text_align"
    t.string "content_margin_bottom"
    t.string "button_font_family"
    t.string "button_font_size"
    t.string "button_font_color"
    t.string "button_letter_spacing"
    t.string "modal_radius"
    t.string "header_height"
    t.string "bottom_padding_top"
    t.string "bottom_padding_right"
    t.string "bottom_padding_bottom"
    t.string "bottom_padding_left"
    t.string "bottom_background_color"
    t.string "close_circle_width"
    t.string "close_cross_width"
    t.string "close_cross_thickness"
    t.bigint "user_id", null: false
    t.index ["user_id"], name: "index_types_on_user_id"
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
  add_foreign_key "inapps", "types"
  add_foreign_key "inapps", "users"
  add_foreign_key "types", "users"
end
