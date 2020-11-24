const billService = require("../CRUD/bill.service");

const getAll = async (req, res) => {
  let take = req.query.take;
  let skip = req.query.skip;
  let result = await billService.getAll(take, skip);
  return res.send(result);
};
const removeAll = async (req, res) => {
  let result = await billService.removeAll();
  return res.send(result);
};
const count = async (req, res) => {
  let result = await billService.getCount();
  return res.send(result);
};
const add = async (req, res) => {};
const seed = async (req, res) => {
  let amount = req.query.amount || 0;
  let result = await billService.seed({ amount: amount });
  res.send(result);
};
const findByCategory = async (req, res) => {};
module.exports = { getAll, add, removeAll, seed, findByCategory, count };
