import React from 'react';
import Spinner from 'react-bootstrap/Spinner'

const WithSpinner=(WrappedComponent)=>{
    const Spinners=({ isLoading,...otherProps})=>{
        return isLoading ?(<Spinner animation="grow" variant="success" />):(<WrappedComponent {...otherProps}/>)
    }
    return Spinners;
}

export default WithSpinner;

// the above components is the higher order components 