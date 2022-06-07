import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Backdrop } from '@mui/material';

const ProgressBar = () => {
   return (
      <Box>
         <Backdrop
            sx={{ backgroundColor: '#fff', color: 'rgb(90, 57, 161)', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
         >
            <CircularProgress color="inherit" />
         </Backdrop>
      </Box>
   );
}

export default ProgressBar;