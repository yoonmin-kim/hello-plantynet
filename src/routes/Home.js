import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as service from '../services/reactController';

const Home = () => {

    const [htmlTitle, setHtmlTitle] = useState('플렌티넷 미니프로젝트');
    const navigate = useNavigate();

    const updateTitle = () => {
        const htmlTitleDom = document.querySelector("title");
        htmlTitleDom.innerHTML = htmlTitle;
    }

    const handleLogout = async () => {
        const logout = await service.get('/api/logout');
        if (logout.result === 'success') {
            navigate('/user/login');
        }

    }

    const handleNavigate = async (to, authority) => {
        const authorize = await service.get(`/api/authorize/${authority}`);
        if (authorize.result === 'error') {
            alert('해당 메뉴에 대한 권한이 없습니다.');
        } else {
            navigate(to);
        }
    }

    useEffect(() => {
        updateTitle();
    }, []);

    return (
        <>
            <headr>
                <div className="px-3 py-2 border-bottom mb-3">
                    <div className="container d-flex flex-wrap justify-content-center">
                        <div className="col-12 col-lg-auto mb-2 mb-lg-0 me-lg-auto"></div>
                        <div className="text-end">
                            <Button className="btn btn-primary" onClick={handleLogout}>로그아웃</Button>
                        </div>
                    </div>
                </div>
            </headr>
            <Container style={{ maxWidth: 600 }}>
                
                <div className="py-5 text-center">
                    <h2>상품 서비스</h2>
                </div>
                <div className="row g-2">
                    <div className="col-6">
                        <div className="p-3 bg-light">
                            <Link className="btn btn-primary w-100 btn-lg" to="/add">등록</Link>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="p-3 bg-light">
                            <Link className="btn btn-primary w-100 btn-lg" to="/list">목록</Link>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="p-3 bg-light">
                            <Button className="btn btn-primary w-100 btn-lg" onClick={() => {handleNavigate('/editList', 'manager,admin')}}>수정</Button>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="p-3 bg-light">
                            <Button className="btn btn-primary w-100 btn-lg" onClick={() => {handleNavigate('/deleteList', 'admin')}}>삭제</Button>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default Home;