import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { logIn } from '../../actions/auth';

const Login = ({ logIn, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault();
    logIn({ email, password });
  }

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <div className="mx-auto p-3 vh-100 col-4 d-flex align-items-center">
        <form className="w-100 text-center" onSubmit={ e => handleSubmit(e) }>
          <img className="mb-4" src="/header.jpg" alt="" width="72" height="72" />
          <h1 className="h3 mb-3 font-weight-normal">Sign in</h1>
          <label htmlFor="email" className="sr-only">Email address</label>
          <input
            type="email"
            id="email"
            className="form-control mb-3"
            name="email"
            value={ email }
            placeholder="Email address"
            onChange={ e => handleChange(e) }
            required
            autoFocus />
          <label htmlFor="password" className="sr-only">Password</label>
          <input
            type="password"
            id="password"
            className="form-control mb-3"
            name="password"
            value={ password }
            placeholder="Password"
            onChange={ e => handleChange(e) }
            required />
          <br/>
          <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
          <p className="mt-5 mb-3 text-muted">&copy; 2020</p>
        </form>
      </div>
    </Fragment>
  )
}

Login.propTypes = {
  logIn: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { logIn })(Login);
