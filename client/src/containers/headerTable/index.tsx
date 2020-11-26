import React, { useState } from "react";
import { Button, Col, Form, FormControl, Row } from "react-bootstrap";
import { useHistory, useParams } from "react-router";
import "./style.scss";

interface Props {
  searchKeyOnChange: (key: string) => void;
  total: Number;
  timeQuery?: Number;
}

export const HeaderTable = (props: Props) => {
  const { total, searchKeyOnChange, timeQuery } = props;
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
        <Col>
          <div className={"sum"}>
            TimeQuery :{" "}
            <b>
              {timeQuery || 0} <small>s</small>
            </b>
          </div>
        </Col>
        <Button>Tạo mới</Button>
      </Row>
    </div>
  );
};
