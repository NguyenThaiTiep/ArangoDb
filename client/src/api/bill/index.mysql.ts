import API_MYSQL from "../index.mysq";

const getListBill = (take: number, skip: number, key_search: string) => {
  return API_MYSQL.get("/bill", {
    params: {
      skip: skip,
      take: take,
      key: key_search,
    },
  });
};
const removeById = (id: string) => {
  return API_MYSQL.delete("/bill/remove", { params: { id: id } });
};
const update = (input: {
  customerName?: string;
  customerPhoneNumber?: string;
  description?: string;
  id?: number;
}) => {
  return API_MYSQL.put("/bill", { input: input });
};
export const BillAPI_MYSQL = { getListBill, removeById, update };
