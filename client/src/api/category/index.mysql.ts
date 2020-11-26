import API from "..";
import API_MYSQL from "../index.mysq";

const getListCategory = (take: number, skip: number, key_search: string) => {
  return API_MYSQL.get("/category", {
    params: {
      skip: skip,
      take: take,
      key: key_search,
    },
  });
};
const removeById = (id: string) => {
  return API_MYSQL.delete("/category/remove", { params: { id: id } });
};
const update = (input: {
  name?: string;
  description?: string;
  id?: number;
}) => {
  return API_MYSQL.put("/category", { input: input });
};
const seedData = (amount: number) => {
  return API_MYSQL.get("/category/seed", { params: { amount: amount } });
};
const add = (input: { name: string; description?: string }) => {
  return API_MYSQL.post("/category/add", { input: input });
};
export const CategoryAPI_MYSQL = {
  getListCategory,
  removeById,
  update,
  seedData,
  add,
};
