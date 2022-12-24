import React, { Fragment, useEffect } from 'react';
import { Box, ListItemButton, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import FilterAccordion from './FilterAccordion';
import { uiActions } from '../../../store/ui-slice';
import { Link, useParams } from 'react-router-dom';
import { Brands } from '../../../data/BrandsData';

const filteredProducts = (brand, products) => {
   const branedProducts = products.filter((product) => {
      return brand === product.name.split(' ')[0];
   });

   return branedProducts;
}

const ShopFilter = () => {
   const categories = useSelector(state => state.products.categories);
   const products = useSelector(state => state.products.products);
   const showFilter = useSelector(state => state.ui.showFilter);
   const dispatch = useDispatch();

   const categoryArray = categories.map(item => item.slug);
   categoryArray.unshift('all');

   const { id } = useParams();

   useEffect(() => {
      dispatch(uiActions.setCategoryWise(id));
   }, [id, dispatch]);

   if (products.length < 1 || categories.length < 1) {
      return null;
   }

   const filter = (
      <Box sx={{ marginTop: '-1rem' }}>
         {/* Categories */}
         <Box sx={{ flex: 1 }}>
            <Typography
               variant='h6'
               color='text.secondary'
               sx={{
                  fontWeight: 600
               }}
            >
               Categories
            </Typography>
            <Box
               sx={{
                  marginTop: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  rowGap: '5px'
               }}
            >
               {categoryArray.map((category, index) => (
                  <Fragment key={index}>
                     <Link to={`/shop/${category.toLowerCase()}`}>
                        <ListItemButton
                           onClick={() => {
                              dispatch(uiActions.resetSelectedItems());
                           }}
                           sx={{
                              fontWeight: 600,
                              borderRadius: '5px',
                              color: category === id ? 'secondary.main' : 'text.primary',
                              backgroundColor: category === id ? '#5a39a125' : '',
                              '&:hover': {
                                 backgroundColor: category === id ? '#5a39a125' : '',
                              }
                           }}
                        >
                           {category.charAt(0).toUpperCase() + category.slice(1)}
                        </ListItemButton>
                     </Link>
                  </Fragment>
               ))}
            </Box>
         </Box>
         {/* Brands */}
         <Box
            sx={{
               flex: 5,
               marginTop: '1rem'
            }}
         >
            <Typography
               variant='h6'
               color='text.secondary'
               sx={{
                  fontWeight: 600
               }}
            >
               Brands
            </Typography>
            <Box sx={{ marginTop: '1rem' }}>
               {Brands.map((brand, index) => (
                  <Box
                     key={index}
                     sx={theme => ({
                        [theme.breakpoints.down('md')]: {
                           width: '100%'
                        }
                     })}
                  >
                     <FilterAccordion
                        title={brand.name}
                        products={filteredProducts(brand.name, products)}
                     />
                  </Box>
               ))}
            </Box>
         </Box>
      </Box >
   );

   return (
      <>
         {showFilter && filter}
      </>
   );
};

export default ShopFilter;