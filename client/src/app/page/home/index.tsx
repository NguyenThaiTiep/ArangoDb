import React from "react";
import { ListBook } from "src/components/listBook";
import { ListBookMysql } from "src/components/listBook/index.mysql";

interface Props {}

export const Home = (props: Props) => {
  return (
    <div>
      <ListBook />
      <ListBookMysql />
    </div>
  );
};
