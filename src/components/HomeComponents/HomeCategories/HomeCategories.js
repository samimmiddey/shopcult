import React, { useState } from 'react';
import { Box } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/system';
import { useMediaQuery } from '@mui/material';
import CustomHeaderText from '../../UI/CustomHeaderText';
import CategoryTab from './CategoryTab/CategoryTab';

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

const StyledTab = styled((props) => <Tab {...props} />)(
   ({ theme }) => ({
      textTransform: 'none',
      margin: '0 0.5rem',
      '&.Mui-selected': {
         color: 'rgb(132, 76, 196)',
      },
      [theme.breakpoints.down('sm')]: {
         margin: '0'
      }
   })
);

const HomeCategories = () => {
   const homeCategory = parseInt(localStorage.getItem('homeCategory'));
   const [value, setValue] = useState(homeCategory ? homeCategory : 0);

   const theme = useTheme();
   const smallWidth = useMediaQuery(theme.breakpoints.down(435));

   const handleChange = (event, newValue) => {
      setValue(newValue);
      localStorage.setItem('homeCategory', newValue);
   };

   const tabValues = ['Shoes', 'Watches', 'Sunglasses', 'Headphones'];

   return (
      <Box>
         <Box sx={{ textAlign: 'center' }}>
            <CustomHeaderText text='Shop by Categories' />
         </Box>
         <Box
            sx={theme => ({
               marginTop: '1rem',
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
                  tabValues.map((label, index) => (
                     <StyledTab
                        key={index}
                        sx={{
                           color: 'text.secondary',
                           fontSize: '15px',
                           fontWeight: 600
                        }}
                        label={label}
                     />
                  ))
               }
            </StyledTabs>
         </Box>
         <CategoryTab value={tabValues[value]} />
      </Box >
   );
};

export default HomeCategories;