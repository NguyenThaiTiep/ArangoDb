import React from "react";
import {Container} from "react-bootstrap";
import {ListBill} from "src/components/listBill";
import {ListBillMysql} from "src/components/listBill/index.mysql";
import {NavbarItem} from "src/components/navbar";

interface Props {
}

export const Bill = () => {
    return (
        <div>
            <NavbarItem page={"bill"}/>
            <Container>
                <ListBill/>
                <ListBillMysql/>
            </Container>
        </div>
    );
};
