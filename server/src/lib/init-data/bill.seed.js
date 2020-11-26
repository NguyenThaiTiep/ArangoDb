const { json } = require("body-parser");
const casual = require("casual");
const { fake } = require("faker");
let key = require("../../../../libs/name.json");
let name = key["name"];
var faker = require("faker");
casual.define("Bill", function () {
  return {
    code: faker.random.uuid(),
    description: faker.finance.transactionDescription(),
    products: [],
    customerName:
      faker.name.firstName() +
      " " +
      casual.random_element(name) +
      " " +
      casual.random_element(name) +
      " " +
      casual.random_element(name),
    customerPhoneNumber: faker.phone.phoneNumber(),
    totalPrice: 0,
    date: faker.date.between("2019/01/01", "2020/12/12"),
  };
});
casual.seed(1000000);
module.exports = (times, products) => {
  var result = [];
  for (var i = 0; i < times; ++i) {
    let bill = casual.Bill;
    bill.products = products;
    bill.totalPrice = sum(products);
    result.push(bill);
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
module.exports.sum = sum;
