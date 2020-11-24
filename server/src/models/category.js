const Joi = require("joi");
const db = require("../loader/connect").Database;

const schema = new db.Schema(
  {
    name: String,
    code: String,
    price: String,
    amount: Number,
  },
  {
    indexes: [{ type: "hash", fields: ["code"] }],
  }
);
let Category = db.model("Category", schema, "Category");
module.exports = db.model("Category");
