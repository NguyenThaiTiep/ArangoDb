import {faEdit, faTrash,} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {useEffect, useState} from "react";
import {Button, ButtonGroup, Form, Modal, Table} from "react-bootstrap";
import {BookAPI} from "../../api/book";
import {HeaderTable} from "../../containers/headerTable";
import {PaginationItem} from "../pagination";
import "./style.scss";

interface Props {
}

export const ListBook = (props: Props) => {
    const [page, setPage] = useState({
        page: 1,
        take: 5,
        skip: 0,
        total: 100,
        key_search: "",
    });
    const [bookSelect, setBookSelect] = useState({
        name: null,
        _key: null,
        description: null,
        categoryName: null,
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
    const handelChangePage = (pageNumber: any) => {
        setPage({...page, page: pageNumber, skip: (pageNumber - 1) * page.take});
    };
    const searchOnChange = (key: string) => {
        setPage({...page, page: 0, skip: 0, key_search: key || ""});
    };
    const updateBook = () => {
    };
    useEffect(() => {
        BookAPI.getListBook(page.take, page.skip, page.key_search).then((res) => {
            if (res.data.status == 200) {
                let books = res.data.result.result;
                setBooks(books);
                setTotal(res.data.result.count);
            }
        });
    }, [page]);
    return (
        <div className="list-item">
            <HeaderTable searchKeyOnChange={searchOnChange} total={total}/>
            <Table striped bordered hover>
                <thead>
                <tr className={"text-center"}>
                    <th>#</th>
                    <th>Mã</th>
                    <th>Tên sách</th>
                    <th>Thể loại</th>
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
                                        <div className={"icon-item"}>
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
                        Chỉnh sửa thông tin Sách
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Tên Sách</Form.Label>
                            <Form.Control type="email" value={(bookSelect as any).name}/>
                            <Form.Label>Mô tả</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="text"
                                value={(bookSelect as any).description}
                            />{" "}
                            <Form.Label>Số lượng</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="text"
                                value={(bookSelect as any).amount}
                            />
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Thoát
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Lưu
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};
