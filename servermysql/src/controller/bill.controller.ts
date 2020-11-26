import { plainToClass } from "class-transformer";

import { handelStatus } from "../configs/handelStatus";
import { BillInputDto } from "../dto/billInput.dto";
import { BillService } from "../models/bill.model";

const getAll = async (req, res) => {
  let take = req.query.take;
  let skip = req.query.skip;
  let key = req.query.key;
  let result = await BillService.getAll(skip, take, key);
  return res.send(result);
};
const add = async (req, res) => {
  let input = req.body.input;
  let category = plainToClass(BillInputDto, input);
  let result = await BillService.add(category);
  return res.send(result);
};
const removeAll = async (req, res) => {
  let startTime = Date.now();
  let result = await BillService.removeAll();
  result.time = (Date.now() - startTime) / 1000;
  return res.send(result);
};
const seed = async (req, res) => {
  let amount = req.query.amount || 0;
  let result = await BillService.seed(amount);
  return res.send(result);
};
const count = async (req, res) => {
  //   let result = await BillService.getCount();
  return res.send();
};
const remove = async (req, res) => {
  let id = req.query.id;
  let result = await BillService.remove(id);
  return res.send(result);
};
const update = async (req, res) => {
  let input = req.body.input;
  let inputCategory = plainToClass(BillInputDto, input, {
    excludeExtraneousValues: true,
  });
  let result = await BillService.update(inputCategory);
  return res.send(result);
};

export const billController = {
  getAll,
  add,
  removeAll,
  seed,
  count,
  remove,
  update,
};
