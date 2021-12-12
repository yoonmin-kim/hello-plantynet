import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import FormInput from '../form/FormInput';
import * as service from "../services/reactController"

const Login = () => {

    const [login, setLogin] = useState({username: '', password: ''});
    const [htmlTitle, setHtmlTitle] = useState('로그인페이지');
    const navigate = useNavigate();

    const updateTitle = () => {
        const htmlTitleDom = document.querySelector("title");
        htmlTitleDom.innerHTML = htmlTitle;
    }

    useEffect(() => {
        updateTitle();
    }, []);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setLogin({
            ...login,
            [name]: value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(login);
        // const res = await service.post('/api/login', item)
        
        // if (res && res.status === 201) {
        //     navigate('/');
        // }
        // if (res && res.status === 200) {
        //     res.data.map(error => {
        //        if(error.code === 'required') {
        //            //setIsGlobalError(true);
        //            //setGlobalErrorMsg(error.defaultMessage);
        //         }
        //     });
        // }
    }

    return (
        <Container style={{ maxWidth: 600 }}>
            <form className="form-signin" onSubmit={handleSubmit}>
        <div className="py-5 text-center">
            <h2>로그인</h2>
        </div>

        <hr className="my-4"/>

        <p>
            <label htmlFor="username" className="sr-only">아이디</label>
            <FormInput field="username" handleChange={handleChange} placeholder="아이디" autofocus/>
        </p>
        <p>
            <label htmlFor="password" className="sr-only">비밀번호</label>
            <FormInput field="password" handleChange={handleChange} placeholder="비밀번호"/>
        </p>
        <button className="btn btn-lg btn-primary btn-block" type="submit">로그인</button>&nbsp;
        <Link className="btn btn-lg btn-primary btn-block" to="/user/register">회원가입</Link>
    </form>
        </Container>
    );
};

export default Login;