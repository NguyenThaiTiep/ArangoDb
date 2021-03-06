import React from "react";
import { Container } from "react-bootstrap";
import { ListBook } from "src/components/listBook";
import { ListBookMysql } from "src/components/listBook/index.mysql";
import { NavbarItem } from "src/components/navbar";
export const Home = () => {
  return (
    <div>
      <NavbarItem page={"book"} />
      <Container>
        <ListBook />
        <ListBookMysql />
      </Container>
    </div>
  );
};
