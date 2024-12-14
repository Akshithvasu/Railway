
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from '../js/LoginValidation';
import axios from 'axios';


//icons
import { FaPizzaSlice } from 'react-icons/fa'
import { BsEyeFill } from 'react-icons/bs'
import { BsEyeSlashFill } from 'react-icons/bs'

 function Login() {
  const [values, setValues] = useState({
    email: "",
    password:""
  })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()

  const handleInput = (event) => {
    setValues(prev =>
      ({ ...prev, [event.target.name]: [event.target.value] })
    )
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values));
    if (errors.email === '' && errors.password === '') {
      axios.post('http://localhost:8081/passengerlogin', values)
        .then(res => {
          if (res.data === "Success") {
            navigate('/booking');
          } else {
            alert('No record existed');
          }
        })
        .catch(err => console.log(err));
    }
  }

  const handleShow = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="background">
      <div className="container">
        
        <h1>Log In</h1>
        <form className="container-form" action="" >
          <div className="form-content">
            <label htmlFor='email'>Email</label>
            <input
              name='email'
              type="email"
              onChange={handleInput}
            />
            {errors.email && <span>{ errors.email }</span>}
          </div>
          <div className="form-content">
            <label htmlFor='password'>Password</label>
            <div className='container-icon-password'>
              <input
                name='password'
                type={showPassword ? "text" : "password"}
                onChange={handleInput}
              />
              <div onClick={handleShow}>
                {errors.password && <span>{errors.password}</span>}
                {showPassword
                  ? <BsEyeFill className='icon-password' />
                  : <BsEyeSlashFill className='icon-password' />
                }
              </div>
            </div>
          </div>
          <div className="container-button">
            <button onClick={handleSubmit} className="form-button" type='submit'>Log in</button>
           
            <Link className="btn-form" to='/signin'>Create Account</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Login;
