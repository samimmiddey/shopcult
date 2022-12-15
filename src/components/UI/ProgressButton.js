import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { useTheme, useMediaQuery } from '@mui/material';

const ProgressButton = ({ loading, type }) => {
   const theme = useTheme();
   const smWidth = useMediaQuery(theme.breakpoints.down('sm'));

   return (
      <>
         {
            type !== 'image' &&
            <CircularProgress
               variant={loading ? 'indeterminate' : 'determinate'}
               sx={{ position: 'absolute' }}
               size={smWidth ? '20px' : '25px'}
               color="inherit"
            />
         }
         {
            type === 'image' &&
            <CircularProgress
               variant={loading ? 'indeterminate' : 'determinate'}
               sx={{ position: 'absolute' }}
               size={smWidth ? '8px' : '14px'}
               color="inherit"
            />
         }
      </>
   );
}

export default ProgressButton;
