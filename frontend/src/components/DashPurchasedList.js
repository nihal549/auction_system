import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// MUI
import {
  Box,
  ButtonGroup,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Button,
} from '@mui/material';
// Styling
import {
  paginationStyle,
  purchasedListContainerStyle,
  purchasedListTableStyle,
} from './css/dashStyle';
import StripeCheckout from 'react-stripe-checkout'
import './css/dashp.css'
const DashPurchasedList = ({ ads }) => {
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(1);
  const [adPerPage] = useState(5);

  const getGMTTime = (time) => {
    const dateTime = new Date(time);
    console.log(dateTime.toUTCString());
    return dateTime.toUTCString();
  };

  const handlePurchasedDetails = (adId) => {
    navigate('/ads/' + adId);
  };

  // Pagination
  let lastAdIndex = pageNumber * adPerPage;
  let firstAdIndex = lastAdIndex - adPerPage;
  let pageNumbers = [];
  const num = Math.ceil(ads.length / adPerPage);
  for (let i = 1; i <= num; i++) {
    pageNumbers.push(i);
  }
  const clickPageNumberButton = (num) => {
    setPageNumber(num);
  };
  const makePayment= (token,price)=>{
    const body={token,price}
    const headers={
      "Content-Type":"application/json"
    }
    return fetch("http://localhost:5000/payments",{
      method:"POST",
      headers,
      body:JSON.stringify(body)
    }).then(response=>{
      console.log(response)
      const {status} = response
      console.log("status :"+status)
    }).catch(error=>console.log("error"+error))

  }
const [click, setclick]=useState(false)
const clickHandler=()=>{
  setclick(true)
}
  return (
    <Box sx={purchasedListContainerStyle}>
      <Box sx={purchasedListTableStyle}>
        <table className='p-table'>
          <th>
            <tr >
              <td className='trow' >Product name</td>
              <td className='trow'>Price</td>
              <td className='trow' >Date</td>
              <td className='trow'>Details</td>
            </tr>
          </th>
          <tr>
            {ads.slice(firstAdIndex, lastAdIndex).map((ad) => (
              <tr key={ad._id}>
                <td className='trow'>{ad.productName}</td>
                <td className='trow'>${ad.currentPrice.$numberDecimal}</td>
                <td className='trow'>{getGMTTime(ad.updatedAt)}</td>
                <td className='trow'>      
                  <StripeCheckout
                      stripeKey='pk_test_51OCMaVSDppP0N6lccPnMXcdZJk8PaEji6MTP47021DlzgSivJ8K22pjg4FQTAFzzHABOMSheveldJ1Rw8lFsMCym005bmVgeaP'
                      token={()=>makePayment(ad.currentPrice.$numberDecimal)}
                      name='Buy product'
                      amount={ad.currentPrice.$numberDecimal*100}
                   >
                      <Button
                    size='small'
                    variant='outlined'
                    onClick={clickHandler}
                  >
                    {click?"done":"checkout"}
                  </Button>
                  </StripeCheckout>
                 
                </td>
              </tr>
            ))}
          </tr>
        </table>
      </Box>
      {ads.length !== 0 && (
        <Box sx={paginationStyle}>
          <ButtonGroup variant='outlined' size='small'>
            <Button
              disabled={pageNumber === 1}
              onClick={(e) => clickPageNumberButton(pageNumber - 1)}
            >
              Prev
            </Button>
            {pageNumbers.map((num) => {
              return (
                <Button
                  key={num}
                  disabled={pageNumber === num}
                  onClick={(e) => clickPageNumberButton(num)}
                >
                  {num}
                </Button>
              );
            })}
            <Button
              disabled={pageNumber === pageNumbers[pageNumbers.length - 1]}
              onClick={(e) => clickPageNumberButton(pageNumber + 1)}
            >
              Next
            </Button>
          </ButtonGroup>
        </Box>
      )}
    </Box>
  );
};

export default DashPurchasedList;
