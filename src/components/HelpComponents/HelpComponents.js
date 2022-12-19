import React from 'react';
import { Box } from '@mui/material';
import HelpBody from './HelpBody/HelpBody';
import StylishHeader from '../UI/StylishHeader';
import CustomForm from '../UI/CustomForm';

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
         <CustomForm
            list={['Name', 'Email', 'Phone', 'Query']}
            title='Contact Us'
            subtitle='Our helpline is available 24 hours a day. Contact us at your own convenience.'
         />
      </Box>
   );
};

export default HelpComponents;