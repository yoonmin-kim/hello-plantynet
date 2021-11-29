import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
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
                        <Link className="btn btn-primary w-100 btn-lg" to="/editList">수정</Link>
                    </div>
                </div>
                <div className="col-6">
                    <div className="p-3 bg-light">
                        <Link className="btn btn-primary w-100 btn-lg" to="/deleteList">삭제</Link>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default Home;