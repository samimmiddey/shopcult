import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const EmptyTemplate = ({ img, text, button, subtext }) => {
   return (
      <Box
         sx={{
            textAlign: 'center',
            margin: '3rem 0',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
         }}
      >
         <Box
            sx={theme => ({
               height: '200px',
               width: '100%',
               marginBottom: '2.5rem',
               [theme.breakpoints.down('lg')]: {
                  height: '175px'
               },
               [theme.breakpoints.down('sm')]: {
                  height: '150px'
               },
               [theme.breakpoints.down(350)]: {
                  height: '125px'
               }
            })}
         >
            <img className='image' src={img} alt="search" />
         </Box>
         <Typography
            mb={!subtext && 2}
            variant='h6'
            sx={theme => ({
               fontWeight: 600,
               color: 'text.primary',
               [theme.breakpoints.down('sm')]: {
                  fontSize: '1rem'
               }
            })}
         >
            {text}
         </Typography>
         {subtext}
         {
            button &&
            <Link to='/shop/all'>
               <Button
                  sx={{ textTransform: 'none' }}
                  variant='outlined'
               >
                  Shop Now
               </Button>
            </Link>
         }
      </Box>
   );
};

export default EmptyTemplate;