import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const Home = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <div className='vh-100 d-flex align-items-center justify-content-center'>
      <Link to='/login' className='btn btn-primary mx-3'>Log in</Link>
      <Link to='/signup' className='btn btn-secondary mx-3'>Sign up</Link>
    </div>
  )
}

Home.propTypes = {
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Home);
