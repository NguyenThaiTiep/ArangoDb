const user = require("../models/user");
const getAll = async (req, res) => {
  let result = await user.find();
  return res.send(result);
};
const add = async (req, res) => {
  return res.send(200);
};
module.exports = { getAll, add };
