import React from "react";
import {Button, Container, Form, FormControl, Nav, Navbar,} from "react-bootstrap";

interface Props {
}

export const NavbarItem = (props: Props) => {
    return (
        <Navbar>
            <Container>
                <Navbar.Brand href="#home">BookStore.vn</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/category">Các thể loại</Nav.Link>
                        <Nav.Link href="/book">Các đầu sách</Nav.Link>
                        <Nav.Link href="/bill">Các hóa đơn</Nav.Link>
                    </Nav>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2"/>
                        <Button variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
