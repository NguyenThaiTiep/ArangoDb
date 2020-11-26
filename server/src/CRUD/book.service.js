const { HandleStatus } = require("../config/handeStatus");
const bookSeed = require("../lib/init-data/book.seed");
const { Database } = require("../loader/connect");
const { BookRepo } = require("../models/book");
const { CategoryRepo } = require("../models/category");

const getAll = async (take, skip, key) => {
  try {
    let qr = `FOR book IN Book
    FILTER book.name LIKE "%${key || ""}%" OR book._key LIKE "%${key || ""}%" 
    SORT book.name
    LIMIT ${skip || 0},${take || 10} 
      RETURN book`;
    let count = await BookRepo.count();
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
  if (!input || !input.name || !input.categoryId || !input.author) {
    return HandleStatus(500);
  }
  let category = await CategoryRepo.find()
    .where({ _key: input.categoryId })
    .one();

  if (!category) {
    return HandleStatus(404, "not Found");
  }
  console.log(category);
  let startTime = Date.now();
  try {
    await BookRepo.insert({
      name: input.name,
      code: input.code || "asfdsafs",
      price: input.price || 0,
      amount: input.amount || 0,
      categoryId: input.categoryId,
      categoryName: category.name,
      author: input.author,
      price: input.price || 0,
      amount: input.amount || 0,
      description: input.description || " ",
    });
    return HandleStatus(200, null, null, (Date.now() - startTime) / 1000);
  } catch (e) {
    return HandleStatus(500, e);
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
    let startTime = Date.now();
    await BookRepo.import(books);
    let booksCount = await BookRepo.count().where({
      categoryId: category._key,
    });
    await CategoryRepo.update({
      amount: category.amount + input.amount,
    }).where({ _key: category._key });
    return HandleStatus(
      200,
      null,
      { count: booksCount, id: category._key },
      (Date.now() - startTime) / 1000
    );
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
const update = async (input) => {
  try {
    let startTime = Date.now();
    await BookRepo.update({
      name: input.name,
      description: input.description,
      price: input.price,
      author: input.author,
      amount: input.amount,
    }).where({ _key: input._key });
    return HandleStatus(200, null, null, (Date.now() - startTime) / 1000);
  } catch (e) {
    return HandleStatus(500);
  }
};
const remove = async (id) => {
  try {
    let book = await BookRepo.find().where({ _key: id }).one();
    if (!book) return HandleStatus(404);
    let category = await CategoryRepo.find()
      .where({ _key: book.categoryId })
      .one();
    let startTime = Date.now();
    if (!category) return HandleStatus(404);
    await BookRepo.remove().where({ _key: id });
    category.amount -= 1;
    await CategoryRepo.update({
      amount: category.amount,
    }).where({ _key: book.categoryId });
    return HandleStatus(200, null, null, (Date.now() - startTime) / 1000);
  } catch (e) {
    return HandleStatus(500);
  }
};
module.exports = {
  add,
  seed,
  getAll,
  getCount,
  getByCategoryId,
  removeAll,
  update,
  remove,
};
