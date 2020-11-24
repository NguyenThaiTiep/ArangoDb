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
let Book = db.model("Book", schema, "Book");
module.exports = db.model("Book");
