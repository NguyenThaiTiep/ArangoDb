import { plainToClass } from "class-transformer";

import { handelStatus } from "../configs/handelStatus";
import { BookInputDto } from "../dto/Book.dto";
import { BookService } from "../models/book.model";

const getAll = async (req, res) => {
  let take = req.query.take;
  let skip = req.query.skip;
  let key = req.query.key;
  let result = await BookService.getAll(skip, take, key);
  return res.send(result);
};
const add = async (req, res) => {
  let input = req.body.input;
  let category = plainToClass(BookInputDto, input);
  let result = await BookService.add(category);
  return res.send(result);
};
const removeAll = async (req, res) => {
  let startTime = Date.now();
  let result = await BookService.removeAll();
  result.time = (Date.now() - startTime) / 1000;
  return res.send(result);
};
const seed = async (req, res) => {
  let amount = req.query.amount || 0;
  let result = await BookService.seed(amount);
  return res.send(result);
};
const count = async (req, res) => {
  //   let result = await BookService.getCount();
  return res.send();
};
const remove = async (req, res) => {
  let id = req.query.id;
  let result = await BookService.remove(id);
  return res.send(result);
};
const update = async (req, res) => {
  let input = req.body.input;
  let inputCategory = plainToClass(BookInputDto, input, {
    excludeExtraneousValues: true,
  });
  let result = await BookService.update(inputCategory);
  return res.send(handelStatus(200));
};

export const bookController = {
  getAll,
  add,
  removeAll,
  seed,
  count,
  remove,
  update,
};
