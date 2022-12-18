import React from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import OrderHistoryUI from './OrderHistoryUI/OrderHistoryUI';
import order from '../../assets/order.svg';
import EmptyTemplate from '../UI/EmptyTemplate';
import CustomHeader from '../UI/CustomHeader';

const OrderHistoryComponents = () => {
   const userData = useSelector(state => state.auth.userData);

   const theme = useTheme();
   const smWidth = useMediaQuery(theme.breakpoints.down('sm'));

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
         <CustomHeader
            text='Recent Orders'
            filter={false}
            selectMenu={false}
            fontSize={smWidth ? '1rem' : '1.25rem'}
            variant='h6'
         />
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
            <EmptyTemplate
               img={order}
               text='No recent orders!'
               button={true}
            />
         }
      </Box>
   );
};

export default OrderHistoryComponents;