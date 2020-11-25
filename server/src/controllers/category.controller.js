const { HandleStatus } = require("../config/handeStatus");
const categoryService = require("../CRUD/category.service");

const getAll = async (req, res) => {
  let take = req.query.take;
  let skip = req.query.skip;
  let key = req.query.key;
  let result = await categoryService.getAll(take, skip, key);
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
const remove = async (req, res) => {
  let id = req.query.id;
  let result = await categoryService.remove(id);
  return res.send(result);
};
const update = async (req, res) => {
  let input = req.body.input;
  console.log(input);
  let result = await categoryService.update(input);
  return res.send(HandleStatus(200));
};

module.exports = { getAll, add, removeAll, seed, count, remove, update };
