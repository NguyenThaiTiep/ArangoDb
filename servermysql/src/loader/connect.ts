import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "../entity/User";

export const connectDatabase = () => {
  createConnection()
    .then(async (connection) => {
      console.log("Connect Database");
    })
    .catch((error) => console.log(error));
};
