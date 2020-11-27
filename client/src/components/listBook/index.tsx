import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {useEffect, useState} from "react";
import {Button, ButtonGroup, Form, Modal, Table} from "react-bootstrap";
import {handleToast} from "src/app/page/toast";
import {BookAPI} from "../../api/book";
import {HeaderTable} from "../../containers/headerTable";
import {PaginationItem} from "../pagination";
import "./style.scss";
export const ListBook = () => {
    const [page, setPage] = useState({
        page: 1,
        take: 10,
        skip: 0,
        total: 100,
        key_search: "",
    });
    const [timeQuery, setTimeQuery] = useState(0);
    const [bookSelect, setBookSelect] = useState({
        name: null,
        _key: null,
        description: null,
        categoryName: null,
        author: null,
        categoryId: null,
        amount: null,
    });
    const [total, setTotal] = useState(0);
    const [books, setBooks] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (item: any) => {
        setBookSelect(item);

        setShow(true);
    };
    const handleChangePage = (pageNumber: any) => {
        setPage({...page, page: pageNumber, skip: (pageNumber - 1) * page.take});
    };
    const searchOnChange = (key: string) => {
        setPage({...page, page: 1, skip: 0, key_search: key || ""});
    };
    const removeBook = (key: string) => {
        BookAPI.remove(key).then((res) => {
            handleToast(res.data.status, res.data.time);
            setPage({...page});
        });
    };
    const updateBook = () => {
        BookAPI.update({
            _key: (bookSelect as any)._key,
            name: (bookSelect as any).name,
            description: (bookSelect as any).descriprtion,
            author: (bookSelect as any).author,
            amount: (bookSelect as any).amount,
        }).then((res) => {
            handleToast(res.data.status, res.data.time);
            if (res.data.status == 200) {
                setTimeQuery(res.data.time);
                setPage({...page});
                setShow(false);
            }
        });
    };
    useEffect(() => {
        BookAPI.getListBook(page.take, page.skip, page.key_search).then((res) => {
            if (res.data.status == 200) {
                let books = res.data.result.result;
                setBooks(books);
                setTimeQuery(res.data.time);
                setTotal(res.data.result.count);
            }
        });
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
                    <tr className={"text-center"}>
                        <th>#</th>
                        <th>Mã</th>
                        <th>Tên sách</th>
                        <th>Thể loại</th>
                        <th>Tác giả</th>
                        <th>Mô tả</th>
                        <th>Giá</th>
                        <th>SL</th>
                        <th>#</th>
                    </tr>
                    </thead>
                    <tbody>
                    {books.length > 0
                        ? books.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + (page.page - 1) * page.take + 1}</td>
                                    <td>{(item as any)._key}</td>
                                    <td>{(item as any).name}</td>
                                    <td>{(item as any).categoryName}</td>
                                    <td>{(item as any).author}</td>
                                    <td>{(item as any).description}</td>
                                    <td>{(item as any).price}</td>
                                    <td>{(item as any).amount}</td>
                                    <td>
                                        <ButtonGroup>
                                            <div
                                                className={"icon-item"}
                                                onClick={() => handleShow(item)}
                                            >
                                                <FontAwesomeIcon icon={faEdit} color={"green"}/>
                                            </div>
                                            <div
                                                className={"icon-item"}
                                                onClick={() => {
                                                    removeBook((item as any)._key);
                                                }}
                                            >
                                                <FontAwesomeIcon icon={faTrash} color={"red"}/>
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
                            <Form.Label>Tên Sách</Form.Label>
                            <Form.Control
                                type="text"
                                value={(bookSelect as any).name}
                                onChange={(e: any) => {
                                    setBookSelect({
                                        ...bookSelect,
                                        name: e.target.value,
                                    });
                                }}
                            />
                            <Form.Label>Mô tả</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="text"
                                value={(bookSelect as any).description}
                                onChange={(e: any) => {
                                    setBookSelect({
                                        ...bookSelect,
                                        description: e.target.value,
                                    });
                                }}
                            />{" "}
                            <Form.Label>Tác giả</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="text"
                                value={(bookSelect as any).author}
                                onChange={(e: any) => {
                                    setBookSelect({
                                        ...bookSelect,
                                        author: e.target.value,
                                    });
                                }}
                            />
                            <Form.Label>Số lượng</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="text"
                                value={(bookSelect as any).amount}
                                onChange={(e: any) => {
                                    setBookSelect({
                                        ...bookSelect,
                                        amount: e.target.value,
                                    });
                                }}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Thoát
                    </Button>
                    <Button variant="primary" onClick={updateBook}>
                        Lưu
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};
