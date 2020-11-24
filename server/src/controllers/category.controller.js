const categoryService = require("../CRUD/category.service");

const getAll = async (req, res) => {
  let take = req.query.take;
  let skip = req.query.skip;
  let result = await categoryService.getAll(take, skip);
  return res.send(result);
};
const add = async (req, res) => {};
const removeAll = async (req, res) => {
  let result = await categoryService.removeAll();
  return res.send(result);
};
const seed = async (req, res) => {
  let amount = req.query.amount || 0;
  let result = await categoryService.seed(amount);
  return res.send(result);
};
const count = async (req, res) => {
  let result = await categoryService.getCount();
  return res.send(result);
};

module.exports = { getAll, add, removeAll, seed, count };
