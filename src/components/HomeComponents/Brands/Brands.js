import React from 'react';
import { Box, Typography } from '@mui/material';
import BrandsData from '../../../data/BrandsData';
import { useTheme, useMediaQuery } from '@mui/material';

const Brands = () => {
   const theme = useTheme();
   const mdWidth = useMediaQuery(theme.breakpoints.down('md'));

   return (
      <Box
         sx={{
            display: 'flex',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
            padding: '0 1rem',
            columnGap: '2rem',
            rowGap: '2rem'
         }}
      >
         {BrandsData.map((data, index) => (
            <Box
               className='brand'
               key={index}
               sx={{
                  display: 'flex',
                  alignItems: 'center',
                  columnGap: '10px'
               }}
            >
               <img className={mdWidth ? 'brand-img-small' : 'brand-img'} src={data.img} alt="" />
               <Typography
                  variant='h6'
                  color='text.primary'
                  sx={theme => ({
                     fontSize: '1.9rem',
                     fontWeight: 700,
                     [theme.breakpoints.down('md')]: {
                        fontSize: '1.5rem'
                     }
                  })}
               >{data.title}</Typography>
            </Box>
         ))}
      </Box>
   );
};

export default Brands;