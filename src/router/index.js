const userRouter = require("./user.router");

module.exports = (app) => {
  app.use("/get", userRouter);
};
