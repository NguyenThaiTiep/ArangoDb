import { plainToClass } from "class-transformer";
import { getRepository, Like } from "typeorm";
import { handelStatus } from "../configs/handelStatus";
import { CategoryInputDto } from "../dto/category.dto";
import { Category } from "../entity/category";
import { seedCategory } from "../libs/init-data/category.seed";
import { mapObject } from "../utils/map";

const getAll = async (skip: number, take: number, key: number) => {
  let categoryRepo = getRepository(Category);

  try {
    let startTime = Date.now();
    let count = await categoryRepo.count();
    let result = await categoryRepo.find({
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
    await getRepository(Category).query("Delete from  category");
    return handelStatus(200);
  } catch (e) {
    return handelStatus(500, e);
  }
};
const add = async (input: CategoryInputDto) => {
  let categoryRepo = getRepository(Category);
  let category = plainToClass(Category, input);
  try {
    let startTime = Date.now();
    await categoryRepo.save(category);
    return handelStatus(200, null, null, (Date.now() - startTime) / 1000);
  } catch (e) {
    return handelStatus(500, e);
  }
};
const remove = async (id: number) => {
  let categoryRepo = getRepository(Category);
  try {
    let startTime = Date.now();
    await categoryRepo.delete(id);
    return handelStatus(200, null, null, (Date.now() - startTime) / 1000);
  } catch (e) {
    return handelStatus(500, e);
  }
};
const update = async (input: CategoryInputDto) => {
  let categoryRepo = getRepository(Category);
  try {
    if (!input.id) return handelStatus(404);
    let category = await categoryRepo.findOne({ id: input.id });
    if (!category) return handelStatus(404);
    category = mapObject(category, input);
    let startTime = Date.now();
    await categoryRepo.save(category);
    return handelStatus(200, null, null, (Date.now() - startTime) / 1000);
  } catch (e) {
    return handelStatus(500, e);
  }
};
const seed = async (amount) => {
  let data = await seedCategory(amount);
  let startTime;
  if (data) {
    startTime = Date.now();
  }

  let categoryRepo = getRepository(Category);
  try {
    await categoryRepo.save(data);

    return handelStatus(200, null, null, (Date.now() - startTime) / 1000);
  } catch (e) {
    return handelStatus(500, e);
  }
};
export const categoryService = {
  add,
  seed,
  getAll,
  removeAll,
  remove,
  update,
};
