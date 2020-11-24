const Joi = require("joi");
const db = require("../loader/connect").Database;

const schema = new db.Schema({
  firstName: String,
  lastName: String,
  role: String,
  date: Date,
});
let User = db.model("User", schema, "User");
module.exports = db.model("User");
