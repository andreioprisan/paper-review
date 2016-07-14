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

ActiveRecord::Schema.define(version: 20160713204341) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "annotations", force: :cascade do |t|
    t.json     "annotation", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "review_id",  null: false
    t.index ["review_id"], name: "index_annotations_on_review_id", using: :btree
  end

  create_table "answers", force: :cascade do |t|
    t.text     "question",      null: false
    t.text     "answer"
    t.string   "question_type", null: false
    t.integer  "review_id",     null: false
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.index ["review_id"], name: "index_answers_on_review_id", using: :btree
  end

  create_table "comments", force: :cascade do |t|
    t.text     "content",       null: false
    t.integer  "annotation_id", null: false
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.index ["annotation_id"], name: "index_comments_on_annotation_id", using: :btree
  end

  create_table "papers", force: :cascade do |t|
    t.string   "name",         null: false
    t.binary   "data",         null: false
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.integer  "submitter_id", null: false
    t.index ["submitter_id"], name: "index_papers_on_submitter_id", using: :btree
  end

  create_table "questions", force: :cascade do |t|
    t.text     "text",          null: false
    t.string   "question_type", null: false
    t.integer  "steps"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  create_table "reviews", force: :cascade do |t|
    t.boolean  "finished",    default: false, null: false
    t.integer  "reviewer_id",                 null: false
    t.integer  "paper_id",                    null: false
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
    t.index ["paper_id"], name: "index_reviews_on_paper_id", using: :btree
    t.index ["reviewer_id"], name: "index_reviews_on_reviewer_id", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",               default: "", null: false
    t.string   "encrypted_password",  default: "", null: false
    t.datetime "remember_created_at"
    t.datetime "created_at",                       null: false
    t.datetime "updated_at",                       null: false
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
  end

  add_foreign_key "annotations", "reviews", on_delete: :cascade
  add_foreign_key "answers", "reviews", on_delete: :cascade
  add_foreign_key "comments", "annotations", on_delete: :cascade
  add_foreign_key "papers", "users", column: "submitter_id", on_delete: :cascade
  add_foreign_key "reviews", "papers", on_delete: :cascade
  add_foreign_key "reviews", "users", column: "reviewer_id", on_delete: :cascade
end
