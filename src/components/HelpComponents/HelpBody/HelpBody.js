import { Box } from '@mui/material';
import React from 'react';
import { Grid } from '@mui/material';
import HelpDetails from '../../UI/HelpDetails';
import HelpData from '../../../data/HelpData';
import GoogleMapComponent from '../../UI/GoogleMapComponent';

const HelpBody = () => {
   return (
      <Box
         className='gradient-background'
         sx={theme => ({
            borderRadius: '30px',
            [theme.breakpoints.down('lg')]: {
               borderRadius: '20px'
            },
            [theme.breakpoints.down('sm')]: {
               borderRadius: '10px'
            }
         })}
      >
         <Grid
            container
            sx={{
               margin: 'auto',
            }}
         >
            <Grid item xs={12} md={6}>
               <Box
                  sx={theme => ({
                     display: 'flex',
                     flexDirection: 'column',
                     rowGap: '4rem',
                     padding: '8rem',
                     [theme.breakpoints.down('xl')]: {
                        rowGap: '3rem',
                        padding: '6rem 4rem'
                     },
                     [theme.breakpoints.down('lg')]: {
                        rowGap: '2.5rem',
                        padding: '5rem 3rem'
                     },
                     [theme.breakpoints.down('md')]: {
                        padding: '4rem 2rem'
                     },
                     [theme.breakpoints.down('sm')]: {
                        padding: '3.5rem 1rem'
                     }
                  })}
               >
                  {HelpData.map((data, index) => (
                     <HelpDetails
                        key={index}
                        img={data.img}
                        title={data.title}
                        subtitle={data.subtitle}
                        subtext={data.subtext}
                     />
                  ))}
               </Box>
            </Grid>
            <Grid
               sx={theme => ({
                  borderRadius: '0 30px 30px 0',
                  [theme.breakpoints.down('lg')]: {
                     borderRadius: '0 20px 20px 0'
                  },
                  [theme.breakpoints.down('md')]: {
                     borderRadius: '0 0 20px 20px',
                     height: '500px'
                  },
                  [theme.breakpoints.down('sm')]: {
                     borderRadius: '0 0 10px 10px',
                     height: '400px'
                  }
               })}
               item xs={12} md={6}
            >
               <GoogleMapComponent />
            </Grid>
         </Grid >
      </Box>
   );
};

export default HelpBody;