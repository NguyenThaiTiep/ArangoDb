import API from "..";

const getListBook = (take: number, skip: number) => {
  return API.get("/book", {
    params: {
      skip: skip,
      take: take,
    },
  });
};
export const BookAPI = { getListBook };
