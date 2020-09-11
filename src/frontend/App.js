import React, {useState, useEffect} from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import './css/style.css';
import { useSelector, useDispatch } from 'react-redux';

import Navbar from './components/layouts/Navbar';
import Footer from './components/layouts/Footer';

import Home from './screens/HomeScreen';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
/* Products List */

import {listProducts} from './actions/productActions';

function App() {

  const cart = useSelector(state => state.cart);

  const {cartItems} = cart;

  const userSignin = useSelector(state=>state.userSignin);

  const {userInfo} = userSignin;

  const productList = useSelector(state => state.productList);

  const { products, loading, error } = productList;

  const dispatch = useDispatch();

  useEffect(() => {
    
    dispatch(listProducts());

    return () => {
      //
    }
  }, [])

  const myFunction = () => {
      var input, filter, ul, li, a, i, txtValue, input2, spinner;
      input = document.getElementById("myInput");
      filter = input.value.toUpperCase();
      ul = document.getElementById("myUL");
      input2 = document.getElementById("myInput").value;
      li = ul.getElementsByTagName("li");
      spinner = document.getElementById("spinner");

      for (i = 0; i < li.length; i++) {
          a = li[i].getElementsByClassName("Tagname")[0];
          txtValue = a.textContent || a.innerText; 

          if(input2 !== ""){
            ul.style.display = "block";
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
              li[i].style.display = "";
             
            } else {
              li[i].style.display = "none";
              
            }
          }
          else{   
            ul.style.display = "none";
            
          }
                           
      }
  }

  const deleteAlert = () =>{

    var alert = document.getElementById('alert');

    alert.style.display = 'none';

  }

  return (
    <BrowserRouter>
      <nav className="d-flex flex-column justify-content-center">
        <div className="nav-top">
          <a className="text-success help-link" href="/">Ayuda</a>
          <a className="text-success explore-link" href="#products-catalog">Explorar productos</a>
          <a className="title-custom" href="/">Shopping Star</a>
          {
            userInfo ? <Link className="text-success signin-link" to="/profile">{userInfo.usuariobd.name}</Link>:
            <Link className="text-success signin-link" to="/signin">Iniciar sesión</Link>
          }
          {
            userInfo ? 
            <Link className="text-success register-link" to="/cart">
              <i className="mr-2">
                {
                  cartItems.length
                }
              </i>
              Carrito
            </Link>:
            <Link className="text-success signin-link" to="/signup">Registrarme</Link>
          }        
        </div>
        <div className="nav-bottom align-self-center">
          <div className="input-group search-group">
            <input
              type="text"
              className="form-control search"
              placeholder="Buscar productos"
              id="myInput"
              onKeyUp={myFunction}
            />
          </div>                           
        </div>
        <div className="d-flex justify-content-center">
            <ul id="myUL" className="col-md-9 search-box">   
                {
                  loading ? 
                  <div class="d-flex justify-content-center">
                    <button class="btn btn-success m-5 col-md-12" type="button" disabled>
                      <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      Loading...
                    </button>
                  </div>
                  :
                  error ? 
                  <div class="d-flex justify-content-center">
                    <div class="alert" id="alert">
                      <span className="closebtn" id="btn" onClick={deleteAlert}>&times;</span> 
                      <strong>Error!</strong> {error} = Possible error is because the backend is off
                    </div>
                  </div>
                  :
                  products.map(product =>  
                  <div className="col-md-12 m-1 row product-results ml-auto" key={product._id}>       
                    <li className="product-found">                 
                      <img src={product.image} alt="product" style={{width: "50px"}}/> 
                      <Link className="ml-2 Tagname link" to={/product/ + product._id}>{product.description}</Link>
                    </li>    
                  </div>)
                }
            </ul>
          </div>
      </nav>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2"></div>
          
        </div>
      </div>
  
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/product/:id" component={ProductScreen}></Route>
        <Route path="/cart/:id?" component={CartScreen}></Route>
        <Route path="/cart" component={CartScreen}></Route>
        <Route path="/shipping" component={ShippingScreen}></Route>
        <Route path="/payment" component={PaymentScreen}></Route>
        <Route path="/placeorder" component={PlaceOrderScreen}></Route>
        
      </Switch> 
      <Footer className="row"/>
    </BrowserRouter>
  );
}

export default App;
