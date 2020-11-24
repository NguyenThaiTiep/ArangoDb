const { HandelStatus } = require("../config/handeStatus");
const categorySeed = require("../lib/init-data/category.seed");
const { CategoryRepo } = require("../models/category");

const getAll = async () => {
  try {
    let result = await CategoryRepo.find();
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
  let caterogy = await categorySeed(input);

  console.log(caterogy);
  try {
    await CategoryRepo.import(caterogy);
    return HandelStatus(200);
  } catch (e) {
    return HandelStatus(500);
  }
};
module.exports = { add, seed, getAll, getCount, removeAll };
