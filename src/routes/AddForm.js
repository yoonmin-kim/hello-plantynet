import React, { useEffect, useState,  } from 'react';
import { Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import FormInput from '../form/FormInput';
import * as service from "../services/reactController";

const AddForm = () => {

    const [deliveryCodes, setDeliveryCodes] = useState([]);
    const [regions, setRegions] = useState([]);
    const [itemType, setItemType] = useState([]);
    const [item, setItem] = useState({regions: []});
    const [isGlobalError, setIsGlobalError] = useState(false);
    const [isItemNameError, setIsItemNameError] = useState(false);
    const [isPriceError, setIsPriceError] = useState(false);
    const [isQuantityError, setIsQuantityError] = useState(false);
    const [globalErrorMsg, setGlobalErrorMsg] = useState('글로벌 오류');
    const [itemNameErrorMsg, setItemNameErrorMsg] = useState('상품명 오류');
    const [priceErrorMsg, setPriceErrorMsg] = useState('가격 오류');
    const [quantityErrorMsg, setQuantityErrorMsg] = useState('수량 오류');
    const [htmlTitle, setHtmlTitle] = useState('상품등록');
    const navigate = useNavigate();

    const fetchData = async () => {
        const getDeliveryCodes = await service.get('/api/deliveryCodes');
        const getRegions = await service.get('/api/regions');
        const getItemTypes = await service.get('/api/itemTypes');
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
    }

    const updateTitle = () => {
        const htmlTitleDom = document.querySelector("title");
        htmlTitleDom.innerHTML = htmlTitle;
    }

    useEffect(() => {
        fetchData();
        updateTitle();
    }, []);

    const handleChange = (e) => {
        const {name, value, checked} = e.target;
        if(name === 'open'){
            setItem({
                ...item,
                [name]: checked
            });
        } else if (name === 'regions') {
            if (checked) {
                setItem((prevState) => ({
                    ...prevState,
                    [name]: [...prevState["regions"], value] 
                }));
            } else {
                setItem((prevState) => ({
                    ...prevState,
                    [name]: [...prevState["regions"].filter(region => region !== value)] 
                }));
            }
        } else {
            setItem({
                ...item,
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
        const res = await service.post('/api/item', item);
        
        if (res && res.status === 201) {
            navigate('/');
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
                <h2>상품 등록 폼</h2>
            </div>
            <form onSubmit={handleSubmit}>
                {isGlobalError && <div><p style={errorStyle}>{globalErrorMsg}</p></div>}

                <div>
                    <label htmlFor="itemName">상품명(필수값)</label>
                    <FormInput field="itemName" isError={isItemNameError} handleChange={handleChange}
                    placeholder="이름을 입력하세요" errorStyle={errorStyle}/>
                    {isItemNameError && <div style ={errorStyle} >{itemNameErrorMsg}</div>}
                </div>
                <div>
                    <label htmlFor="price">가격(필수값, 최소500원)</label>
                    <FormInput field="price" isError={isPriceError} handleChange={handleChange}
                    placeholder="가격을 입력하세요" errorStyle={errorStyle}/>
                    {isPriceError &&<div style ={errorStyle} >{priceErrorMsg}</div>}
                </div>
                <div>
                    <label htmlFor="quantity">수량(필수값, 1000개제한)</label>
                    <FormInput field="quantity" isError={isQuantityError} handleChange={handleChange}
                    placeholder="수량을 입력하세요" errorStyle={errorStyle}/>
                    {isQuantityError && <div style ={errorStyle}>{quantityErrorMsg}</div>}
                </div>
                <div>
                    <div>배송 방식</div>
                    <select id="deliveryCode" name="deliveryCode" className="form-select" onChange={handleChange}>
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
                        <input type="checkbox" id="open" name="open" className="form-check-input" onChange={handleChange}/>
                        <label htmlFor="open" className="form-check-label">판매 오픈</label>
                    </div>
                </div>
                <div>
                    <div>등록 지역</div>
                    {regions.map(
                        (region, index) => (
                            <div key={region.key} className="form-check form-check-inline">
                                <input type="checkbox" id={"regions" + index} name="regions" value={region.key}
                                    className="form-check-input" onChange={handleChange}/>
                                <label htmlFor={"regions" + index}
                                    className="form-check-label">{region.value}</label>
                            </div>
                        ))}
                </div>
                <div>
                    <div>상품 종류</div>
                    {itemType.map(
                        (item, index) => (
                            <div key={item.key} className="form-check form-check-inline">
                                <input type="radio" id={"itemType" + index} name="itemType" value={item.key} className="form-check-input" onChange={handleChange}/>
                                <label htmlFor={"itemType" + index} className="form-check-label">{item.value}</label>
                            </div>
                        ))}
                </div>
                <div className="row">
                    <div className="col">
                        <button className="w-100 btn btn-primary btn-lg" type="submit">상품 등록</button>
                    </div>
                    <div className="col">
                        <Link className="w-100 btn btn-secondary btn-lg" to="/">취소</Link>
                    </div>
                </div>
            </form>
        </Container>
    );
};
export default AddForm;