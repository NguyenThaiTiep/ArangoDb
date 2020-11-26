import React from "react";
import { Container, Tabs, Tab } from "react-bootstrap";
import { AddData } from "src/components/add";
import { AddBook } from "src/components/add/book";
import { NavbarItem } from "src/components/navbar";
import { Seed } from "src/components/seed";

interface Props {}

export const Compare = (props: Props) => {
  return (
    <div>
      <NavbarItem page={"compare"} />
      <Container>
        <Tabs defaultActiveKey="seed" id="uncontrolled-tab-example">
          <Tab eventKey="seed" title="Seed Data">
            <Seed></Seed>
          </Tab>
          <Tab eventKey="profile" title="Input Category">
            <AddData />
          </Tab>
          <Tab eventKey="contact" title="Input Book">
            <AddBook />
          </Tab>
          <Tab eventKey="bill" title="Input Bill"></Tab>
        </Tabs>
      </Container>
    </div>
  );
};
