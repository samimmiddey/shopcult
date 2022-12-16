import React from 'react';
import { Backdrop, Box, CircularProgress } from '@mui/material';

const BodySpinner = ({ open }) => {
   return (
      <Box>
         <Backdrop
            sx={{
               backgroundColor: '#fff',
               color: 'rgb(90, 57, 161)',
               zIndex: 999
            }}
            open={open}
         >
            <CircularProgress color="inherit" />
         </Backdrop>
      </Box>
   );
};

export default BodySpinner;