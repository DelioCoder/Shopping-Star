import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { saveShipping } from '../actions/carActions';
import CheckoutSteps from '../components/CheckoutSteps';

function ShippingScreen (props){

    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShipping({ address, city, postalCode, country }));
        props.history.push('payment');
      }
    
    return <div>
    <CheckoutSteps step1 step2 ></CheckoutSteps>
    <div className="container mb-5">
      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4">
          <div className="card mt-4 shadow">
            <div className="card-header h3 text-center bg-custom">Shipping</div>
            <div className="card-body">
              <form onSubmit={submitHandler}>
                <div className="mb-3">
                  <label for="address" className="form-label">
                    Addres
                  </label>
                  <input className="form-control" type="text" name="address" id="address" onChange={(e) => setAddress(e.target.value)}/>
                </div>
                <div className="mb-3">
                  <label for="city" className="form-label">
                    City
                  </label>
                  <input className="form-control" type="text" name="city" id="city" onChange={(e) => setCity(e.target.value)}/>
                </div>
                <div className="mb-3">
                  <label for="Postal Code" className="form-label">
                    Postal Code
                  </label>
                  <input className="form-control" type="text" name="postalCode" id="postalCode" onChange={(e) => setPostalCode(e.target.value)}/>
                </div>
	              <div className="mb-3">
                  <label for="country" className="form-label">
                    Country
                  </label>
                  <input className="form-control" type="text" name="country" id="country" onChange={(e) => setCountry(e.target.value)}/>
                </div>
	              <button type="submit" className="btn btn-success col-md-12">Continue</button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-4"></div>
      </div>
    </div>
  </div>

}

export default ShippingScreen;