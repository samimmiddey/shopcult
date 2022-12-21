import React from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import HelpBody from './HelpBody/HelpBody';
import StylishHeader from '../UI/StylishHeader';
import CustomForm from '../UI/CustomForm';

const HelpComponents = () => {
   const theme = useTheme();
   const width = useMediaQuery(theme.breakpoints.down(1050));

   const subtext = <>We Are Setting a New Standard For{width ? ' ' : <br />}Customer Care Service.</>;

   return (
      <Box
         className='small-container'
         sx={{ paddingTop: '80px' }}
      >
         <StylishHeader
            text='GET IN TOUCH WITH US'
            subtext={subtext}
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