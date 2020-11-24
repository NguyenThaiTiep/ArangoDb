const { HandelStatus } = require("../config/handeStatus");
const categorySeed = require("../lib/init-data/category.seed");
const { CategoryRepo } = require("../models/category");
const { all } = require("../router/book.router");

const getAll = async (take, skip) => {
  try {
    let result = await CategoryRepo.find()
      .offset(skip || 0)
      .limit(take || 10);
    return HandelStatus(200, null, result);
  } catch (e) {
    return HandelStatus(500);
  }
};
const removeAll = async () => {
  try {
    let result = await CategoryRepo.remove();
    return HandelStatus(200, null, result);
  } catch (e) {
    return HandelStatus(500);
  }
};
const getCount = async () => {
  try {
    let result = await CategoryRepo.count();
    return HandelStatus(200, null, result);
  } catch (e) {
    return HandelStatus(500);
  }
};
const add = (input) => {
  if (!input || !input.name || !input.code) return HandelStatus();
  let c;
  return HandelStatus();
};
const seed = async (input) => {
  let amount = input;
  let category = await categorySeed(input);

  try {
    await CategoryRepo.import(category);
    return HandelStatus(200, null, { amount });
  } catch (e) {
    return HandelStatus(500);
  }
};
module.exports = { add, seed, getAll, getCount, removeAll };
