const categoryRouter = require("./category.router");
const bookRouter = require("./book.router");
const billRouter = require("./bill.router");
module.exports = (app) => {
  app.use("/category", categoryRouter);
  app.use("/bill", billRouter);
  app.use("/book", bookRouter);
  app.use("/", (req, res) => res.send(`<h1>Welcome to ArangoDb Project</h1>`));
};
