const { HandelStatus } = require("../config/handeStatus");
const billSeed = require("../lib/init-data/bill.seed");
const bookSeed = require("../lib/init-data/book.seed");
const { BillRepo } = require("../models/bill");
const { BookRepo } = require("../models/book");
const { CategoryRepo } = require("../models/category");
const { all } = require("../router/book.router");

const getAll = async (take, skip) => {
  try {
    let result = await BillRepo.find()
      .offset(skip || 0)
      .limit(take || 10);
    return HandelStatus(200, null, result);
  } catch (e) {
    return HandelStatus(500);
  }
};

const removeAll = async () => {
  try {
    let result = await BillRepo.remove();
    return HandelStatus(200, null, result);
  } catch (e) {
    return HandelStatus(500);
  }
};
const getCount = async () => {
  let count = await BillRepo.count();
  return HandelStatus(200, null, count);
};
const add = async (input) => {};
const seed = async (input) => {
  if (!input) {
    return HandelStatus(400);
  }
  let count = await BookRepo.count();
  let offset = Math.floor(Math.random() * count);
  let limit = Math.floor(Math.random() * 3 + 1);
  let books = await BookRepo.find().offset(offset).limit(limit);
  if (!books) {
    return HandelStatus(404, "not found");
  }
  let bills = await billSeed(input.amount || 0, books);

  try {
    await BillRepo.import(bills);
    return HandelStatus(200, null, { count: bills.length });
  } catch (e) {
    return HandelStatus(500, e);
  }
};
module.exports = { add, seed, getAll, getCount, removeAll };
