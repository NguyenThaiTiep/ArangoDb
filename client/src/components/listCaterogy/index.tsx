import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Form, Modal, Table } from "react-bootstrap";
import { CategoryApi } from "../../api/category";
import { handleToast } from "../../app/page/toast";
import { HeaderTable } from "../../containers/headerTable";
import { PaginationItem } from "../pagination";
import "./style.scss";
export const ListCategory = () => {
  const [page, setPage] = useState({
    page: 1,
    take: 10,
    skip: 0,
    total: 100,
    key_search: "",
  });
  const [timeQuery, setTimeQuery] = useState(0);
  const [show, setShow] = useState(false);
  const [categorySelect, setCategorySelect] = useState({
    name: null,
    _key: null,
    description: null,
    categoryName: null,
    categoryId: null,
    amount: null,
  });
  const handleClose = () => setShow(false);
  const handleShow = (item: any) => {
    setCategorySelect(item);
    setShow(true);
  };
  const [total, setTotal] = useState(0);
  const handleChangePage = (pageNumber: any) => {
    setPage({ ...page, page: pageNumber, skip: (pageNumber - 1) * page.take });
  };
  const searchOnChange = (key: string) => {
    setPage({ ...page, page: 0, skip: 0, key_search: key });
  };
  const [categories, setCategories] = useState([]);
  const removeById = (id: string) => {
    CategoryApi.removeById(id).then((res) => {
      handleToast(res.data.status, res.data.time);
      setPage({ ...page });
    });
  };
  const update = () => {
    CategoryApi.update({
      name: (categorySelect as any).name as string,
      _key: (categorySelect as any)._key as string,
      description: (categorySelect as any).description,
    }).then((res) => {
      handleToast(res.data.status, res.data.time);
      setTimeQuery(res.data.time);
      setPage({ ...page });
      setShow(false);
    });
  };
  useEffect(() => {
    CategoryApi.getListCategory(page.take, page.skip, page.key_search).then(
      (res) => {
        if (res.data.status == 200) {
          let categories = res.data.result.result;
          setCategories(categories);
          setTotal(res.data.result.count);
          setTimeQuery(res.data.time);
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
        title={"ArangoDB"}
      />
      <div className="table-box">
        <Table striped bordered hover>
          <thead>
            <tr className="text-center">
              <th>#</th>
              <th>Mã</th>
              <th>Tên</th>
              <th>Mô tả</th>
              <th>SL</th>
              <th>#</th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0
              ? categories.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{(item as any)._key}</td>
                      <td>{(item as any).name}</td>
                      <td>{(item as any).description}</td>
                      <td>{(item as any).amount}</td>
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
                              onClick={() => removeById((item as any)._key)}
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
          handleChangePage={handleChangePage}
        />
      </div>
      <Modal show={show}>
        <Modal.Header closeButton onClick={handleClose}>
          <Modal.Title className="text-center">
            Chỉnh sửa thông tin Sách
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Tên Thể loại</Form.Label>
              <Form.Control
                type="email"
                onChange={(e: any) => {
                  setCategorySelect({
                    ...categorySelect,
                    name: e.target.value,
                  });
                }}
                value={(categorySelect as any).name}
              />
              <Form.Label>Mô tả</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="text"
                onChange={(e: any) => {
                  setCategorySelect({
                    ...categorySelect,
                    description: e.target.value,
                  });
                }}
                value={(categorySelect as any).description}
              />{" "}
              <Form.Label>Số lượng</Form.Label>
              <Form.Control
                disabled
                type="text"
                placeholder="text"
                value={(categorySelect as any).amount}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Thoát
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              update();
            }}
          >
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
