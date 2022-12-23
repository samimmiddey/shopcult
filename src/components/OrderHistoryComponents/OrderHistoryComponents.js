import React, { useState } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import OrderHistoryUI from './OrderHistoryUI/OrderHistoryUI';
import order from '../../assets/order.svg';
import EmptyTemplate from '../UI/EmptyTemplate';
import CustomHeader from '../UI/CustomHeader';
import CustomPagination from '../UI/CustomPagination';

const OrderHistoryComponents = () => {
   const [currentPage, setCurrentPage] = useState(1);

   const userData = useSelector(state => state.auth.userData);

   const theme = useTheme();
   const xlUpWidth = useMediaQuery(theme.breakpoints.up('xl'));
   const smWidth = useMediaQuery(theme.breakpoints.down('sm'));

   let sortedArray = [];
   if (userData?.order) {
      const dateArray = userData?.order?.map(order => {
         return {
            ...order,
            createdAt: parseFloat(order.createdAt)
         }
      });

      sortedArray = dateArray.sort((a, b) => b.createdAt - a.createdAt);
   };

   // Pagination Logic
   const ordersPerPage = xlUpWidth ? 8 : 6;
   const indexOfLastOrder = currentPage * ordersPerPage;
   const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
   const currentOrders = sortedArray.slice(indexOfFirstOrder, indexOfLastOrder);

   let pageNumbers = 0;
   for (let i = 1; i <= Math.ceil(sortedArray.length / ordersPerPage); i++) {
      pageNumbers++;
   };

   const paginate = (page) => setCurrentPage(page);

   return (
      <Box
         className='small-container'
         sx={theme => ({
            padding: '80px 32px 0 32px',
            [theme.breakpoints.down('sm')]: {
               paddingLeft: '16px',
               paddingRight: '16px'
            }
         })}
      >
         <CustomHeader
            text={`Recent Orders (${userData?.order?.length ? userData?.order?.length : 0})`}
            filter={false}
            selectMenu={false}
            fontSize={smWidth ? '1rem' : '1.25rem'}
            variant='h6'
         />
         {
            userData?.order?.length &&
            <Box sx={{ maxWidth: '1024px', margin: '0 auto' }}>
               <Box
                  sx={theme => ({
                     marginTop: '2rem',
                     display: 'flex',
                     flexDirection: 'column',
                     rowGap: '1rem',
                     [theme.breakpoints.down('sm')]: {
                        marginTop: '1.5rem'
                     }
                  })}
               >
                  {currentOrders.map((order, index) => (
                     <OrderHistoryUI key={index} order={order} />
                  ))}
               </Box>
               <CustomPagination
                  pageNumbers={pageNumbers}
                  paginate={paginate}
                  currentPage={currentPage}
               />
            </Box>
         }
         {
            !userData?.order?.length &&
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