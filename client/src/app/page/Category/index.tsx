import React from "react";
import {Container} from "react-bootstrap";
import {ListCategory} from "src/components/listCaterogy";
import {ListCategoryMysql} from "src/components/listCaterogy/index.mysql";
import {NavbarItem} from "src/components/navbar";

interface Props {
}

export const Category = () => {
    return (
        <div>
            <NavbarItem page={"category"}/>
            <Container>
                <ListCategory/>
                <ListCategoryMysql/>
            </Container>
        </div>
    );
};
