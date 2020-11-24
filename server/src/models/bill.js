const { string } = require("casual");
const Joi = require("joi");
const db = require("../loader/connect").Database;

const schema = new db.Schema(
  {
    code: String,
    description: String,
    userId: String,
    productId: String,
  },
  {
    indexes: [{ type: "hash", fields: ["code"] }],
  }
);
let Category = db.model("Bill", schema, "Bill");
module.exports.BillRepo = db.model("Bill");
