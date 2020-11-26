import React from "react";
import { BillAPI_MYSQL } from "src/api/bill/index.mysql";
import { ListBill } from "src/components/listBill";
import { ListBillMysql } from "src/components/listBill/index.mysql";

interface Props {}

export const Bill = (props: Props) => {
  return (
    <div>
      <ListBill />
      <ListBillMysql />
    </div>
  );
};
