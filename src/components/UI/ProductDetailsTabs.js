import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
// import ProductCardTabData from './ProductCardTabData';

function TabPanel(props) {
   const { children, value, index, ...other } = props;

   return (
      <div
         role="tabpanel"
         hidden={value !== index}
         id={`simple-tabpanel-${index}`}
         aria-labelledby={`simple-tab-${index}`}
         {...other}
      >
         {value === index && (
            <Box sx={{ p: 3 }}>
               <Typography>{children}</Typography>
            </Box>
         )}
      </div>
   );
}

TabPanel.propTypes = {
   children: PropTypes.node,
   index: PropTypes.number.isRequired,
   value: PropTypes.number.isRequired,
};

function a11yProps(index) {
   return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
   };
}

export default function ProductDetailsTabs() {
   const [value, setValue] = React.useState(0);

   const handleChange = (event, newValue) => {
      setValue(newValue);
   };

   return (
      <Box sx={{ width: '100%' }}>
         <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
               <Tab label="Item One" {...a11yProps(0)} />
               <Tab label="Item Two" {...a11yProps(1)} />
            </Tabs>
         </Box>
         <TabPanel value={value} index={0} >
            <Typography sx={{ fontSize: '15px' }} component={'span'} color='text.secondary'>Specification</Typography>
            <Grid spacing={3} sx={{ marginTop: '24px' }} component='span' container>
               <Grid component='span' item sx={{ width: '40%' }} xs={12} sm={12} md={12} xl={6}>
                  {/* <ProductCardTabData /> */}
               </Grid>
               <Grid component='span' item sx={{ width: '40%' }} xs={12} sm={12} md={12} xl={6}>
                  {/* <ProductCardTabData /> */}
               </Grid>
            </Grid>
         </TabPanel>
         <TabPanel value={value} index={1}>
            <Typography sx={{ fontSize: '15px' }} component={'span'} color='text.secondary'>Product Details</Typography>
            <Grid sx={{ marginTop: '24px' }} component='span' container>
               <Grid component='span' item sx={{ width: '40%' }} xs={12} sm={12} md={6} xl={6}>
                  {/* <ProductCardTabData /> */}
               </Grid>
            </Grid>
         </TabPanel>
      </Box >
   );
}