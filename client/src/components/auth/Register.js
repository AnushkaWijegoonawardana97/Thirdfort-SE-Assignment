import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";

const Register = ({ setAlert, register }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const { name, email, password, passwordConfirm } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      console.log("Password do not match");
      setAlert("Password do not match", "danger");
    } else {
      register({ name, email, password });
      // console.log(formData);
    }
  };

  return (
    <section className='container text-center' id='login-container'>
      <div className='card'>
        <form action='' className='card-body' onSubmit={(e) => onSubmit(e)}>
          <h3 className='text-primary mb-4'>Register</h3>

          <div className='mb-3'>
            <input
              type='text'
              name='name'
              id=''
              className='form-control'
              placeholder='Your name'
              value={name}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='mb-3'>
            <input
              type='email'
              name='email'
              id=''
              className='form-control'
              placeholder='Your email'
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
              value={password}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='mb-3'>
            <input
              type='password'
              name='passwordConfirm'
              id=''
              className='form-control'
              placeholder='confirm your password'
              value={passwordConfirm}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='mb-3'>
            <input
              type='submit'
              value='Register'
              className='btn btn-primary w-100'
            />
          </div>
          <hr className='mb-3' />
          <p className='text-dark mb-1'>
            Already have a acount ? <Link to='/login'>Sign in</Link>
          </p>
        </form>
      </div>
    </section>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
};

export default connect(null, { setAlert, register })(Register);
