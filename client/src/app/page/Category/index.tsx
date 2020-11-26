import React from "react";
import { Container } from "react-bootstrap";

import { ListBook } from "src/components/listBook";
import { ListCategory } from "src/components/listCaterogy";
import { NavbarItem } from "src/components/navbar";

interface Props {}

export const Category = (props: Props) => {
  return (
    <div>
      <NavbarItem page={"category"} />
      <Container>
        <ListCategory />
      </Container>
    </div>
  );
};
