import casual = require("casual");
import { plainToClass } from "class-transformer";
import { Category } from "../../entity/category";
import { User } from "../../entity/User";
let key = require("../../../../libs/name.json");
let name = key["name"];

var faker = require("faker");
casual.define("Category", function () {
  return {
    name:
      casual.random_element(name) +
      casual.random_element(name) +
      casual.random_element(name),
    amount: 0,
    description: faker.commerce.productDescription(),
    code: faker.random.uuid(),
  };
});
casual.seed(1000000);
export const seedCategory = (times) => {
  var result = [];
  for (var i = 0; i < times; ++i) {
    let user = (casual as any).Category;
    let output = plainToClass(Category, user);

    result.push(output);
  }
  return result;
};
