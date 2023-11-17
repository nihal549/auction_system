import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// MUI
// import {
//   Box,
//   Paper,
//   Typography,
//   Table,
//   TableRow,
//   TableCell,
//   TableBody,
// } from '@mui/material';
import { Container, Row, Col, Table, Card } from 'react-bootstrap';
// Style files
import { boxStyle, paperStyle } from './css/adStyles';
import { profileTableStyle, tableCellStyle } from './css/dashStyle';
import './css/dashboard.css'
// Actions
import { clearAlerts } from '../actions/alert';

// Project files
import Spinner from './Spinner';
import DashboardAdList from './DashboardAdList';
import LoadingDisplay from './LoadingDisplay';
// Actions
import { getUserPurchasedAds } from '../actions/ad';
import DashPurchasedList from './DashPurchasedList';
import Nav from './Nav'
const Dashboard = (props) => {
  const navigate = useNavigate();
  const boxStyle = {
    marginBottom: '20px',
  };

  const paperStyle = {
    padding: '20px',
  };

  const profileTableStyle = {
    marginTop: '15px',
  };

  const tableCellStyle = {
    padding: '8px',
  };

  
  useEffect(() => {
    if (props.isAuth) {
      props.getUserPurchasedAds();
    }
  }, [props.loading]);

  useEffect(() => {
    return () => {
      props.clearAlerts();
    };
  }, []);

  // Check if user is logged
  if (!props.isAuth) {
    navigate('/login');
  }

  return props.loading ? (
    <Spinner />
  ) : (
    <div>
      <Nav></Nav>
      <Fragment>
      <Container>
        <Row>
          <Col md={12} style={boxStyle}>
            <div className='p-div'>
              <h1>Details</h1>
              <table className='details'>
                <tr>
                  <td>User Name</td>
                  <td>{props.user.username}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>{props.user.email}</td>
                </tr>
                <tr>
                  <td>User type</td>
                  <td>{props.user.address}</td>
                </tr>
              </table>
            </div>
          </Col>
          <Col md={12} style={boxStyle}>
            {props.user.address==="seller" && 
            <Card style={paperStyle}>
              <h1>My Inventory</h1>
              <DashboardAdList />
            </Card>
            }
            
          </Col>
          <Col md={12} style={boxStyle}>
            <Card style={paperStyle}>
              <h1>My purchases</h1>
              {props.purchasedLoading ? (
                <LoadingDisplay />
              ) : (
                <DashPurchasedList ads={props.purchased} />
              )}
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  isAuth: state.auth.isAuthenticated,
  user: state.auth.user,
  purchased: state.ad.purchased,
  purchasedLoading: state.ad.purchasedLoading,
});

export default connect(mapStateToProps, { getUserPurchasedAds, clearAlerts })(Dashboard);
