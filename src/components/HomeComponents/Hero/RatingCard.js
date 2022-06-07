import React from 'react';
import { Box } from '@mui/system';
import { Divider, Typography } from '@mui/material';
import rating from '../../../assets/rating.png';

const RatingCard = () => {
   return (
      <Box sx={{ minHeight: '50px', width: '200px', display: 'flex', flexDirection: 'column', marginRight: '3rem' }}>
         <Box sx={{ display: 'flex', alignItems: 'center', columnGap: '10px' }}>
            <Typography variant='h6' sx={{ fontWeight: 600, color: 'rgb(188, 167, 233)' }}>4.9</Typography>
            <Divider orientation='vertical' sx={{ backgroundColor: 'rgb(188, 167, 233)', height: '30px' }} />
            <img style={{ height: '50%', width: '50%', objectFit: 'contain' }} src={rating} alt="Rating" />
         </Box>
         <Box>
            <Typography variant='h6' sx={{ fontWeight: 500, color: 'rgb(213, 200, 240)' }}>120k Total Review</Typography>
         </Box>
      </Box>
   );
};

export default RatingCard;