import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { styled } from '@mui/material/styles';
import Shoes from './Shoes/Shoes';
import Headphones from './Headphones/Headphones';
import Sunglasses from './Sunglasses/Sunglasses';
import Watches from './Watches/Watches';
import { useTheme } from '@mui/system';
import { useMediaQuery } from '@mui/material';

// const tabs = [<Shoes />, <Watches />, <Sunglasses />, <Headphones />];

const StyledTabs = styled((props) => (
   <Tabs
      {...props}
      TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
   />
))({
   '& .MuiTabs-indicator': {
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'transparent',
   },
   '& .MuiTabs-indicatorSpan': {
      maxWidth: '40%',
      width: '100%',
      backgroundColor: 'rgb(90, 57, 161)'
   },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
   ({ theme }) => ({
      textTransform: 'none',
      fontSize: '16px',
      fontWeight: 600,
      margin: '0 1.5rem',
      '&.Mui-selected': {
         color: 'rgb(132, 76, 196)',
      },
      [theme.breakpoints.down('md')]: {
         margin: '0 1rem',
         fontSize: '15px'
      },
      [theme.breakpoints.down('sm')]: {
         margin: '0',
         fontSize: '14px'
      }
   }),
);

const HomeCategories = ({ headphones, shoes, sunglasses, watches }) => {
   const tabs = [
      <Shoes shoes={shoes} />,
      <Watches watches={watches} />,
      <Sunglasses sunglasses={sunglasses} />,
      <Headphones headphones={headphones} />
   ];
   const homeCategory = parseInt(localStorage.getItem('homeCategory'));
   const [value, setValue] = useState(homeCategory ? homeCategory : 0);
   const theme = useTheme();
   const smallWidth = useMediaQuery(theme.breakpoints.down(435));

   const handleChange = (event, newValue) => {
      setValue(newValue);
      localStorage.setItem('homeCategory', newValue);
   };

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
         <Box sx={{ textAlign: 'center' }}>
            <Typography variant='h4'
               sx={theme => ({
                  fontWeight: 700,
                  [theme.breakpoints.down('lg')]: {
                     fontSize: '2rem'
                  },
                  [theme.breakpoints.down('md')]: {
                     fontSize: '1.5rem'
                  },
                  [theme.breakpoints.down('sm')]: {
                     fontSize: '1.3rem'
                  },
                  [theme.breakpoints.down(400)]: {
                     fontSize: '1.2rem'
                  }
               })}>
               <span style={{ color: 'rgb(132, 76, 196)' }}>Shop By</span> <span style={{ color: 'rgb(90, 57, 161)' }}>Categories</span>
            </Typography>
         </Box>
         <Box
            sx={theme => ({
               marginTop: '2rem',
               [theme.breakpoints.down('md')]: {
                  marginTop: '1rem'
               },
               [theme.breakpoints.down('sm')]: {
                  marginTop: '0.6rem'
               }
            })}>
            <StyledTabs
               centered={smallWidth ? false : true}
               value={value}
               onChange={handleChange}
               variant={smallWidth ? 'scrollable' : 'standard'}
               scrollButtons={smallWidth ? true : false}
               allowScrollButtonsMobile={smallWidth ? true : false}
            >
               <StyledTab sx={{ color: 'text.secondary' }} label="Shoes" />
               <StyledTab sx={{ color: 'text.secondary' }} label="Watches" />
               <StyledTab sx={{ color: 'text.secondary' }} label="Sunglasses" />
               <StyledTab sx={{ color: 'text.secondary' }} label="Headphones" />
            </StyledTabs>
         </Box>
         <Box
            sx={theme => ({
               marginTop: '2.5rem',
               [theme.breakpoints.down('md')]: {
                  marginTop: '1.5rem'
               },
               [theme.breakpoints.down('sm')]: {
                  marginTop: '1.25rem'
               }
            })}>
            {tabs[value]}
         </Box>
      </Box >
   );
};

export default HomeCategories;