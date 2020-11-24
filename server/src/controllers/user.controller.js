const user = require("../models/user");
const getAll = async (req, res) => {
  let result = await user.find();
  return res.send(result);
};
const add = async (req, res) => {
  try {
    await user.insert({
      firstName: "John",
      lastName: "Smith",
      role: "admin", // will be inserted without any validation
    });
    return res.send(200);
  } catch (e) {
    return res.send(e);
  }
};
module.exports = { getAll, add };
