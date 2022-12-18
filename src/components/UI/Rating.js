import * as React from 'react';
import Rating from '@mui/material/Rating';

export default function BasicRating({ value }) {
   return (
      <Rating
         sx={{ fontSize: '18px' }}
         name="simple-controlled"
         value={value}
      />
   );
}