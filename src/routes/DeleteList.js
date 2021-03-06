import Button from '@restart/ui/esm/Button';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as service from "../services/reactController";

const DeleteList = () => {

    const [list, setList] = useState([]);
    const [htmlTitle, setHtmlTitle] = useState('상품삭제');
    const navigate = useNavigate();

    const fetchData = async () => {
        const authorize = await service.get("/api/authorize/admin");
        if (authorize.result === 'error') {
            alert('해당 메뉴에 대한 권한이 없습니다.');
            navigate('/');
        }

        const listData = await service.get("/api/list");
        setList(listData);
    }

    const handleDelte = async (id) => {
        const result = await service.deleteItem('/api/deleteList', id);
        if(result.status === 200){
            setList(result.data);
        } else {
            console.error("삭제 실패!");
        }
    }

    const updateTitle = () => {
        const htmlTitleDom = document.querySelector("title");
        htmlTitleDom.innerHTML = htmlTitle;
    }

    useEffect(() => {
        fetchData();
        updateTitle();
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
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {list.map(item => (
                        <tr key={item.id}>
                            <th scope="row">{item.id}</th>
                            <td>{item.itemName}</td>
                            <td>{item.price}</td>
                            <td>{item.quantity}</td>
                            <td><Button className="btn btn-primary" onClick={() =>{handleDelte(item.id)}}>삭제</Button></td>
                        </tr>
                    ))}
                </tbody >
            </table >
        </Container >
    );
};

export default DeleteList;