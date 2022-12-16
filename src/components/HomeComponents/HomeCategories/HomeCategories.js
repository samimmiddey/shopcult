import React, { useState } from 'react';
import { Box } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { styled } from '@mui/material/styles';
import Shoes from './Shoes/Shoes';
import Headphones from './Headphones/Headphones';
import Sunglasses from './Sunglasses/Sunglasses';
import Watches from './Watches/Watches';
import { useTheme } from '@mui/system';
import { useMediaQuery } from '@mui/material';
import CustomHeaderText from '../../UI/CustomHeaderText';

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
   }
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
   ({ theme }) => ({
      textTransform: 'none',
      margin: '0 1rem',
      '&.Mui-selected': {
         color: 'rgb(132, 76, 196)',
      },
      [theme.breakpoints.down('md')]: {
         margin: '0 0.5rem'
      },
      [theme.breakpoints.down('sm')]: {
         margin: '0'
      }
   })
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
            <CustomHeaderText text='Shop by Categories' />
         </Box>
         <Box
            sx={theme => ({
               marginTop: '1.5rem',
               [theme.breakpoints.down('lg')]: {
                  marginTop: '1.25rem'
               },
               [theme.breakpoints.down('md')]: {
                  marginTop: '1rem'
               },
               [theme.breakpoints.down('sm')]: {
                  marginTop: '0.5rem'
               }
            })}
         >
            <StyledTabs
               centered={smallWidth ? false : true}
               value={value}
               onChange={handleChange}
               variant={smallWidth ? 'scrollable' : 'standard'}
               scrollButtons={smallWidth ? true : false}
               allowScrollButtonsMobile={smallWidth ? true : false}
            >
               {
                  ['Shoes', 'Watches', 'Sunglasses', 'Headphones'].map((label, index) => (
                     <StyledTab
                        key={index}
                        sx={{
                           color: 'text.secondary',
                           fontSize: '15px',
                           fontWeight: 700
                        }}
                        label={label}
                     />
                  ))
               }
            </StyledTabs>
         </Box>
         <Box
            sx={theme => ({
               marginTop: '2rem',
               [theme.breakpoints.down('lg')]: {
                  marginTop: '1.75rem'
               },
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