import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import OrderHistoryHeader from './OrderHistoryHeader/OrderHistoryHeader';
import OrderHistoryUI from './OrderHistoryUI/OrderHistoryUI';
import order from '../../assets/order.svg';
import { Link } from 'react-router-dom';

const OrderHistoryComponents = () => {
   const userData = useSelector(state => state.auth.userData);

   let sortedArray = [];
   if (userData.order) {
      const dateArray = userData.order.map(order => {
         return {
            ...order,
            createdAt: parseFloat(order.createdAt)
         }
      });

      sortedArray = dateArray.sort((a, b) => b.createdAt - a.createdAt);
   }

   return (
      <Box
         className='container'
         sx={theme => ({
            padding: '80px 32px 0 32px',
            [theme.breakpoints.down('sm')]: {
               paddingLeft: '16px',
               paddingRight: '16px'
            }
         })}
      >
         <OrderHistoryHeader />
         {userData.order &&
            <Box
               sx={theme => ({
                  marginTop: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  rowGap: '20px',
                  [theme.breakpoints.down('md')]: {
                     rowGap: '1rem',
                  },
                  [theme.breakpoints.down('sm')]: {
                     marginTop: '1.5rem'
                  }
               })}
            >
               {sortedArray.map((order, index) => (
                  <OrderHistoryUI key={index} order={order} />
               ))}
            </Box>
         }
         {!userData.order &&
            <Box
               sx={{
                  textAlign: 'center',
                  margin: '3rem 0',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
               }}
            >
               <Box
                  sx={theme => ({
                     height: '200px',
                     width: '100%',
                     marginBottom: '2.5rem',
                     [theme.breakpoints.down('sm')]: {
                        height: '100px'
                     }
                  })}
               >
                  <img className='image' src={order} alt="order" />
               </Box>
               <Typography
                  mb={2}
                  variant='h6'
                  sx={theme => ({
                     fontWeight: 600,
                     color: 'text.primary',
                     [theme.breakpoints.down('sm')]: {
                        fontSize: '1rem'
                     }
                  })}
               >
                  No recent orders!
               </Typography>
               <Link
                  to='/shop/all'
               >
                  <Button sx={{ textTransform: 'none' }} variant='outlined'>Shop Now</Button>
               </Link>
            </Box>
         }
      </Box>
   );
};

export default OrderHistoryComponents;