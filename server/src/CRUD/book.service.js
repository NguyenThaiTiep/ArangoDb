const { HandleStatus } = require("../config/handeStatus");
const bookSeed = require("../lib/init-data/book.seed");
const { Database } = require("../loader/connect");
const { BookRepo } = require("../models/book");
const { CategoryRepo } = require("../models/category");
const { all } = require("../router/book.router");

const getAll = async (take, skip, key) => {
  try {
    console.log(skip, take);
    let qr = `FOR book IN Book
    FILTER book.name LIKE "%${key || ""}%" OR book._key LIKE "%${key || ""}%" 
    SORT book.name
    LIMIT ${skip || 0},${take || 10} 
      RETURN book`;
    let count = await BookRepo.count();
    let result = await Database.query(qr);
    return HandleStatus(200, null, { count, result: result._result });
  } catch (e) {
    return HandleStatus(500);
  }
};

const removeAll = async () => {
  try {
    let result = await BookRepo.remove();
    await CategoryRepo.remove();
    return HandleStatus(200, null, result);
  } catch (e) {
    return HandleStatus(500);
  }
};
const getCount = async () => {
  let count = await BookRepo.count();
  return HandleStatus(200, null, count);
};
const add = async (input) => {
  if (!input || !input.name || !input.code || input.categoryId) {
    return HandleStatus(500);
  }
  let category = await CategoryRepo.find()
    .where({ _key: input.categoryId })
    .one();
  if (!category) {
    return HandleStatus(404, "not Found");
  }
  console.log(category);
  try {
    await BookRepo.insert({
      name: input.name,
      code: input.code,
      price: input.price || 0,
      amount: input.amount || 0,
      category: category,
    });
    return HandleStatus(200);
  } catch (e) {
    return HandleStatus(500);
  }
};
const seed = async (input) => {
  if (!input) {
    return HandleStatus(400);
  }
  let count = await CategoryRepo.count();
  let offset = Math.floor(Math.random() * count);
  let category = await CategoryRepo.find().offset(offset).one();
  if (!category) {
    return HandleStatus(404, "not found");
  }
  let books = await bookSeed(input.amount || 0, category);
  try {
    await BookRepo.import(books);
    let booksCount = await BookRepo.count().where({
      categoryId: category._key,
    });
    await CategoryRepo.update({
      amount: category.amount + input.amount,
    }).where({ _key: category._key });
    return HandleStatus(200, null, { count: booksCount, id: category._key });
  } catch (e) {
    return HandleStatus(500);
  }
};
const getByCategoryId = async (id) => {
  let category = await CategoryRepo.find().where({ _key: "5593" }).one();
  if (!category) {
    return HandleStatus(404, "not found");
  }
  try {
    let books = await BookRepo.find({ category: JSON.stringify(category) });
    return HandleStatus(200, null, books);
  } catch (e) {
    return HandleStatus(500);
  }
};
module.exports = { add, seed, getAll, getCount, getByCategoryId, removeAll };
