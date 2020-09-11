import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { savePayment } from '../actions/carActions';
import CheckoutSteps from '../components/CheckoutSteps';

function PaymentScreen (props){

    const [paymentMethod, setPaymentMethod] = useState('');

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePayment({paymentMethod}));
        props.history.push('placeorder');
      }
    
      return (
        <div>
          <CheckoutSteps step1 step2 step3></CheckoutSteps>
          <div className="container mb-5">
            <div className="row">
              <div className="col-md-4"></div>
                <div className="col-md-4">
                  <div className="card mt-4 shadow">
                    <div className="card-header h3 text-center bg-custom">Shipping</div>
                    <div className="card-body">
                      <form onSubmit={submitHandler}>
                        <div className="col-md-12" style={{textAlign: "center"}}>
                          <h4>Payment Method</h4>
                        </div>
                        <div className="mb-3 mt-3">
                          <input
                              type="radio"
                              name="paymentMethod"
                              id="paymentMethod"
                              value="paypal"
                              onChange={(e) => setPaymentMethod(e.target.value)}
                            ></input>
                            <label className="ml-2" for="paymentMethod">Paypal</label>
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
      );

}

export default PaymentScreen;