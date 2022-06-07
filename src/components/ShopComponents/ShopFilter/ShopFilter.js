import { Box, ListItemButton, Typography, IconButton } from '@mui/material';
import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FilterAccordion from '../../UI/FilterAccordion';
import { uiActions } from '../../../store/ui-slice';
import { NavLink, useParams } from 'react-router-dom';
import { useTheme, useMediaQuery } from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
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

   // Setting Category on Local Storage
   const { id } = useParams();
   localStorage.setItem('category', id);

   useEffect(() => {
      dispatch(uiActions.setCategoryWise(id));
   }, [id, dispatch]);

   const theme = useTheme();
   const mdWidth = useMediaQuery(theme.breakpoints.down('md'));

   if (products.length < 1 || categories.length < 1) {
      return null;
   }

   const newCategories = categories.map(category => category.name);
   newCategories.unshift('All');

   const filter = (
      <Box sx={{
         marginTop: '-1rem'
      }}>
         {/* Categories */}
         <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <Typography
                  variant='h6'
                  color='text.disabled'
                  sx={{
                     fontWeight: 700
                  }}
               >
                  Categories
               </Typography>
               {mdWidth &&
                  <IconButton
                     size='small'
                     onClick={() => dispatch(uiActions.toggleModalFilter())}
                  >
                     <CloseOutlinedIcon sx={{ color: 'text.secondary', cursor: 'pointer' }} />
                  </IconButton>
               }
            </Box>
            <Box
               sx={{
                  marginTop: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  rowGap: '5px'
               }}
            >
               {newCategories.map((category, index) => (
                  <Fragment key={index}>
                     <NavLink activeClassName='active-category' to={`/shop/${category.toLowerCase()}`}>
                        <ListItemButton
                           onClick={() => {
                              dispatch(uiActions.resetSelectedItems());
                              localStorage.setItem('currentPage', 1);
                           }}
                           sx={{
                              fontWeight: 500,
                              borderRadius: '5px',
                              '&:hover': {
                                 backgroundColor: 'rgb(236, 228, 255)'
                              }
                           }}
                        >
                           {category}
                        </ListItemButton>
                     </NavLink>
                  </Fragment>
               ))}
            </Box>
         </Box>
         {/* Brands */}
         <Box sx={{
            flex: 5,
            marginTop: '1rem'
         }}>
            <Typography
               variant='h6'
               color='text.disabled'
               sx={{
                  fontWeight: 700
               }}
            >
               Brands
            </Typography>
            <Box sx={{
               marginTop: '1rem'
            }}>
               {Brands.map((brand, index) => (
                  <Box key={index}
                     sx={theme => ({
                        [theme.breakpoints.down('md')]: {
                           width: '100%'
                        }
                     })}>
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