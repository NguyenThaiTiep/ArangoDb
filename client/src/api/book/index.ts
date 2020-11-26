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
export const BookAPI = { getListBook, update, remove };
