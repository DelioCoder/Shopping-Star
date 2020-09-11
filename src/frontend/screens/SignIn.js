import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signin } from '../actions/userActions';

function SignIn(props) {

    const [email, setEmail] =useState('');

    const [password, setPassword] =useState('');

    const userSignin = useSelector(state=>state.userSignin);

    const {loading, userInfo, error} = userSignin;

    const dispatch = useDispatch();

    const redirect = props.location.search ? props.location.search.split("=")[1]:'/';

    useEffect(() => {
        
        if(userInfo){
            props.history.push(redirect);
        }

        return () => {
            //
        }
    }, [userInfo]);

    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(signin(email,password));
    }

  return (
    <div className="container mb-5">
      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4">
          <div className="card mt-4 shadow">
            <div className="card-header h3 text-center bg-custom">Iniciar sesión</div>
            <div className="card-body">
                {loading && <div>Loading...</div>}
                {error && <div class="alert alert-primary" role="alert">
                      Email or Password are incorrect!
                  </div>
                }
              <form onSubmit={submitHandler}>
                <div className="mb-3">
                  <label for="username" className="form-label">
                    Nombre de usuario
                  </label>
                  <input type="email" className="form-control" id="email" onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="mb-3">
                  <label for="password" className="form-label">
                    Contraseña
                  </label>
                  <input type="password" className="form-control" id="password" onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <button type="submit" className="btn btn-success btn-lg btn-block">
                  Iniciar sesión
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-4"></div>
      </div>
    </div>
  );
}

export default SignIn;
