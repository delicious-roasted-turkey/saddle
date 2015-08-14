# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150808205750) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "available_horse_counts", force: :cascade do |t|
    t.integer  "num_horses"
    t.datetime "from"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "available_horse_counts", ["from"], name: "index_available_horse_counts_on_from", using: :btree

  create_table "days", force: :cascade do |t|
    t.date     "date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "days", ["date"], name: "index_days_on_date", unique: true, using: :btree

  create_table "default_outings", force: :cascade do |t|
    t.string   "name"
    t.string   "time"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "deleted_at"
  end

  add_index "default_outings", ["deleted_at"], name: "index_default_outings_on_deleted_at", using: :btree

  create_table "dismissed_default_outings", force: :cascade do |t|
    t.integer "day_id"
    t.integer "default_outing_id"
  end

  add_index "dismissed_default_outings", ["day_id"], name: "index_dismissed_default_outings_on_day_id", using: :btree
  add_index "dismissed_default_outings", ["default_outing_id"], name: "index_dismissed_default_outings_on_default_outing_id", using: :btree

  create_table "my_models", force: :cascade do |t|
    t.date     "date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "outings", force: :cascade do |t|
    t.string   "time"
    t.integer  "day_id"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
    t.string   "name"
    t.integer  "default_outing_id"
  end

  add_index "outings", ["day_id"], name: "index_outings_on_day_id", using: :btree
  add_index "outings", ["default_outing_id"], name: "index_outings_on_default_outing_id", using: :btree

  create_table "reservations", force: :cascade do |t|
    t.integer  "num_adults"
    t.integer  "num_children"
    t.string   "skill_level"
    t.string   "name"
    t.string   "phone"
    t.text     "comments"
    t.integer  "outing_id"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  add_index "reservations", ["outing_id"], name: "index_reservations_on_outing_id", using: :btree

  add_foreign_key "outings", "days"
  add_foreign_key "outings", "default_outings"
  add_foreign_key "reservations", "outings"
end
