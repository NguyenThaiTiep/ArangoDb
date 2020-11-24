import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { BookAPI } from "../../api/book";
import { CategoryApi } from "../../api/category";
import { PaginationItem } from "../pagination";

interface Props {}

export const ListCategory = (props: Props) => {
  const [page, setPage] = useState({
    page: 1,
    take: 10,
    skip: 0,
  });
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    CategoryApi.getListCategory(page.take, page.skip).then((res) => {
      if (res.data.status == 200) {
        let categories = res.data.result;
        console.log(categories);

        setCategories(categories);
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
            <th>Tên</th>
            <th>Số lượng</th>
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
