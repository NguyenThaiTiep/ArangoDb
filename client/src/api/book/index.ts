import API from "..";

const getListBook = (take: number, skip: number, key_search: string) => {
  return API.get("/book", {
    params: {
      skip: skip,
      take: take,
      key: key_search,
    },
  });
};
const update = (input: {
  name?: string;
  price?: number;
  description?: string;
  _key?: string;
  author?: string;
  amount?: number;
}) => {
  return API.put("/book", { input: input });
};
const remove = (_key: string) => {
  return API.delete("/book/remove", { params: { id: _key } });
};
const seedData = (amount: number) => {
  return API.get("/book/seed", { params: { amount: amount } });
};
const add = (input: {
  name: string;
  price?: number;
  author: string;
  amount: number;
  categoryId: string;
  description?: string;
}) => {
  return API.post("/book/add", { input: input });
};
export const BookAPI = { getListBook, update, remove, seedData, add };
