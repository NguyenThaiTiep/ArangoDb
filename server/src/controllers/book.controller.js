const bookService = require("../CRUD/book.service");
const { BookRepo } = require("../models/book");

const getAll = async (req, res) => {
  let result = await bookService.getAll();
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
  let result = await bookService.add(null);
  res.send(result);
};
const seed = async (req, res) => {
  let id = req.query.categoryId || "-1";
  let amount = req.query.amount || 0;
  let result = await bookService.seed({ categoryId: id, amount: amount });
  res.send(result);
};
const findByCategory = async (req, res) => {
  let result = await bookService.getByCategoryId(null);
  res.send(result);
};
module.exports = { getAll, add, removeAll, seed, findByCategory, count };
