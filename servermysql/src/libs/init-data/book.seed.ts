import casual = require("casual");
import { plainToClass } from "class-transformer";
import { Book } from "../../entity/book";
import { User } from "../../entity/User";
let key = require("../../../../libs/name.json");
let name = key["name"];

var faker = require("faker");
casual.define("Book", function () {
  return {
    name:
      casual.random_element(name) +
      " " +
      casual.random_element(name) +
      " " +
      casual.random_element(name),
    amount: 0,
    author:
      casual.random_element(name) +
      " " +
      casual.random_element(name) +
      " " +
      casual.random_element(name),
    price: faker.commerce.price(),
    description: faker.commerce.productDescription(),
    code: faker.random.uuid(),
  };
});
casual.seed(1000000);
export const seedBook = (times, cateogry) => {
  var result = [];
  for (var i = 0; i < times; ++i) {
    let user = (casual as any).Book;
    let output = plainToClass(Book, user);
    output.category = cateogry;
    result.push(output);
  }
  return result;
};
