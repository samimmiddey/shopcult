import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const TransparentProgress = ({ open }) => {
   return (
      <div>
         <Backdrop
            sx={{ color: 'rgb(90, 57, 161)', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
         >
            <CircularProgress color="inherit" />
         </Backdrop>
      </div>
   );
}

export default TransparentProgress;
