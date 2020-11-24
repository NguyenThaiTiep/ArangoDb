import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { BookAPI } from "../../api/book";
import { PaginationItem } from "../pagination";

interface Props {}

export const ListBook = (props: Props) => {
  const [page, setPage] = useState({
    page: 1,
    take: 10,
    skip: 0,
  });
  const [books, setBooks] = useState([]);
  useEffect(() => {
    BookAPI.getListBook(page.take, page.skip).then((res) => {
      if (res.data.status == 200) {
        let books = res.data.result;
        console.log(books);

        setBooks(books);
      }
    });
  }, []);
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Mã</th>
            <th>Tên sách</th>
            <th>Giá</th>
            <th>Số lượng</th>
          </tr>
        </thead>
        <tbody>
          {books.length > 0
            ? books.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{(item as any)._key}</td>
                    <td>{(item as any).name}</td>
                    <td>{(item as any).price}</td>
                    <td>{(item as any).amount}</td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </Table>
      <PaginationItem />
    </div>
  );
};
