const categoryService = require("../CRUD/category.service");
const UserRepo = require("../models/user");

const getAll = async (req, res) => {
  let result = await UserRepo.find();
  return res.send(result);
};
const add = async (req, res) => {
  let result = await categoryService.add(req.input);
  res.send(result);
};
const removeAll = async (req, res) => {
  try {
    await UserRepo.dele({ name: "tiep" });
    res.send(200);
  } catch (e) {
    return res.send("Loip");
  }
};
module.exports = { getAll, add, removeAll };
