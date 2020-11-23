const Joi = require("joi");
const db = require("../loader/connect").Database;

const schema = new db.Schema({
  author: String,
  title: String,
  body: String,
  date: Date,
});
let User = db.model("User", schema);
module.exports = db.model("User");
