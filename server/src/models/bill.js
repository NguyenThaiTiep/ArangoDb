const { string } = require("casual");
const db = require("../loader/connect").Database;

const schema = new db.Schema(
  {
    code: { type: String, required: "insert" },
    description: String,
    customerName: String,
    customerPhoneNumber: String,
    totalPrice: Number,
    date: Date,
    products: [],
  },
  {
    indexes: [
      {
        type: "hash",
        fields: ["code"],
      },
    ],
  }
);
let Bill = db.model("Bill", schema, "Bill");
module.exports.BillRepo = db.model("Bill");
