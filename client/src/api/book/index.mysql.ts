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
export const BookAPIMysql = { getListBook };
