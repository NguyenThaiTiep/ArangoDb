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
export const BookAPI = {getListBook};
