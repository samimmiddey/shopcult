import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import ProductCardTabData from './ProductCardTabsData';

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

// Capitalize First Letter
const capitalizeFirstLetter = (name) => name.charAt(0).toUpperCase() + name.slice(1);

const ProductCardTabs = ({ product }) => {
   const [value, setValue] = React.useState(0);

   const handleChange = (event, newValue) => {
      setValue(newValue);
   };

   const details = [
      {
         title: 'Product Name',
         data: product.name
      },
      {
         title: 'Product ID',
         data: product.id
      },
      {
         title: 'Active Status',
         data: capitalizeFirstLetter(`${product.active}`)
      },
      {
         title: 'Stock Available',
         data: product.inventory.available + ' items'
      },
      {
         title: 'Sold Out',
         data: capitalizeFirstLetter(`${product.is.sold_out}`)
      },
      {
         title: 'Physical Delivery',
         data: capitalizeFirstLetter(`${product.has.physical_delivery}`)
      },
      {
         title: 'Categories',
         data: product.categories.map(category => category.name + ' ')
      },
      {
         title: 'Has Thumbnail',
         data: capitalizeFirstLetter(`${product.image.is_image}`)
      },
      {
         title: 'Price',
         data: product.price.formatted_with_code
      }
   ];

   return (
      <Box sx={{ width: '100%', padding: '0 1rem' }}>
         <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
               <Tab sx={{ textTransform: 'none' }} label="Specification" {...a11yProps(0)} />
               <Tab sx={{ textTransform: 'none' }} label="Description" {...a11yProps(1)} />
            </Tabs>
         </Box>
         <TabPanel value={value} index={0} >
            <Grid spacing={2} sx={{ marginTop: '0px' }} component='span' container>
               <Grid component='span' item sx={{ width: '40%' }} xs={12} sm={12} md={12} xl={6}>
                  <ProductCardTabData
                     details={details}
                  />
               </Grid>
               <Grid component='span' item sx={{ width: '40%' }} xs={12} sm={12} md={12} xl={6}>
                  <ProductCardTabData
                     details={details}
                  />
               </Grid>
            </Grid>
         </TabPanel>
         <TabPanel value={value} index={1}>
            <Grid sx={{ marginTop: '16px' }} component='span' container>
               <Grid component='span' item sx={{ width: '40%' }} xs={12} sm={12} md={6} xl={6}>
                  <span style={{ fontSize: '14px' }}>
                     {product.description.replace(/[<p></p>]/g, '')}
                  </span>
               </Grid>
            </Grid>
         </TabPanel>
      </Box >
   );
}

export default ProductCardTabs;