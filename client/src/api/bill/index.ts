import API from "..";

const getListBill = (take: number, skip: number, key_search: string) => {
    return API.get("/bill", {
        params: {
            skip: skip,
            take: take,
            key: key_search,
        },
    });
};
const removeById = (id: string) => {
    return API.delete("/bill/remove", {params: {id: id}});
};
const update = (input: {
    customerName?: string;
    customerPhoneNumber?: string;
    description?: string;
    _key?: string;
}) => {
    return API.put("/category", {input: input});
};
export const BillApi = {getListBill, removeById, update};
