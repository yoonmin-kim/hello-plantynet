import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FormInput from '../form/FormInput';
import * as service from "../services/reactController"

const RegisterForm = () => {

    const [register, setRegister] = useState({username: '', password: '', role: 'ROLE_USER'});
    const [roles, setRoles] = useState([]);
    const [htmlTitle, setHtmlTitle] = useState('회원가입페이지');

    const handleChange = (e) => {
        const {name, value} = e.target;
        setRegister({
            ...register,
            [name]: value
        });
    }

    const updateTitle = () => {
        const htmlTitleDom = document.querySelector("title");
        htmlTitleDom.innerHTML = htmlTitle;
    }
   
    const fetchData = async () => {
        const getRoles = await service.get('/api/roles');

        let temp = [];
        for (const key in getRoles) {
            temp.push({
                key: key,
                value: getRoles[key]
            });
        }
        setRoles(temp);
    }

    useEffect(() => {
        fetchData();
        updateTitle();
        console.log(register);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(register); 
    }

    return (
        <Container style={{ maxWidth: 600 }}>
            <form className="form-horizontal" onSubmit={handleSubmit}>
            <div className="py-5 text-center">
                <h2>회원가입</h2>
            </div>

            <hr className="my-4" />

            <div className="form-group">
                <label htmlFor="username" className="col-sm-2 control-label">아이디</label>
                <div className="col-sm-10">
                    <FormInput field="username" handleChange={handleChange} placeholder="아이디" autofocus/>
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="password" className="col-sm-2 control-label">비밀번호</label>
                <div className="col-sm-10">
                    <FormInput field="password" handleChange={handleChange} placeholder="패스워드"/>
                </div>
            </div>
            <div className="form-group col-sm-10">
                <label className="col-sm-2 control-label">권한</label>
                <select id="role" name="role" className="form-select" onChange={handleChange}>
                    {roles.map(
                        role => (
                            <option key={role.key} value={role.value}>{role.key}</option>
                    ))}
                </select>
            </div>
            <br/>
            <div className="form-group">
                <div className="col-sm-offset-1 col-sm-10">
                    <button type="Submit" className="btn btn-lg btn-primary btn-block">가입하기</button>&nbsp;
                    <Link className="btn btn-lg btn-primary btn-block" to="/user/login">취소</Link>
                </div>
            </div>
        </form>
        </Container>
    );
};

export default RegisterForm;