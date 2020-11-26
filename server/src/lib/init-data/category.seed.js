const casual = require("casual");
const { genPassword } = require("../../utils/genarate");
var faker = require("faker");
casual.define("Category", function () {
  return {
    name: faker.vehicle.type(),
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
