import React, {useState} from "react";
import {Button, Form, FormControl, InputGroup, Table,} from "react-bootstrap";
import {BillApi} from "src/api/bill";
import {BillAPI_MYSQL} from "src/api/bill/index.mysql";
import {BookAPI} from "src/api/book";
import {BookAPIMysql} from "src/api/book/index.mysql";
import {CategoryApi} from "src/api/category";
import {CategoryAPI_MYSQL} from "src/api/category/index.mysql";
import {handleToast} from "src/app/page/toast";
import "./style.scss";
export const Seed = () => {
    const [typeApi, setTypeApi] = useState("Category");
    const [timeQueryMysql, setTimeQueryMysql] = useState(0);
    const [timeQueryArango, setTimeQueryArango] = useState(0);
    const [status, setStatus] = useState({
        MySql: true,
        ArangoDb: true,
    });
    const [amount, setAmount] = useState(0);
    const seedData = () => {
        if (amount == 0) return handleToast(0, 0, "Nhập số lượng");
        setStatus({ArangoDb: false, MySql: false});
        switch (typeApi) {
            case "Category":
                seedCategory();
                break;
            case "Book":
                seedBook();
                break;
            case "Bill":
                seedBill();
                break;
        }
    };

    const seedCategory = () => {
        CategoryAPI_MYSQL.seedData(amount).then((res) => {
            if (res.data.status != 200) handleToast(res.data.status);
            else {
                setTimeQueryMysql(res.data.time);
                setStatus({...status, MySql: true});
            }
        });
        CategoryApi.seedData(amount).then((res) => {
            if (res.data.status != 200) handleToast(res.data.status);
            else {
                setTimeQueryArango(res.data.time);
                setStatus({...status, ArangoDb: true});
            }
        });
    };
    const seedBook = () => {
        BookAPIMysql.seedData(amount).then((res) => {
            if (res.data.status != 200) handleToast(res.data.status);
            else {
                setTimeQueryMysql(res.data.time);
                setStatus({...status, MySql: true});
            }
        });
        BookAPI.seedData(amount).then((res) => {
            if (res.data.status != 200) handleToast(res.data.status);
            else {
                setTimeQueryArango(res.data.time);
                setStatus({...status, ArangoDb: true});
            }
        });
    };
    const seedBill = () => {
        BillAPI_MYSQL.seedData(amount).then((res) => {
            if (res.data.status != 200) handleToast(res.data.status);
            else {
                setTimeQueryMysql(res.data.time);
                setStatus({...status, MySql: true});
            }
        });
        BillApi.seedData(amount).then((res) => {
            if (res.data.status != 200) handleToast(res.data.status);
            else {
                setTimeQueryArango(res.data.time);
                setStatus({...status, ArangoDb: true});
            }
        });
    };
    return (
        <div className="seed">
            <h5>Seed Data</h5>
            <div className={"input-amount"}>
                <InputGroup className="mb-3">
                    <Form.Control
                        as="select"
                        defaultValue={1}
                        className={"select-type"}
                        onChange={(e: any) => {
                            setTypeApi(e.target.value);
                        }}
                    >
                        <option value={"Category"}>Category</option>
                        <option value={"Book"}>Book</option>
                        <option value={"Bill"}>Bill</option>
                    </Form.Control>
                    <FormControl
                        placeholder="Nhập số lượng bản ghi"
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                        type="number"
                        value={amount}
                        onChange={(e) => {
                            setAmount(Math.abs(Math.min(e.target.value as any, 10000)));
                        }}
                    />
                    <InputGroup.Append>
                        <Button
                            variant="success"
                            disabled={!status.ArangoDb || !status.MySql}
                            onClick={seedData}
                        >
                            Bắt đầu
                        </Button>
                    </InputGroup.Append>
                </InputGroup>{" "}
            </div>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th style={{width: "50%"}}>MySql</th>
                    <th style={{width: "50%"}}>ArangoDb</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>{status.MySql ? timeQueryMysql : "Đang thực hiện"}</td>
                    <td>{status.ArangoDb ? timeQueryArango : "Đang thực hiện"}</td>
                </tr>
                </tbody>
            </Table>
        </div>
    );
};
