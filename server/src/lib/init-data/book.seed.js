const casual = require("casual");

var faker = require("faker");
casual.define("Book", function () {
  return {
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    amount: faker.commerce.price(),
    code: faker.random.uuid(),
    description: faker.commerce.productDescription(),
    category: null,
  };
});
module.exports = (times, categoryId) => {
  var result = [];
  for (var i = 0; i < times; ++i) {
    let book = casual.Book;
    book.categoryId = categoryId;
    result.push(book);
  }
  return result;
};
