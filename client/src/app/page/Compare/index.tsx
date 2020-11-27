import React from "react";
import {Container, Tab, Tabs} from "react-bootstrap";
import {AddData} from "src/components/add";
import {AddBook} from "src/components/add/book";
import {NavbarItem} from "src/components/navbar";
import {Seed} from "src/components/seed";

export const Compare = () => {
    return (
        <div>
            <NavbarItem page={"compare"}/>
            <Container>
                <Tabs defaultActiveKey="seed" id="uncontrolled-tab-example">
                    <Tab eventKey="seed" title="Seed Data">
                        <Seed/>
                    </Tab>
                    <Tab eventKey="profile" title="Input Category">
                        <AddData/>
                    </Tab>
                    <Tab eventKey="contact" title="Input Book">
                        <AddBook/>
                    </Tab>
                    <Tab eventKey="bill" title="Input Bill"/>
                </Tabs>
            </Container>
        </div>
    );
};
