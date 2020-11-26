import API_MYSQL from "../index.mysq";

const getListBook = (take: number, skip: number, key_search: string) => {
  return API_MYSQL.get("/book", {
    params: {
      skip: skip,
      take: take,
      key: key_search,
    },
  });
};
const remove = (_key: number) => {
  return API_MYSQL.delete("/book/remove", { params: { id: _key } });
};
const update = (input: {
  id: number;
  name?: string;
  price?: number;
  description?: string;
  author?: string;
  amount?: number;
}) => {
  return API_MYSQL.put("/book", { input: input });
};
const seedData = (amount: number) => {
  return API_MYSQL.get("/book/seed", { params: { amount: amount } });
};
const add = (input: {
  name: string;
  price?: number;
  author: string;
  amount: number;
  categoryId: number;
  description?: string;
}) => {
  return API_MYSQL.post("/book/add", { input: input });
};
export const BookAPIMysql = { getListBook, remove, update, seedData, add };
