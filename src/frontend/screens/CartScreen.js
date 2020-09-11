import React, { useEffect } from 'react';
import {Link} from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/carActions';
import { useDispatch, useSelector } from 'react-redux';

function CartScreen(props){

    const cart = useSelector(state => state.cart);

    const {cartItems} = cart;

    const productId = props.match.params.id;

    const qty = props.location.search ? Number(props.location.search.split("=")[1]): 1;

    const dispatch = useDispatch();

    console.log(cartItems);

    const removeFromCartHandler = (productId) =>{

        dispatch(removeFromCart(productId));

    }

    useEffect(() =>{
        if(productId){
            dispatch(addToCart(productId, qty));
        }
    }, [])

    const checkoutHandler = () =>{
        props.history.push("/signin?redirect=shipping");
    }

    return(
    <div className="container-fluid">

        <div className="col-lg-12 row">

            <div class="col-md-9 row">

                <div class="col-lg-12 mt-5">
                    <h5 style={{fontSize: "25px", fontWeight:"bold"}}>Mi carrito</h5>
                </div>

                <div class="col-lg-11"></div>

                <div class="col-lg-1"><h6 style={{color: "#686767"}}>Precio</h6></div>	

                {
                    cartItems.length ===0 ?
                    <div className="col-md-12">
                        <h1>El carrito esta vacio!</h1>
                    </div>:
                    cartItems.map(item=>
                    <div className="col-md-12 row mb-3">
                        <div class="col-lg-12 mb-4" style={{borderBottom: "2px solid #DDD"}}></div>
                        <div class="col-lg-10 row">
                            <div class="col-md-4">                      
                                <img src={item.image} alt="product" style={{width: "200px"}}/>
                            </div>
                            <div class="col-md-6">
                                <div className="col-xs-12">
                                    <Link to={"/product/" + item.product}>
                                        {item.description}
                                    </Link>  
                                </div>
                                <div className="col-xs-12">
                                    {item.countInStock && <div style={{color: "#007600", fontSize: "12px"}}>Disponible</div>}
                                </div>
                                <div className="col-xs-12 mt-2">
                                    <select className="form-control col-md-4" value={item.qty} onChange={(e) => dispatch(addToCart(item.product, e.target.value))}>
                                        {[...Array(item.countInStock).keys()].map(x => 
                                            <option key={x + 1} value={x + 1}>{x + 1}</option>
                                        )}
                                    </select>
                                    <button type="button" className="btn btn-danger mt-2" onClick={() => removeFromCartHandler(item.product)}>
                                        Delete
                                    </button>
                                </div>   
                            </div>
                        </div>
                            
                        <div class="col-xs-2 ml-auto" style={{textAlign: "right"}}>
                            <h5>US$ {item.price}</h5>
                        </div>
                    </div>		                     
                    )
                }

            </div>

            <div className="col-md-3">
                <div className="col-md-12 detailCard" style={{background: "#f3f3f3"}}>
                   <div className="row ml-1">
                        <h6 className="mt-3 mb-4">Subtotal</h6>
                        <h6 className="mt-3 ml-1">
                            ({cartItems.reduce((a, c) => a + c.qty, 0)} items)
                        </h6>
                        <h6 className="mt-3 ml-1" style={{fontWeight: "bold"}}>
                            : US$ {cartItems.reduce((a, c) => a + c.price*c.qty, 0)}
                        </h6>
                    </div>
                    <button onClick={checkoutHandler} className="btn btn-success col-md-12 mb-4" disabled={cartItems.length === 0}>
                        Proceder al pago
                    </button>  
                </div>
                <div className="col-md-12 detailCard mt-3 mb-5" style={{background: "#f3f3f3"}}>
                    <div className="col-md-12" >
                        <h5 style={{textAlign: "center"}}>Otros productos</h5>
                    </div>
                    <div className="col-md-12 row">
                        <div className="col-md-6">
                            <img src="https://shop.wwe.com/on/demandware.static/-/Sites-main/default/dw01b24f08/images/large/07555.jpg" />
                        </div>
                        <div className="col-md-6">
                            <p style={{fontSize: "13px"}}>John cena's T-shirt</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
    )
}
export default CartScreen;