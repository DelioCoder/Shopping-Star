import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Presentation from '../components/pages/home/Presentation';



function HomeScreen (props){

  const productList = useSelector(state => state.productList);

  const { products, loading, error } = productList;

  const dispatch = useDispatch();

  useEffect(() => {
    
    dispatch(listProducts());

    return () => {
      //
    }
  }, [])

  const deleteAlert = () =>{

    var alert = document.getElementById('alert');

    alert.style.display = 'none';

  }

  return loading ?
  <div class="d-flex justify-content-center">
    <button class="btn btn-success m-5 col-md-12" type="button" disabled>
      <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
      Loading...
    </button>
  </div>:
  error ?
  <div class="d-flex justify-content-center">
    <div class="alert" id="alert">
      <span className="closebtn" id="btn" onClick={deleteAlert}>&times;</span> 
      <strong>Error!</strong> {error} = Possible error is because the backend is off
    </div>
  </div>:
  <div className="container-fluid">
    <Presentation></Presentation>
    <ul className="products row">
      {
        products.map(product =>  
        <div className="col-md-4 p-2" key={product._id}>
          <div className="card-product shadow">
            <div className="product-image-container">
              <Link to={'/product/' + product._id}>
                <img src={product.image} alt="product"/>
              </Link>
            </div>
            <h3 className="text-center text-success mt-3">
              <Link to={/product/ + product._id}>{product.name}</Link>
            </h3>
            <Link className="btn btn-success btn-block">${product.price}</Link>
              
          </div>
      </div>)
      }                                    
    </ul>
  </div>
}

export default HomeScreen;