import React from 'react';
import { Box, Card, Typography } from '@mui/material';
import OrderHistoryCard from './OrderHistoryCard/OrderHistoryCard';

const OrderHistoryUI = ({ order }) => {
   const dateTime = new Date(order.createdAt);

   const date = dateTime.toDateString();
   const time = dateTime.toLocaleTimeString();

   return (
      <Card
         elevation={0}
         sx={theme => ({
            padding: '2rem 1.5rem',
            [theme.breakpoints.down('lg')]: {
               padding: '1.5rem 1rem'
            },
            [theme.breakpoints.down('sm')]: {
               padding: '1rem'
            }
         })}
      >
         <Box>
            <Typography
               sx={{
                  fontWeight: 600,
                  fontSize: '16px',
                  color: 'text.primary'
               }}
            >
               Order Placed On
            </Typography>
            <Typography
               sx={{
                  fontWeight: 600,
                  fontSize: '13px',
                  color: 'text.secondary',
                  marginTop: '5px'
               }}
            >
               {date}, {time}
            </Typography>
         </Box>
         <Box
            sx={{
               marginTop: '1rem',
               display: 'flex',
               flexDirection: 'column',
               rowGap: '1rem'
            }}
         >
            {order.data.map((data, index) => (
               <OrderHistoryCard key={index} data={data} />
            ))}
         </Box>
      </Card>
   );
};

export default OrderHistoryUI;