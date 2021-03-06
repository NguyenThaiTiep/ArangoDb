import React from "react";
import {Container, Nav, Navbar,} from "react-bootstrap";

interface Props {
    page: string;
}

export const NavbarItem = (props: Props) => {
    const {page} = props;

    return (
        <Navbar>
            <Container>
                <Navbar.Brand href="#home">BookStore.vn</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/category" active={page === "category"}>
                            Các thể loại
                        </Nav.Link>
                        <Nav.Link href="/book" active={page === "book"}>
                            Các đầu sách
                        </Nav.Link>
                        <Nav.Link href="/bill" active={page === "bill"}>
                            Các hóa đơn
                        </Nav.Link>
                        <Nav.Link href="/compare" active={page === "compare"}>
                            So sánh
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
