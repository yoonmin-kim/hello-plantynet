import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as service from "../services/reactController"

const List = () => {

    const [list, setList] = useState([]);

    const fetchData = async () => {
        const listData = await service.get("/api/list");
        setList(listData);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Container style={{ maxWidth: 600 }}>
            <div className="py-5 text-center">
                <h2>상품목록</h2>
            </div>

            <div className="row">
                <div className="col">
                    <Link className="btn btn-primary float-end" to="/">홈으로</Link>
                </div>
            </div>

            <hr className="my-4" />

            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">상품번호</th>
                        <th scope="col">상품명</th>
                        <th scope="col">가격</th>
                        <th scope="col">수량</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map(item => (
                        <tr key={item.id}>
                            <th scope="row">{item.id}</th>
                            <td>{item.itemName}</td>
                            <td>{item.price}</td>
                            <td>{item.quantity}</td>
                        </tr>
                    ))}
                </tbody >
            </table >
        </Container >
    );
};

export default List;