import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Form, Modal, Table } from "react-bootstrap";
import { HeaderTable } from "../../containers/headerTable";
import { PaginationItem } from "../pagination";
import "./style.scss";
import { handelToast } from "../../app/page/toast";

import Moment from "react-moment";
import { BillAPI_MYSQL } from "src/api/bill/index.mysql";

interface Props {
  API?: any;
}

export const ListBillMysql = (props: Props) => {
  const [page, setPage] = useState({
    page: 1,
    take: 5,
    skip: 0,
    total: 100,
    key_search: "",
  });
  const [timeQuery, setTimeQuery] = useState(0);
  const [billSelect, setBillSelect] = useState({
    id: null,
    description: null,
    customerName: null,
    customerPhoneNumber: null,
    totalPrice: null,
    date: null,
    product: null,
  });
  const [total, setTotal] = useState(0);
  const [bills, setBills] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (item: any) => {
    setBillSelect(item);
    setShow(true);
  };
  const handelChangePage = (pageNumber: any) => {
    setPage({ ...page, page: pageNumber, skip: (pageNumber - 1) * page.take });
  };
  const searchOnChange = (key: string) => {
    setPage({ ...page, page: 1, skip: 0, key_search: key });
  };
  const updateBook = () => {};
  const removeById = (id: string) => {
    BillAPI_MYSQL.removeById(id).then((res) => {
      handelToast(res.data.status, res.data.time);
      setPage({ ...page });
      setTimeQuery(res.data.time);
    });
  };
  const update = () => {
    BillAPI_MYSQL.update({
      customerName: (billSelect as any).customerName as string,
      customerPhoneNumber: (billSelect as any).customerPhoneNumber as string,
      id: (billSelect as any).id,
      description: (billSelect as any).description,
    }).then((res) => {
      handelToast(res.data.status, res.data.time);
      setPage({ ...page });
      setShow(false);
      setTimeQuery(res.data.time);
    });
  };
  useEffect(() => {
    BillAPI_MYSQL.getListBill(page.take, page.skip, page.key_search).then(
      (res) => {
        if (res.data.status == 200) {
          let bills = res.data.result.result;
          setBills(bills);
          setTimeQuery(res.data.time);
          setTotal(res.data.result.count);
        }
      }
    );
  }, [page]);
  return (
    <div className="list-item">
      <HeaderTable
        searchKeyOnChange={searchOnChange}
        total={total}
        timeQuery={timeQuery}
        title={"MySql"}
      />
      <div className="table-box">
        <Table striped bordered hover>
          <thead>
            <tr className={"text-center"}>
              <th>#</th>
              <th>Mã</th>
              <th>Tên Khách Hàng</th>
              <th>Số điện thoại</th>
              <th>Mô tả</th>
              <th>Tổng giá trị</th>
              <th>Thời gian</th>
              <th>Tổng Sản phẩm</th>
              <th>#</th>
            </tr>
          </thead>
          <tbody>
            {bills.length > 0
              ? bills.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + (page.page - 1) * page.take + 1}</td>
                      <td>{(item as any).id}</td>
                      <td>{(item as any).customerName}</td>
                      <td>{(item as any).customerPhoneNumber}</td>
                      <td>{(item as any).description}</td>
                      <td>{(item as any).totalPrice}</td>
                      <td>
                        <Moment format="dd mm yyyy">
                          {(item as any).date}
                        </Moment>
                      </td>
                      <td>
                        {((item as any).books as []).map((book) => {
                          return <li> {(book as any).name}</li>;
                        })}
                      </td>
                      <td>
                        <ButtonGroup>
                          <div
                            className={"icon-item"}
                            onClick={() => handleShow(item)}
                          >
                            <FontAwesomeIcon icon={faEdit} color={"green"} />
                          </div>
                          <div className={"icon-item"}>
                            <FontAwesomeIcon
                              icon={faTrash}
                              color={"red"}
                              onClick={() => removeById((item as any).id)}
                            />
                          </div>
                        </ButtonGroup>
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </Table>
      </div>
      <div className={"page"}>
        <PaginationItem
          pageActive={page.page}
          lastPage={Math.ceil(total / page.take)}
          handelChangePage={handelChangePage}
        />
      </div>
      <Modal show={show}>
        <Modal.Header closeButton onClick={handleClose}>
          <Modal.Title className="text-center">
            Chỉnh sửa thông tin Hóa đơn
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Tên Khách Hàng</Form.Label>
              <Form.Control
                type="text"
                value={(billSelect as any).customerName}
                onChange={(e: any) => {
                  setBillSelect({
                    ...billSelect,
                    customerName: e.target.value,
                  });
                }}
              />
              <Form.Label>Số điện thoại Khách Hàng</Form.Label>
              <Form.Control
                type="phone"
                placeholder="text"
                value={(billSelect as any).customerPhoneNumber}
                onChange={(e: any) => {
                  setBillSelect({
                    ...billSelect,
                    customerPhoneNumber: e.target.value,
                  });
                }}
              />
              <Form.Label>Mô tả</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="text"
                value={(billSelect as any).description}
                onChange={(e: any) => {
                  setBillSelect({
                    ...billSelect,
                    description: e.target.value,
                  });
                }}
              />{" "}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Thoát
          </Button>
          <Button variant="primary" onClick={update}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
