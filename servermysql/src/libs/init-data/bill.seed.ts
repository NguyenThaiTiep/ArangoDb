import casual = require("casual");
import { plainToClass } from "class-transformer";
import { Bill } from "../../entity/bill";
import { Book } from "../../entity/book";
import { User } from "../../entity/User";
let key = require("../../../../libs/name.json");
let name = key["name"];

var faker = require("faker");
casual.define("Bill", function () {
  return {
    customerName:
      casual.random_element(name) +
      " " +
      casual.random_element(name) +
      " " +
      casual.random_element(name),
    customerPhoneNumber: faker.phone.phoneNumber(),
    description: faker.commerce.productDescription(),
    code: faker.random.uuid(),
    totalPrice: 0,
    books: [],
    date: faker.date.between("2019/01/01", "2020/12/12"),
  };
});
casual.seed(1000000);
export const seedBill = (times, books) => {
  var result = [];
  for (var i = 0; i < times; ++i) {
    let user = (casual as any).Bill;

    let output = plainToClass(Bill, user);
    output.books = books;
    output.totalPrice = sum(books);
    result.push(output);
  }
  return result;
};
const sum = (products) => {
  let result = 0;
  if (!products) return 0;
  for (let product of products) {
    result += product.price;
  }
  return result;
};
