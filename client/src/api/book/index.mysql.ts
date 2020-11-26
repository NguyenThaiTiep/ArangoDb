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

export const BookAPIMysql = { getListBook, remove, update };
