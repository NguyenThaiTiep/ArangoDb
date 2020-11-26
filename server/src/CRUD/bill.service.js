const {HandleStatus} = require("../config/handeStatus");
const billSeed = require("../lib/init-data/bill.seed");
const {BillRepo} = require("../models/bill");
const {BookRepo} = require("../models/book");
const {Database} = require("../loader/connect");

const getAll = async (take, skip, key) => {
    try {
        let qr = `FOR bill IN Bill
    FILTER bill.customerName LIKE "%${key || ""}%" OR bill._key LIKE "%${
            key || ""
        }%"
    SORT bill.name
    LIMIT ${skip || 0},${take || 10}
      RETURN bill`;
        let count = await BillRepo.count();
        let result = await Database.query(qr);
        return HandleStatus(200, null, {count, result: result._result});
    } catch (e) {
        return HandleStatus(500);
    }
};

const removeAll = async () => {
    try {
        let result = await BillRepo.remove();
        return HandleStatus(200, null, result);
    } catch (e) {
        return HandleStatus(500);
    }
};
const getCount = async () => {
    let count = await BillRepo.count();
    return HandleStatus(200, null, count);
};
const add = async (input) => {
};
const seed = async (input) => {
    if (!input) {
        return HandleStatus(400);
    }
    let count = await BookRepo.count();
    let offset = Math.floor(Math.random() * count);
    let limit = Math.floor(Math.random() * 3 + 1);
    let books = await BookRepo.find().offset(offset).limit(limit);
    if (!books) {
        return HandleStatus(404, "not found");
    }
    let bills = await billSeed(input.amount || 0, books);

    try {
        await BillRepo.import(bills);
        return HandleStatus(200, null, {count: bills.length});
    } catch (e) {
        return HandleStatus(500, e);
    }
};
const remove = async (id) => {
    if (!id) return HandleStatus(404);
    try {
        await BillRepo.remove().where({_key: id});
        // BookRepo.remove().where({categoryId: id});
        return HandleStatus(200);
    } catch (e) {
        return HandleStatus(500);
    }
};

const update = async (input) => {
    try {
        await BillRepo.update({
            customerName: input.customerName,
            customerPhoneNumber: input.customerPhoneNumber,
            description: input.description,
        }).where({_key: input._key});
        // BookRepo.update({categoryName: input.name}).where({
        //     categoryId: input._key,
        // });
        return HandleStatus(200);
    } catch (e) {
        return HandleStatus(500);
    }
};
module.exports = {add, seed, getAll, getCount, removeAll, remove, update};
