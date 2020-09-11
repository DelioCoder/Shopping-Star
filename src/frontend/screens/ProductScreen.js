import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct } from '../actions/productActions';


function ProductScreen (props){
    const [ qty, setQty ] = useState(1);
    const productDetails = useSelector(state => state.productDetails);
    const {product, loading, error} = productDetails;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(detailsProduct(props.match.params.id));
        return () => {
            //
        }
    }, []);

    const handleAddToCart = ()=>{
        props.history.push("/cart/"+props.match.params.id+"?qty=" + qty);
    }

    return <div className="container-fluid">  
       
        {
            loading ? <div>Loading...</div>:
            error ? <div>{error}</div>:
                (
                    <div className="row">
                        <div className="col-md-3 details-image m-3">
                            <img src={product.image} alt="product"/>
                        </div>
                        <div className="col-md-4" key={product._id}>
                            <div className="col-xs-12">
                                <h1>{product.description}</h1>
                            </div>
                            <div className="col-xs-12 mt-3">
                                <h6 className="brand">Marca: {product.brand}</h6>
                            </div>
                            <div className="col-xs-12 mt-3">
                                <h6>Color: Blanco</h6>
                            </div>
                            <div className="col-xs-12 mt-3">
                                <li style={{fontSize: '13px'}}>100 % Algodón</li>
                                <li style={{fontSize: '13px'}}>Tejido: 100% algodón. Impresión frontal.</li>
                                <li style={{fontSize: '13px'}}>Una variedad de estilos, siempre habrá uno favorito.</li>
                                <li style={{fontSize: '13px'}}>Super cómodo, ajuste relajado, ligero y a la moda.</li>
                                <li style={{fontSize: '13px'}}>Llévalo en esta temporada y serás más elegante y único.</li>
                                <li style={{fontSize: '13px'}}>Bienvenido a comprar en esta tienda.</li>
                            </div>
                            {/* <div className="col-xs-12"><h4>{product.name}</h4></div>
                            <div className="col-xs-12">{product.rating} Starts ({product.numReviews} numReviews)</div>
                            <div className="col-xs-12">Price: <b>${product.price}</b></div> */}
                                                                                                                             
                        </div>
                        <div className="col-lg-4 ml-auto">
                            <div className="detailCard">
                                <div className="detailBox">
                                    <div className="col-xs-12 mt-3">Price: {product.price}</div>                                                                   
                                    <div className="col-xs-12 mt-3">
                                        Status: {product.countInStock>0 ? "In Stock": "Out of stock"}
                                    </div>
                                    <div className="col-xs-12 mt-3">
                                        Qty: <select value={qty} onChange={(e) => {setQty(e.target.value)}}>
                                            {[...Array(product.countInStock).keys()].map(x=>
                                                <option key={x+1} value={x+1}>{x+1}</option>    
                                            )}
                                        </select>
                                    </div>
                                    <div className="col-xs-12 mt-4" style={{textAlign: 'center'}}>
                                        {product.countInStock > 0 && <button onClick={handleAddToCart} className="btn btn-success col-md-10">Add to Cart</button>
                                                
                                        }  
                                    </div>
                                </div>             
                            </div>                                                                  
                        </div>
                        <div className="col-md-12 m-5">
                            <Link className="btn btn-success" to="/">Back to result</Link>
                        </div>                      
                    </div>
                )
        }
        
    </div>
}

export default ProductScreen;