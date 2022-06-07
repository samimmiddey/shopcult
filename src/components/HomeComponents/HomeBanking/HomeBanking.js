import { Box } from '@mui/material';
import React from 'react';
import HomeBankingData from '../../../data/HomeBankingData';

const HomeBanking = () => {
   return (
      <Box
         sx={theme => ({
            marginTop: '8rem',
            [theme.breakpoints.down('xl')]: {
               marginTop: '6rem'
            },
            [theme.breakpoints.down('lg')]: {
               marginTop: '5rem'
            },
            [theme.breakpoints.down('md')]: {
               marginTop: '4rem'
            },
            [theme.breakpoints.down('sm')]: {
               marginTop: '3.5rem'
            }
         })}
      >
         <Box
            sx={theme => ({
               display: 'flex',
               alignItems: 'center',
               flexWrap: 'wrap',
               justifyContent: 'center',
               [theme.breakpoints.down('lg')]: {

               }
            })}
         >
            {HomeBankingData.map((card, index) => (
               <Box
                  sx={theme => ({
                     display: 'inline-block',
                     width: '200px',
                     [theme.breakpoints.down('xl')]: {
                        width: '100px'
                     }
                  })}
                  key={index}>
                  <img className='banking-card' src={card} alt="" />
               </Box>
            ))}
         </Box>
      </Box>
   );
};

export default HomeBanking;