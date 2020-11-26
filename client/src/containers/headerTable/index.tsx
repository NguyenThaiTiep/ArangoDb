import React, { useState } from "react";
import { Button, Col, Form, FormControl, Row } from "react-bootstrap";
import { useHistory, useParams } from "react-router";
import "./style.scss";

interface Props {
  searchKeyOnChange: (key: string) => void;
  total: Number;
  timeQuery?: Number;
  title?: string;
}

export const HeaderTable = (props: Props) => {
  const { total, searchKeyOnChange, timeQuery, title } = props;
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
      <h4>{title}</h4>
      <Row>
        <Col md={4}>
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
        <Col md={4}>
          <div className={"sum"}>
            Tổng : <b>{total}</b>
          </div>
        </Col>
        <Col md={4}>
          <div className={"sum"}>
            TimeQuery :{" "}
            <b>
              {timeQuery || 0} <small>s</small>
            </b>
          </div>
        </Col>
      </Row>
    </div>
  );
};
