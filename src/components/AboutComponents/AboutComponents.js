import React from 'react';
import AboutHero from './AboutHero/AboutHero';
import AboutPoints from './AboutPoints/AboutPoints';
import AboutFeatured from './AboutFeatured.js/AboutFeatured';
import { Box } from '@mui/material';
import CustomForm from '../UI/CustomForm';

const AboutComponents = () => {
   return (
      <Box className='small-container' style={{ paddingTop: '80px' }}>
         <AboutHero />
         <AboutPoints />
         <CustomForm
            list={['Name', 'Email', 'Phone', 'Query']}
            title='Have Any Queries? Contact Us'
         />
         <AboutFeatured />
      </Box>
   );
};

export default AboutComponents;