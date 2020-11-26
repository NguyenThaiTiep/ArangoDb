const Joi = require("joi");
const db = require("../loader/connect").Database;

const schema = new db.Schema(
  {
    name: String,
    code: { type: String, required: "insert" },
    price: Number,
    amount: Number,
    author: String,
    categoryId: String,
    categoryName: String,
    description: String,
  },
  {
    indexes: [{ type: "hash", fields: ["code"] }],
  }
);
let Book = db.model("Book", schema, "Book");
module.exports.BookRepo = db.model("Book");
