import API from "..";

const getListCategory = (take: number, skip: number) => {
  return API.get("/category", {
    params: {
      skip: skip,
      take: take,
    },
  });
};
export const CategoryApi = { getListCategory };
