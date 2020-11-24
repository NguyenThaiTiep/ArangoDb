const userRouter = require("./user.router");

module.exports = (app) => {
  app.use("/user", userRouter);
  app.use("/", (req, res) => res.send(`<h1>Welcome to ArangoDb Project</h1>`));
};
