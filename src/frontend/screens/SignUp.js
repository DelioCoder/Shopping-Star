import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../actions/userActions';

function SignUp(props) {

  const [name, setName] =useState('');

  const [username, setUsername] =useState('');

  const [email, setEmail] =useState('');

  const [password, setPassword] =useState('');

  const userRegister = useSelector(state=>state.userRegister);

    const {loading, userInfo, error} = userRegister;

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
        dispatch(register(name, username, email,password));
    }

  return (
    <div className="container mb-5">
      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4">
          <div className="card mt-4 shadow">
            <div className="card-header h3 text-center bg-custom">Únete a ShoppingStar</div>
            <div className="card-body">
              <form onSubmit={submitHandler}>
                <div className="mb-3">
                  <label for="name" className="form-label">
                    Nombre de completo
                  </label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="name" 
                    id="name" 
                    required
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label for="username" className="form-label">
                    Nombre de usuario
                  </label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="username" 
                    id="username" 
                    required
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label for="email" className="form-label">
                    Correo electrónico
                  </label>
                  <input 
                    type="email" 
                    className="form-control" 
                    name="email" 
                    id="email" 
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label for="password" className="form-label">
                    Contraseña
                  </label>
                  <input 
                    type="password" 
                    className="form-control" 
                    name="password" 
                    id="password" 
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-success btn-lg btn-block">
                  Registrarme
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

export default SignUp;
