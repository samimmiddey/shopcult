import React from 'react';
import { Box } from '@mui/system';
import HomeInfoCard from '../../UI/HomeInfoCard';
import { Grid } from '@mui/material';
import HomeInfoCardData from '../../../data/HomeInfoCardData';
import CustomHeaderText from '../../UI/CustomHeaderText';

const HomeInformation = () => {
   return (
      <Box className='section-margin'>
         <CustomHeaderText text='Services To Help You Shop' />
         <Grid
            sx={{ marginTop: '1rem' }}
            spacing={2}
            container
         >
            {HomeInfoCardData.map((data, index) => (
               <Grid key={index} item xs={12} sm={6} md={6} lg={4} xl={3} >
                  <HomeInfoCard
                     data={data}
                  />
               </Grid>
            ))}
         </Grid>
      </Box>
   );
};

export default HomeInformation;