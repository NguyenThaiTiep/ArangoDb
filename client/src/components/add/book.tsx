import React, { useState } from "react";
import {
  Button,
  Col,
  Form,
  FormControl,
  InputGroup,
  Row,
  Table,
} from "react-bootstrap";
import { BookAPI } from "src/api/book";
import { BookAPIMysql } from "src/api/book/index.mysql";
import { CategoryApi } from "src/api/category";
import { CategoryAPI_MYSQL } from "src/api/category/index.mysql";
import { handelToast } from "src/app/page/toast";
import "./style.scss";
interface Props {}

export const AddBook = (props: Props) => {
  const [book, setBook] = useState({
    name: null,
    code: null,
    author: null,
    price: 0,
    amount: 0,
    description: null,
    categoryId: 0,
    categoryKey: null,
  });
  const [status, setStatus] = useState({ mysql: true, arango: true });
  const [timeQueryMysql, setTimeQueryMysql] = useState(0);
  const [timeQueryArangoDb, setTimeQueryArango] = useState(0);

  const addBook = () => {
    if (!book.categoryKey || !book.categoryId || !book.name || !book.author)
      return handelToast(0, 0, "Thiếu dữ liệu");
    setStatus({ mysql: false, arango: false });

    BookAPI.add({
      name: book.name as any,
      author: book.author as any,
      price: book.price,
      amount: book.amount,
      categoryId: book.categoryKey as any,
      description: book.description as any,
    }).then((res) => {
      handelToast(res.data.status, res.data.time, res.data.message);
      if (res.data.status == 200) {
        setStatus({ ...status, arango: true });
        setTimeQueryArango(res.data.time);
      }
    });
    BookAPIMysql.add({
      name: book.name as any,
      author: book.author as any,
      price: book.price,
      amount: book.amount,
      categoryId: book.categoryId as any,
      description: book.description as any,
    }).then((res) => {
      handelToast(res.data.status, res.data.time, res.data.message);
      if (res.data.status == 200) {
        setStatus({ ...status, mysql: true });
        setTimeQueryMysql(res.data.time);
      }
    });
  };
  return (
    <div className={"add-data"}>
      <Form className="form-add">
        <Form.Group>
          <Form.Label>Tên sách</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập tên sách"
            onChange={(e: any) => {
              setBook({ ...book, name: e.target.value });
            }}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Tác giả</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập tác giả"
            onChange={(e: any) => {
              setBook({ ...book, author: e.target.value });
            }}
          />
        </Form.Group>{" "}
        <Form.Group>
          <Form.Row>
            <Col>
              <Form.Label>Số lượng</Form.Label>
              <Form.Control
                placeholder="100"
                type="number"
                onChange={(e: any) => {
                  setBook({ ...book, amount: Math.abs(e.target.value) });
                }}
              />
            </Col>
            <Col>
              <Form.Label>Giá</Form.Label>
              <Form.Control
                placeholder="100"
                type="number"
                onChange={(e: any) => {
                  setBook({ ...book, price: Math.abs(e.target.value) });
                }}
              />
            </Col>
          </Form.Row>
        </Form.Group>
        <Form.Group>
          <Form.Row>
            <Col>
              <Form.Label>Mã thể loại(Mysql)</Form.Label>
              <Form.Control
                placeholder="124124"
                type="number"
                onChange={(e: any) => {
                  setBook({ ...book, categoryId: Math.abs(e.target.value) });
                }}
              />
            </Col>
            <Col>
              <Form.Label>Mã sách(ArangoDb)</Form.Label>
              <Form.Control
                placeholder="12142"
                onChange={(e: any) => {
                  setBook({ ...book, categoryKey: e.target.value });
                }}
              />
            </Col>
          </Form.Row>{" "}
        </Form.Group>
        <Form.Group controlId="formGridPassword">
          <Form.Label style={{ textAlign: "left" }}>Mô tả</Form.Label>

          <Form.Control
            as="textarea"
            rows={3}
            onChange={(e: any) => {
              setBook({ ...book, description: e.target.value });
            }}
          />
        </Form.Group>{" "}
        <Button block variant="info" onClick={addBook}>
          Tạo Sách
        </Button>
      </Form>
      <hr />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th style={{ width: "50%" }}>MySql</th>
            <th style={{ width: "50%" }}>ArangoDb</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{status.mysql ? timeQueryMysql : "Đang thực hiện"}</td>
            <td>{status.arango ? timeQueryArangoDb : "Đang thực hiện"}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};
