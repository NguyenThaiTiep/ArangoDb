const { seed } = require("casual");
const casual = require("casual");
let key = require("../../../../libs/name.json");
let name = key["name"];
var faker = require("faker");
casual.define("Book", function () {
  return {
    name:
      faker.commerce.productName() +
      " " +
      casual.random_element(name) +
      " " +
      casual.random_element(name) +
      " " +
      casual.random_element(name),
    price: faker.commerce.price(),
    author:
      faker.name.firstName() +
      " " +
      casual.random_element(name) +
      " " +
      casual.random_element(name) +
      " " +
      casual.random_element(name),
    amount: 0,
    code: faker.random.uuid(),
    description: faker.commerce.productDescription(),
    categoryId: null,
    categoryName: null,
  };
});

casual.seed(1000000);
module.exports = (times, category) => {
  var result = [];
  for (var i = 0; i < times; ++i) {
    let book = casual.Book;
    book.categoryId = category._key;
    book.categoryName = category.name;
    result.push(book);
  }
  return result;
};
