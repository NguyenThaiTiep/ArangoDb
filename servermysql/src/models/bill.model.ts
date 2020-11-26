import { plainToClass } from "class-transformer";
import { start } from "repl";
import { getRepository, Like } from "typeorm";
import { handelStatus } from "../configs/handelStatus";
import { BillInputDto } from "../dto/billInput.dto";
import { Bill } from "../entity/bill";
import { Book } from "../entity/book";

import { Category } from "../entity/category";
import { seedBill } from "../libs/init-data/bill.seed";

import { mapObject } from "../utils/map";

const getAll = async (skip: number, take: number, key: number) => {
  let BillRepo = getRepository(Bill);

  try {
    let startTime = Date.now();
    let count = await BillRepo.count();
    let result = await BillRepo.find({
      relations: ["books"],
      where: [
        {
          customerName: Like(`%${key || ""}%`),
        },
        {
          customerPhoneNumber: Like(`%${key || ""}%`),
        },
        { id: Like(`%${key || ""}%`) },
      ],
      take: take || 10,
      skip: skip || 0,
    });
    return handelStatus(
      200,
      null,
      { result: result, count: count },
      (Date.now() - startTime) / 1000
    );
  } catch (e) {
    return handelStatus(500, e);
  }
};
const removeAll = async () => {
  try {
    await getRepository(Bill).query("Delete from  Bill");
    return handelStatus(200);
  } catch (e) {
    return handelStatus(500, e);
  }
};
const add = async (input: BillInputDto) => {
  let BillRepo = getRepository(Bill);
  let bill = plainToClass(Bill, input);
  let startTime = Date.now();
  console.log();

  let books = await getRepository(Book).findByIds(input.bookIds || [-1]);
  console.log(books);

  if (!books && books.length == 0)
    return handelStatus(404, "cateogry not found");
  try {
    await BillRepo.save(bill);
    return handelStatus(200, null, null, (Date.now() - startTime) / 1000);
  } catch (e) {
    return handelStatus(500, e);
  }
};
const remove = async (id: number) => {
  let BillRepo = getRepository(Bill);
  try {
    let startTime = Date.now();
    await BillRepo.delete(id);
    return handelStatus(200, null, null, (Date.now() - startTime) / 1000);
  } catch (e) {
    return handelStatus(500, e);
  }
};
const update = async (input: BillInputDto) => {
  let BillRepo = getRepository(Bill);

  try {
    console.log(input);

    if (!input.id) return handelStatus(404);
    let bill = await BillRepo.findOne({ id: input.id });
    console.log(bill);

    if (!bill) return handelStatus(404);
    bill = mapObject(bill, input);

    let startTime = Date.now();
    await BillRepo.save(bill);
    return handelStatus(200, null, null, (Date.now() - startTime) / 1000);
  } catch (e) {
    return handelStatus(500, e);
  }
};
const seed = async (amount) => {
  let bookRepo = getRepository(Book);
  let take = Math.floor(Math.random() * 3 + 1);
  console.log(take);

  let books = await bookRepo
    .createQueryBuilder()
    .take(take)
    .orderBy("RAND()")
    .getMany();

  let data = await seedBill(amount, books);
  let startTime;
  if (data) {
    startTime = Date.now();
  }

  let BillRepo = getRepository(Bill);
  try {
    await BillRepo.save(data);
    return handelStatus(200, null, null, (Date.now() - startTime) / 1000);
  } catch (e) {
    return handelStatus(500, e);
  }
};
export const BillService = {
  add,
  seed,
  getAll,
  removeAll,
  remove,
  update,
};
