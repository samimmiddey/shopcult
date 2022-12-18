import React from 'react';
import { Box } from '@mui/material';
import HelpForm from './HelpForm/HelpForm';
import HelpBody from './HelpBody/HelpBody';
import StylishHeader from '../UI/StylishHeader';

const HelpComponents = () => {
   return (
      <Box
         className='small-container'
         sx={{ paddingTop: '80px' }}
      >
         <StylishHeader
            text='GET IN TOUCH WITH US'
            subtext='We Are Setting a New Standard For Customer Care Service.'
         />
         <HelpBody />
         <HelpForm />
      </Box>
   );
};

export default HelpComponents;