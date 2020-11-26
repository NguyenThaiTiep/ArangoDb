import React from "react";
import {
  Button,
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
} from "react-bootstrap";
import { useHistory } from "react-router";

interface Props {}

export const NavbarItem = (props: Props) => {
  const history = useHistory();
  return (
    <Navbar>
      <Container>
        <Navbar.Brand href="#home">BookStore.vn</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/category">Các thể loại</Nav.Link>
            <Nav.Link href="/book">Các đầu sách</Nav.Link>
            <Nav.Link href="/bill">Các hóa đơn</Nav.Link>
            <Nav.Link href="/compare">So sánh</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
