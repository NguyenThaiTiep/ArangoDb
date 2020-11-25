import API from "..";

const getListCategory = (take: number, skip: number, key_search: string) => {
  return API.get("/category", {
    params: {
      skip: skip,
      take: take,
      key: key_search,
    },
  });
};
const removeById = (id: string) => {
  return API.delete("/category/remove", { params: { id: id } });
};
const update = (input: {
  name?: string;
  description?: string;
  _key?: string;
}) => {
  return API.put("/category", { input: input });
};
export const CategoryApi = { getListCategory, removeById, update };
