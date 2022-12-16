import { Box } from '@mui/material';
import React from 'react';
import HelpHeader from './HelpHeader/HelpHeader';
import HelpForm from './HelpForm/HelpForm';
import HelpBody from './HelpBody/HelpBody';

const HelpComponents = () => {
   return (
      <Box
         className='container'
         sx={{ paddingTop: '80px' }}
      >
         <HelpHeader />
         <HelpBody />
         <HelpForm />
      </Box>
   );
};

export default HelpComponents;