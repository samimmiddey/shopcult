import { Box } from '@mui/material';
import React from 'react';
import AuthComponents from '../components/AuthComponents/AuthComponents';
import AuthErrorModal from '../components/UI/AuthErrorModal';

const Authentication = () => {
   return (
      <Box>
         <AuthErrorModal />
         <AuthComponents />
      </Box>
   );
};

export default Authentication;