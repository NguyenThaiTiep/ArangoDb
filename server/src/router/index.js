const userRouter = require("./user.router");
const categoryRouter = require("./category.router");
const bookRouter = require("./book.router");
module.exports = (app) => {
  app.use("/user", userRouter);
  app.use("/category", categoryRouter);
  app.use("/book", bookRouter);
  app.use("/", (req, res) => res.send(`<h1>Welcome to ArangoDb Project</h1>`));
};
