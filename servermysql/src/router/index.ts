import billRouter from "./bill.router.ts";
import bookRouter from "./book.router";
import categoryRouter from "./category.router";

export const router = (app) => {
  app.use("/category", categoryRouter);
  app.use("/book", bookRouter);
  app.use("/bill", billRouter);
};
