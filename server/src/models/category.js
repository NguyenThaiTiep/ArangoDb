const Joi = require("joi");
const db = require("../loader/connect").Database;

const schema = new db.Schema(
  {
    name: String,
    code: { type: String, required: "insert" },
    price: Number,
    amount: { type: Number, default: 0 },
    description: String,
  },
  {
    indexes: [{ type: "hash", fields: ["code"] }],
  }
);
let Category = db.model("Category", schema, "Category");
module.exports.CategoryRepo = db.model("Category");
