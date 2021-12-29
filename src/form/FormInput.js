import React from 'react';

const FormInput = ({field, isError, handleChange, placeholder, errorStyle, value, type='text'}) => {
    return (
        <div>
        {isError 
        ?<input type={type} id={field} name={field} className="form-control"
        placeholder={placeholder} onChange={handleChange} style={errorStyle} value={value}/>
        :<input type={type} id={field} name={field} className="form-control"
        placeholder={placeholder} onChange={handleChange} value={value}/>
        }    
        </div>
    );
};

export default FormInput;