import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };
  return (
    <section className='container text-center' id='login-container'>
      <div className='card'>
        <form className='card-body' onSubmit={(e) => onSubmit(e)}>
          <h3 className='text-primary mb-4'>Sign in</h3>

          <div className='mb-3'>
            <input
              type='email'
              name='email'
              id=''
              className='form-control'
              placeholder='email'
              required
              value={email}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='mb-3'>
            <input
              type='password'
              name='password'
              id=''
              className='form-control'
              placeholder='password'
              required
              value={password}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='mb-3'>
            <input
              type='submit'
              value='Sign in'
              className='btn btn-primary w-100'
            />
          </div>
          <hr className='mb-3' />
          <p className='text-dark mb-1'>
            Don't have a acount ? <Link to='/register'>Register</Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
