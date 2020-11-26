import React from "react";
import { Container } from "react-bootstrap";
import { NavbarItem } from "src/components/navbar";

interface Props {}

export const Compare = (props: Props) => {
  return (
    <div>
      <NavbarItem page={"compare"} />
      <Container></Container>
    </div>
  );
};
