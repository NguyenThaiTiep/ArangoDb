import { plainToClass } from "class-transformer";
import { getRepository, Like } from "typeorm";
import { handelStatus } from "../configs/handelStatus";
import { BookInputDto } from "../dto/Book.dto";
import { Book } from "../entity/book";
import { Category } from "../entity/category";
import { seedBook } from "../libs/init-data/book.seed";
import { mapObject } from "../utils/map";

const getAll = async (skip: number, take: number, key: number) => {
  let bookRepo = getRepository(Book);

  try {
    let startTime = Date.now();
    let count = await bookRepo.count();
    let result = await bookRepo.find({
      relations: ["category"],
      where: [
        {
          name: Like(`%${key || ""}%`),
        },
        { id: Like(`%${key || ""}%`) },
      ],
      take: take || 10,
      skip: skip || 0,
    });
    return handelStatus(
      200,
      null,
      { result, count },
      (Date.now() - startTime) / 1000
    );
  } catch (e) {
    return handelStatus(500, e);
  }
};
const removeAll = async () => {
  try {
    await getRepository(Book).query("Delete from  Book");
    return handelStatus(200);
  } catch (e) {
    return handelStatus(500, e);
  }
};

const add = async (input: BookInputDto) => {
  let BookRepo = getRepository(Book);
  let book = plainToClass(Book, input);
  let startTime = Date.now();
  let category = await getRepository(Category).findOne({
    id: input.categoryId,
  });
  if (!category) return handelStatus(404, "cateogry not found");
  try {
    book.category = category;
    await BookRepo.save(book);
    category.amount = category.amount || 0 + 1;
    await getRepository(Category).save(category);

    return handelStatus(200, null, null, (Date.now() - startTime) / 1000);
  } catch (e) {
    return handelStatus(500, e);
  }
};
const remove = async (id: number) => {
  let BookRepo = getRepository(Book);

  try {
    let startTime = Date.now();
    let book = await BookRepo.findOne({
      where: { id: id },
      relations: ["category"],
    });
    let category = await getRepository(Category).findOne({
      id: book.category.id,
    });
    if (!category || !book) return handelStatus(404);
    await BookRepo.delete(id);
    category.amount = category.amount || 0 - 1;
    await getRepository(Category).save(category);

    return handelStatus(200, null, null, (Date.now() - startTime) / 1000);
  } catch (e) {
    return handelStatus(500, e);
  }
};
const update = async (input: BookInputDto) => {
  let BookRepo = getRepository(Book);
  try {
    if (!input.id) return handelStatus(404);
    let Book = await BookRepo.findOne({ id: input.id });
    if (!Book) return handelStatus(404);
    Book = mapObject(Book, input);
    let startTime = Date.now();
    await BookRepo.save(Book);
    return handelStatus(200, null, null, (Date.now() - startTime) / 1000);
  } catch (e) {
    return handelStatus(500, e);
  }
};
const seed = async (amount) => {
  let CategoryRepo = getRepository(Category);

  let category = await CategoryRepo.createQueryBuilder()
    .orderBy("RAND()")
    .getOne();
  let data = await seedBook(amount, category);
  let startTime;
  if (data) {
    startTime = Date.now();
  }

  let BookRepo = getRepository(Book);
  try {
    await BookRepo.save(data);
    category.amount += amount;
    await CategoryRepo.save(category);
    return handelStatus(200, null, null, (Date.now() - startTime) / 1000);
  } catch (e) {
    return handelStatus(500, e);
  }
};
export const BookService = {
  add,
  seed,
  getAll,
  removeAll,
  remove,
  update,
};
