import * as express from "express";
import { categoryController } from "../controller/category.controler";
const categoryRouter = express.Router();
categoryRouter
  .get("/", categoryController.getAll)
  .post("/add", categoryController.add)
  .get("/seed", categoryController.seed)
  .delete("/remove", categoryController.remove)
  .put("/", categoryController.update)
  .get("/removeAll", categoryController.removeAll)
  .get("/count", categoryController.count);
export default categoryRouter;
