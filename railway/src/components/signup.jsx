import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from '../js/SignupValidation';
import axios from 'axios';
import './style.css';

//icons
import { FaPizzaSlice } from 'react-icons/fa'
import { BsEyeFill } from 'react-icons/bs'
import { BsEyeSlashFill } from 'react-icons/bs'
// import Login from './login';

 function Signup() {
  const [values, setValues] = useState({
    name: '',
    lastname: '',
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()

  const handleInput = (event) => {
    setValues(prev =>
      ({ ...prev, [event.target.name]: [event.target.value] })
    )
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors(Validation(values));
  
    if (errors.name === '' && errors.lastname === '' && errors.email === '' && errors.password === '') {
      console.log('Submitting values:', values); 
      try {
        const res = await axios.post('http://localhost:8081/signup', values);
        console.log(res.data);
        navigate('/adminlogin');
      } catch (err) {
        console.error('Signup Error:', err);
        alert('Error signing up. Please try again later.');
      }
    }
  };
  

  const handleShow = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="background">
      <div className="container">
        
        <h1>Sign-Up</h1>
        <form action="" className="container-form" onSubmit={handleSubmit}>
          <div className="form-content">
            <label htmlFor='name'>Name</label>
            <input
              name='name'
              type="text"
              onChange={handleInput}
            />
            {errors.name && <span>{ errors.name }</span>}
          </div>
          <div className="form-content">
            <label htmlFor='name'>Last Name</label>
            <input
              name='lastname'
              type="text"
              onChange={handleInput}
            />
            {errors.lastname && <span>{ errors.lastname }</span>}
          </div>
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
          <div className="container-btn">
            <button className="form-button" type='submit'>
              Sign up
            </button>
           
            {/* <Login value={values} /> */}
            <Link className="btn-form" to='/adminlogin'>Login</Link>
          </div>
      
        </form>
      </div>
     
    </div>
  );
}
export default Signup;
