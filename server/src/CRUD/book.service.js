const { HandelStatus } = require("../config/handeStatus");
const bookSeed = require("../lib/init-data/book.seed");
const { BookRepo } = require("../models/book");
const { CategoryRepo } = require("../models/category");

const getAll = async () => {
  try {
    let result = await BookRepo.find()
      .where({
        name: { $eq: "Mrs. Verda Daugherty" },
      })
      .limit(10);
    return HandelStatus(200, null, result);
  } catch (e) {
    return HandelStatus(500);
  }
};

const removeAll = async () => {
  try {
    let result = await BookRepo.remove();
    return HandelStatus(200, null, result);
  } catch (e) {
    return HandelStatus(500);
  }
};
const getCount = async () => {
  let count = await BookRepo.count();
  return HandelStatus(200, null, count);
};
const add = async (input) => {
  if (!input || !input.name || !input.code || input.categoryId) {
    return HandelStatus(500);
  }
  let category = await CategoryRepo.find().where({ _key: "5593" }).one();
  if (!category) {
    return HandelStatus(404, "not Found");
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
    return HandelStatus(200);
  } catch (e) {
    return HandelStatus(500);
  }
};
const seed = async (input) => {
  if (!input) {
    return HandelStatus(400);
  }
  let category = await CategoryRepo.find()
    .where({ _key: input.categoryId || "-1" })
    .one();
  if (!category) {
    return HandelStatus(404, "not found");
  }
  let books = await bookSeed(input.amount || 0, category._key);
  try {
    await BookRepo.import(books);
    let booksCount = await BookRepo.count().where({
      categoryId: input.categoryId,
    });
    return HandelStatus(200, null, { count: booksCount, id: input.categoryId });
  } catch (e) {
    return HandelStatus(500);
  }
};
const getByCategoryId = async (id) => {
  let category = await CategoryRepo.find().where({ _key: "5593" }).one();
  if (!category) {
    return HandelStatus(404, "not found");
  }
  try {
    let books = await BookRepo.find({ category: JSON.stringify(category) });
    return HandelStatus(200, null, books);
  } catch (e) {
    return HandelStatus(500);
  }
};
module.exports = { add, seed, getAll, getCount, getByCategoryId, removeAll };
