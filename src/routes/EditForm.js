import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as service from "../services/reactController"
import FormInput from '../form/FormInput';

const EditForm = () => {
    
    const {id} = useParams(); 
    const [deliveryCodes, setDeliveryCodes] = useState([]);
    const [regions, setRegions] = useState([]);
    const [itemType, setItemType] = useState([]);
    const [target, setTarget] = useState({});
    const [isGlobalError, setIsGlobalError] = useState(false);
    const [isItemNameError, setIsItemNameError] = useState(false);
    const [isPriceError, setIsPriceError] = useState(false);
    const [isQuantityError, setIsQuantityError] = useState(false);
    const [globalErrorMsg, setGlobalErrorMsg] = useState('글로벌 오류');
    const [itemNameErrorMsg, setItemNameErrorMsg] = useState('상품명 오류');
    const [priceErrorMsg, setPriceErrorMsg] = useState('가격 오류');
    const [quantityErrorMsg, setQuantityErrorMsg] = useState('수량 오류');
    const [htmlTitle, setHtmlTitle] = useState('상품수정');
    const navigate = useNavigate();

    let tempRegions = [];
    
    const fetchData = async () => {
        
        const getDeliveryCodes = await service.get('/api/deliveryCodes');
        const getRegions = await service.get('/api/regions');
        const getItemTypes = await service.get('/api/itemTypes');
        const getTarget = await service.get(`/api//editForm/${id}`);
        setDeliveryCodes(getDeliveryCodes);

        let temp = [];
        for (const key in getRegions) {
            temp.push({
                key: key,
                value: getRegions[key]
            });
        }
        setRegions(temp);

        temp = [];
        for (const key in getItemTypes) {
            temp.push({
                key: key,
                value: getItemTypes[key]
            });
        }
        setItemType(temp);
        setTarget(getTarget);
    }

    const updateTitle = () => {
        const htmlTitleDom = document.querySelector("title");
        htmlTitleDom.innerHTML = htmlTitle;
    }

    useEffect(() => {
        fetchData();
        tempRegions.push(target.regions);
        updateTitle();
    }, []);

    const handleChange = (e) => {
        const {name, value, checked} = e.target;
        if(name === 'open'){
            setTarget({
                ...target,
                [name]: checked
            });
        } else if (name === 'regions') {
            if (checked) {
                setTarget((prevState) => ({
                    ...prevState,
                    [name]: [...prevState["regions"], value] 
                }));
            } else {
                setTarget((prevState) => ({
                    ...prevState,
                    [name]: [...prevState["regions"].filter(region => region !== value)] 
                }));
            }
        } else {
            setTarget({
                ...target,
                [name]: value
            });
        }
    }

    const clearError = () => {
        setIsGlobalError(false);
        setGlobalErrorMsg('');
        setIsItemNameError(false);
        setItemNameErrorMsg('');
        setIsPriceError(false);
        setPriceErrorMsg('');
        setIsQuantityError(false);
        setQuantityErrorMsg('');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        clearError();
        const res = await service.put('/api/editForm', target);
        
        if (res && res.status === 201) {
            navigate('/editList');
        }
        if (res && res.status === 200) {
            res.data.map(error => {
               if(error.code === 'required') {
                   setIsGlobalError(true);
                   setGlobalErrorMsg(error.defaultMessage);
                }
               if(error.field === 'itemName') {
                   setIsItemNameError(true);
                   setItemNameErrorMsg(error.defaultMessage);
                }
               if(error.field === 'price') {
                   setIsPriceError(true);
                   setPriceErrorMsg(error.defaultMessage);
                }
               if(error.field === 'quantity') {
                   setIsQuantityError(true);
                   setQuantityErrorMsg(error.defaultMessage);
                }
            });
        }
    }

    const errorStyle= {
        borderColor: '#dc3545',
        color: '#dc3545'
    }

    return (
        <Container style={{ maxWidth: 600 }}>
            <div className="py-5 text-center">
                <h2>상품 수정 폼</h2>
            </div>
            <form onSubmit={handleSubmit}>
                {isGlobalError && <div><p style={errorStyle}>{globalErrorMsg}</p></div>}

                <div>
                    <label htmlFor="itemName">상품명(필수값)</label>
                    <FormInput field="itemName" isError={isItemNameError} handleChange={handleChange}
                    placeholder="이름을 입력하세요" errorStyle={errorStyle} value={target.itemName}/>
                    {isItemNameError && <div style ={errorStyle} >{itemNameErrorMsg}</div>}
                </div>
                <div>
                    <label htmlFor="price">가격(필수값, 최소500원)</label>
                    <FormInput field="price" isError={isPriceError} handleChange={handleChange}
                    placeholder="가격을 입력하세요" errorStyle={errorStyle} value={target.price}/>
                    {isPriceError &&<div style ={errorStyle} >{priceErrorMsg}</div>}
                </div>
                <div>
                    <label htmlFor="quantity">수량(필수값, 1000개제한)</label>
                    <FormInput field="quantity" isError={isQuantityError} handleChange={handleChange}
                    placeholder="수량을 입력하세요" errorStyle={errorStyle} value={target.quantity}/>
                    {isQuantityError && <div style ={errorStyle}>{quantityErrorMsg}</div>}
                </div>
                <div>
                    <div>배송 방식</div>
                    <select id="deliveryCode" name="deliveryCode" className="form-select" value={target.deliveryCode} onChange={handleChange}>
                        <option value="">==배송 방식 선택==</option>
                        {deliveryCodes.map(
                            deliveryCode => (
                                <option key={deliveryCode.code} value={deliveryCode.code}>{deliveryCode.displayName}</option>
                            ))}
                    </select>
                </div>

                <hr className="my-4" />

                <div>판매 여부</div>
                <div>
                    <div className="form-check">
                        <input type="checkbox" id="open" name="open" className="form-check-input" 
                        checked={target.open} onChange={handleChange}/>
                        <label htmlFor="open" className="form-check-label">판매 오픈</label>
                    </div>
                </div>
                <div>
                    <div>등록 지역</div>
                    {regions.map(
                        (region, index) => (
                            <div key={region.key} className="form-check form-check-inline">
                                <input type="checkbox" id={"regions" + index} name="regions" value={region.key}
                                    className="form-check-input" onChange={handleChange} 
                                    checked={target.regions !== undefined && target.regions.includes(region.key)}/>
                                <label htmlFor={"regions" + index}
                                    className="form-check-label">{region.value}</label>
                            </div>
                        ))}
                </div>
                <div>
                    <div>상품 종류</div>
                    {itemType.map(
                        (type, index) => (
                            <div key={type.key} className="form-check form-check-inline">
                                <input type="radio" id={"itemType" + index} name="itemType" value={type.key} className="form-check-input" onChange={handleChange}
                                checked={target.itemType !== undefined && target.itemType === type.key}/>
                                <label htmlFor={"itemType" + index} className="form-check-label">{type.value}</label>
                            </div>
                        ))}
                </div>
                <div className="row">
                    <div className="col">
                        <button className="w-100 btn btn-primary btn-lg" type="submit">저장</button>
                    </div>
                    <div className="col">
                        <Link className="w-100 btn btn-secondary btn-lg" to="/editList">취소</Link>
                    </div>
                </div>
            </form>
        </Container>
    );
};
export default EditForm;