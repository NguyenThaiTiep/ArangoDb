import { plainToClass } from "class-transformer";
import { Table } from "typeorm";
import { handelStatus } from "../configs/handelStatus";
import { CategoryInputDto } from "../dto/category.dto";
import { categoryService } from "../models/category.model";

const getAll = async (req, res) => {
  let take = req.query.take;
  let skip = req.query.skip;
  let key = req.query.key;
  let result = await categoryService.getAll(skip, take, key);
  return res.send(result);
};
const add = async (req, res) => {
  let input = req.body.input;
  let category = plainToClass(CategoryInputDto, input);
  let result = await categoryService.add(category);
  return res.send(result);
};
const removeAll = async (req, res) => {
  let startTime = Date.now();
  let result = await categoryService.removeAll();
  result.time = (Date.now() - startTime) / 1000;
  return res.send(result);
};
const seed = async (req, res) => {
  let amount = req.query.amount || 0;
  let result = await categoryService.seed(amount);

  return res.send(result);
};
const count = async (req, res) => {
  //   let result = await categoryService.getCount();
  return res.send();
};
const remove = async (req, res) => {
  let id = req.query.id;
  let result = await categoryService.remove(id);
  return res.send(result);
};
const update = async (req, res) => {
  let input = req.body.input;
  let inputCategory = plainToClass(CategoryInputDto, input, {
    excludeExtraneousValues: true,
  });
  let result = await categoryService.update(inputCategory);
  return res.send(handelStatus(200));
};

export const categoryController = {
  getAll,
  add,
  removeAll,
  seed,
  count,
  remove,
  update,
};
