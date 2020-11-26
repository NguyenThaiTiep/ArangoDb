import { connectDatabase } from "./connect";

export const loader = () => {
  connectDatabase();
};
