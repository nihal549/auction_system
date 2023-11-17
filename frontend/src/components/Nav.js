import React from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
// Material UI Componeents
import { Button, Link } from '@mui/material';
// Files
import './css/nav.css';
import logo from '../images/flight_logo.jpeg';
// Actions
import { logout } from '../actions/auth';

const Nav = (props) => {
  
  return (
    <div className='nav'>
      <div className='nav__group1'>
        <div className='nav__image-container'>
          <RouterLink to='/'>
            <img className='nav__icon' src={logo} alt='navicon' href='/' />
          </RouterLink>
        </div>

        {props.isAuth && (
          <div className='nav__buttons'>
            <RouterLink to='/' style={{ textDecoration: 'none' }}>
              <Button>Home</Button>
            </RouterLink>
            <RouterLink to='/dashboard' style={{ textDecoration: 'none' }}>
              <Button>Dashboard</Button>
            </RouterLink>
            {
              props.user.address==="seller" &&
              <div>
            
            <RouterLink to='/postad' style={{ textDecoration: 'none' }}>
              <Button>Post Product</Button>
            </RouterLink>
            </div>
}
            <RouterLink to='/search' style={{ textDecoration: 'none' }}>
              <Button>Search</Button>
            </RouterLink>
          </div>
        )}
      </div>

      <div className='nav__group2'>
        <div className='nav__account'>
          {props.isAuth ? (
            <Link
              href='#' color="#76B1D1"
              onClick={props.logout}
              sx={{ textDecoration: 'none' }}
            >
              <p style={{color:"#000"}}>Logout</p>
            </Link>
          ) : (
            <Link to='/login'className='lloign' sx={{ textDecoration: 'none' }}>
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuthenticated,
  user: state.auth.user
});

export default connect(mapStateToProps, { logout })(Nav);
