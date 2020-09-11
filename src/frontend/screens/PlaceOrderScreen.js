import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import { saveShipping } from '../actions/carActions';

function PlaceOrderScreen(props) {

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');   
  const [postalCode, setPostalCode] = useState('');   
  const [country, setCountry] = useState('');       

  const cart = useSelector(state => state.cart);

  const { cartItems, shipping, payment } = cart;

   if (!shipping.address) {
    props.history.push("/shipping");
  } else if (!payment.paymentMethod) {
    props.history.push("/payment");
  }

  const itemsPrice = cartItems.reduce((a, c) => a+ c.price*c.qty, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = 0.15 * itemsPrice;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const dispatch = useDispatch();

  const placeOrderHandler = () =>{
      // create an Order
  }

  const submitHandler = (e) =>{
      e.preventDefault();
      dispatch(saveShipping({address, city, postalCode, country}));
      props.history.push('payment');
  }

  return (
    <div>
        <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
        <div className="container-fluid row">
            <div className="placeorder-info">
                <div className="col-md-11">
                    <h3>Shipping</h3>
                </div>
                <div className="col-md-11">
                    {cart.shipping.address }, {cart.shipping.city}
                    {cart.shipping.postalCode}, {cart.shipping.country}
                </div>
                <div className="col-md-11">
                    <h3>Payment</h3>
                    <div>
                        Payment Method: {cart.payment.paymentMethod}
                    </div>
                </div>
                <div className="col-md-11">
                    {
                        cartItems.length ===0 ?
                        <div>
                            Cart is empty
                        </div>:
                        cartItems.map(item=>
                        <div className="row">
                            <div className="col-md-4" key={item._id}>
                                <img src={item.image} alt="product" style={{width: "200px"}}/>
                            </div>
                            <div className="col-md-8">
                                <h2>
                                    <Link to={"/product/" + item.product}>
                                        {item.description}
                                    </Link>                              
                                </h2>                                                        
                                <h6>
                                    Cantidad: {item.qty}                       
                                </h6>
                                <h5 className="mt-3">${item.price}</h5>
                            </div>
                        </div>
                                             
                    )}
            
                </div>
            </div>
            <div className="placeorder-action">
                <ul>             
                    <li>
                        <h3>OrderSummary</h3>
                    </li>
                    <li>
                        <div>Items</div>
                    <div>${itemsPrice}</div>
                    </li>
                    <li>
                        <div>Shipping</div>
                        <div>{shippingPrice}</div>
                    </li>
                    <li>
                        <div>Tax</div>
                        <div>{taxPrice}</div>
                    </li>
                    <li>
                        <div>Order Total</div>
                    <div>${totalPrice}</div>
                    </li>
                </ul>
                <h3>
                    Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items)
                    :
                    $ {cartItems.reduce((a, c) => a + c.price*c.qty, 0)}
                </h3>
               
                <button className="btn btn-success col-md-12 mt-3" onClick={placeOrderHandler}>Place Order</button>
                
            </div>
        </div>
    </div>
    )

}

export default PlaceOrderScreen;