import { Box } from '@mui/material';
import React from 'react';
import AuthComponents from '../components/AuthComponents/AuthComponents';
import AuthErrorModal from '../components/UI/AuthErrorModal';
import ProgressBar from '../components/UI/ProgressBar';

const Authentication = () => {
   const reloadingProgress = localStorage.getItem('isLoggedIn');

   return (
      <Box>
         <AuthErrorModal />
         {reloadingProgress && <ProgressBar />}
         {!reloadingProgress && <AuthComponents />}
      </Box>
   );
};

export default Authentication;