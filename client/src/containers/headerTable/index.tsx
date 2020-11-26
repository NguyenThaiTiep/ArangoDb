import React, {useState} from "react";
import {Button, Col, Form, FormControl, Row} from "react-bootstrap";
import "./style.scss";

interface Props {
    searchKeyOnChange: (key: string) => void;
    total: Number;
}

export const HeaderTable = (props: Props) => {
    const {total, searchKeyOnChange} = props;
    const [value, setValue] = useState("");
    const searchOnChange = (event: any) => {
        let key = event.target.value;
        setValue(key);
        if (searchKeyOnChange && key) {
            searchKeyOnChange(key);
        }
    };
    return (
        <div className="headerTable">
            <Row>
                <Col>
                    <Form inline>
                        <FormControl
                            type="text"
                            onChange={searchOnChange}
                            placeholder="Search"
                            value={value}
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                </Col>{" "}
                <Col>
                    <div className={"sum"}>
                        Tổng : <b>{total}</b>
                    </div>
                </Col>
                <Button>Tạo mới</Button>
            </Row>
        </div>
    );
};
