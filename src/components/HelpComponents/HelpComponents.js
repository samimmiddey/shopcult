import { Box } from '@mui/material';
import React from 'react';
import HelpHeader from './HelpHeader/HelpHeader';
import HelpForm from './HelpForm/HelpForm';
import HelpBody from './HelpBody/HelpBody';
import { useSelector } from 'react-redux';
import ProgressBar from '../UI/ProgressBar';

const HelpComponents = () => {
   const loading = useSelector(state => state.ui.progressBar);

   return (
      <>
         {loading && <ProgressBar />}
         {
            !loading &&
            <Box
               className='container'
               sx={{ paddingTop: '80px' }}
            >
               <HelpHeader />
               <HelpBody />
               <HelpForm />
            </Box>
         }
      </>
   );
};

export default HelpComponents;