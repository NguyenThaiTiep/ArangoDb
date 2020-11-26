const casual = require("casual");
const { genPassword } = require("../../utils/genarate");
var faker = require("faker");
let key = require("../../../../libs/name.json");
let name = key["name"];
casual.define("Category", function () {
  return {
    name:
      faker.vehicle.type() +
      " " +
      casual.random_element(name) +
      " " +
      casual.random_element(name) +
      " " +
      casual.random_element(name),
    amount: 0,
    description: faker.commerce.productDescription(),
    code: faker.random.uuid(),
  };
});
casual.seed(1000000);
module.exports = (times) => {
  var result = [];
  for (var i = 0; i < times; ++i) {
    let user = casual.Category;
    result.push(user);
  }
  return result;
};
