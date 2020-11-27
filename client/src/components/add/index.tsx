import React, {useState} from "react";
import {Button, Form, Table,} from "react-bootstrap";
import {CategoryApi} from "src/api/category";
import {CategoryAPI_MYSQL} from "src/api/category/index.mysql";
import {handleToast} from "src/app/page/toast";
import "./style.scss";
export const AddData = () => {
    const [category, setCategory] = useState({
        name: null,
        description: null,
    });
    const [status, setStatus] = useState({mysql: true, arango: true});
    const [timeQueryMysql, setTimeQueryMysql] = useState(0);
    const [timeQueryArangoDb, setTimeQueryArango] = useState(0);

    const addCategory = () => {
        setStatus({mysql: false, arango: false});
        CategoryApi.add(category as any).then((res) => {
            handleToast(res.data.status, res.data.time, res.data.message);
            if (res.data.status == 200) {
                setStatus({...status, arango: true});
                setTimeQueryArango(res.data.time);
            }
        });
        CategoryAPI_MYSQL.add(category as any).then((res) => {
            handleToast(res.data.status, res.data.time, res.data.message);
            if (res.data.status == 200) {
                setStatus({...status, mysql: true});
                setTimeQueryMysql(res.data.time);
            }
        });
    };
    return (
        <div className={"add-data"}>
            <Form className="form-add">
                <Form.Group>
                    <Form.Label>Tên thể loại</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Nhập tên thể loại"
                        onChange={(e: any) => {
                            setCategory({...category, name: e.target.value as any});
                        }}
                    />
                </Form.Group>
                <Form.Group controlId="formGridPassword">
                    <Form.Label style={{textAlign: "left"}}>Mô tả</Form.Label>

                    <Form.Control
                        as="textarea"
                        rows={3}
                        onChange={(e: any) => {
                            setCategory({...category, description: e.target.value});
                        }}
                    />
                </Form.Group>{" "}
                <Button block variant="info" onClick={addCategory}>
                    Tạo Category
                </Button>
            </Form>
            <hr/>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th style={{width: "50%"}}>MySql</th>
                    <th style={{width: "50%"}}>ArangoDb</th>
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
