const bookService = require("../CRUD/book.service");

const getAll = async (req, res) => {
  let take = req.query.take;
  let skip = req.query.skip;
  let key = req.query.key;
  let result = await bookService.getAll(take, skip, key);
  return res.send(result);
};
const removeAll = async (req, res) => {
  let result = await bookService.removeAll();
  return res.send(result);
};
const count = async (req, res) => {
  let result = await bookService.getCount();
  return res.send(result);
};
const add = async (req, res) => {
  let input = req.body.input;
  let result = await bookService.add(input);
  res.send(result);
};
const seed = async (req, res) => {
  let amount = req.query.amount || 0;
  let result = await bookService.seed({ amount: amount });
  res.send(result);
};
const findByCategory = async (req, res) => {
  let result = await bookService.getByCategoryId(null);
  res.send(result);
};
const update = async (req, res) => {
  let input = req.body.input;
  let result = await bookService.update(input);
  res.send(result);
};
const remove = async (req, res) => {
  let input = req.query.id;
  let result = await bookService.remove(input);
  res.send(result);
};
module.exports = {
  getAll,
  add,
  removeAll,
  seed,
  findByCategory,
  count,
  update,
  remove,
};
