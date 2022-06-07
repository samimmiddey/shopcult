import React from 'react';
import { Typography } from '@mui/material';

const DiscountCard = () => {
   return (
      <div className='glassmorphism'>
         <Typography variant='h6' sx={{ fontWeight: 600, color: '#fff' }}>Get Upto 30% Off</Typography>
         <p style={{ color: '#fff', fontWeight: 300 }}>You can get upto 30 percent discount from here</p>
      </div>
   );
};

export default DiscountCard;