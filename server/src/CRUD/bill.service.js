const { HandleStatus } = require("../config/handeStatus");
const billSeed = require("../lib/init-data/bill.seed");
const { BillRepo } = require("../models/bill");
const { BookRepo } = require("../models/book");
const { Database } = require("../loader/connect");

const getAll = async (take, skip, key) => {
  try {
    let qr = `FOR bill IN Bill
    FILTER bill.customerName LIKE "%${key || ""}%" OR bill._key LIKE "%${
      key || ""
    }%"
    SORT bill.name
    LIMIT ${skip || 0},${take || 10}
      RETURN bill`;
    let count = await BillRepo.count();
    let startTime = Date.now();
    let result = await Database.query(qr);
    return HandleStatus(
      200,
      null,
      { count, result: result._result },
      (Date.now() - startTime) / 1000
    );
  } catch (e) {
    return HandleStatus(500);
  }
};

const removeAll = async () => {
  try {
    let result = await BillRepo.remove();
    return HandleStatus(200, null, result);
  } catch (e) {
    return HandleStatus(500);
  }
};
const getCount = async () => {
  let count = await BillRepo.count();
  return HandleStatus(200, null, count);
};

const add = async (input) => {
  if (!input || !input.customerName || !input.books) {
    return HandleStatus(400);
  }
  totalPrice = billSeed.sum(books);
  try {
    let startTime = Date.now();
    await BookRepo.insert({
      customerName: input.customerName,
      customerPhoneNumber: input.customerPhoneNumber,
      amount: input.amount || 0,
      books: input.books,
      totalPrice: totalPrice,
    });
    return HandleStatus(200, null, null, (Date.now() - startTime) / 1000);
  } catch (e) {
    return HandleStatus(500);
  }
};
const seed = async (input) => {
  if (!input) {
    return HandleStatus(400);
  }
  let count = await BookRepo.count();
  let offset = Math.floor(Math.random() * count);
  let limit = Math.floor(Math.random() * 3 + 1);
  let books = await BookRepo.find().offset(offset).limit(limit);
  if (!books) {
    return HandleStatus(404, "not found");
  }
  let bills = await billSeed(input.amount || 0, books);
  let startTime = Date.now();
  try {
    await BillRepo.import(bills);
    return HandleStatus(
      200,
      null,
      { count: bills.length },
      (Date.now() - startTime) / 1000
    );
  } catch (e) {
    return HandleStatus(500, e);
  }
};
const remove = async (id) => {
  if (!id) return HandleStatus(404);
  try {
    let startTime = Date.now();
    await BillRepo.remove().where({ _key: id });
    // BookRepo.remove().where({categoryId: id});
    return HandleStatus(200, null, null, (Date.now() - startTime) / 1000);
  } catch (e) {
    return HandleStatus(500);
  }
};

const update = async (input) => {
  try {
    let startTime = Date.now();
    let bill = await BillRepo.find().where({ _key: input._key }).one();
    await BillRepo.update({
      customerName: input.customerName,
      customerPhoneNumber: input.customerPhoneNumber,
      description: input.description,
    }).where({ _key: input._key });
    return HandleStatus(200, null, null, (Date.now() - startTime) / 1000);
  } catch (e) {
    return HandleStatus(500, e);
  }
};
module.exports = { add, seed, getAll, getCount, removeAll, remove, update };
