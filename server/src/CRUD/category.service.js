const { HandleStatus } = require("../config/handeStatus");
const categorySeed = require("../lib/init-data/category.seed");
const { Database } = require("../loader/connect");
const { BookRepo } = require("../models/book");
const { CategoryRepo } = require("../models/category");
const { faker } = require("faker");
const getAll = async (take, skip, key) => {
  try {
    let qr = `FOR category IN Category
    FILTER category.name LIKE "%${key || ""}%" OR category._key LIKE "%${
      key || ""
    }%"
    SORT category.name
    LIMIT ${skip || 0},${take || 10}
      RETURN category`;
    let startTime = Date.now();
    let count = await CategoryRepo.count();
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
    let startTime = Date.now();
    let result = await CategoryRepo.remove();
    await BookRepo.remove();
    return HandleStatus(200, null, result);
  } catch (e) {
    return HandleStatus(500);
  }
};
const getCount = async () => {
  try {
    let startTime = Date.now();
    let result = await CategoryRepo.count();
    return HandleStatus(200, null, result, (Date.now() - startTime) / 1000);
  } catch (e) {
    return HandleStatus(500);
  }
};
const add = async (input) => {
  if (!input || !input.name) {
    return HandleStatus(500);
  }
  try {
    let startTime = Date.now();
    await CategoryRepo.insert({
      name: input.name,
      code: "11244",
      amount: input.amount || 0,
      description: input.description || "",
    });
    return HandleStatus(200, null, null, (Date.now() - startTime) / 1000);
  } catch (e) {
    return HandleStatus(500);
  }
};
const remove = async (id) => {
  if (!id) return HandleStatus(404);
  try {
    let startTime = Date.now();
    await CategoryRepo.remove().where({ _key: id });
    BookRepo.remove().where({ categoryId: id });
    return HandleStatus(200, null, null, (Date.now() - startTime) / 1000);
  } catch (e) {
    return HandleStatus(500);
  }
};
const update = async (input) => {
  try {
    let startTime = Date.now();
    await CategoryRepo.update({
      name: input.name,
      description: input.description,
    }).where({ _key: input._key });
    BookRepo.update({ categoryName: input.name }).where({
      categoryId: input._key,
    });
    return HandleStatus(200, null, null, (Date.now() - startTime) / 1000);
  } catch (e) {
    return HandleStatus(500);
  }
};
const seed = async (input) => {
  let amount = input;
  let category = await categorySeed(input);
  if (category) {
    startTime = Date.now();
  }
  try {
    await CategoryRepo.import(category);
    return HandleStatus(200, null, { amount }, (Date.now() - startTime) / 1000);
  } catch (e) {
    return HandleStatus(500);
  }
};
module.exports = { add, seed, getAll, getCount, removeAll, remove, update };
