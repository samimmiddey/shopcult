import { Box, Grid } from '@mui/material';
import React from 'react';
import ProductCard from '../../UI/ProductCard';
import { useSelector, useDispatch } from 'react-redux';
import { uiActions } from '../../../store/ui-slice';
import { useTheme, useMediaQuery } from '@mui/material';

const ShopProducts = ({ shopProducts }) => {
   const category = useSelector(state => state.ui.categoryWise);
   const selectedItems = useSelector(state => state.ui.selectedItems);
   const dispatch = useDispatch();

   const theme = useTheme();
   const smWidth = useMediaQuery(theme.breakpoints.down('sm'));

   return (
      <Box>
         <Grid spacing={smWidth ? 1 : 2} container>
            {shopProducts.map((product, index) => (
               <Grid
                  onClick={() => {
                     dispatch(uiActions.setBrandWise(product.name.toLowerCase().split(' ')[0]));
                     localStorage.setItem('brandWise', product.name.toLowerCase().split(' ')[0]);
                  }}
                  sx={{
                     transition: "transform 0.15s ease-in-out",
                     "&:hover": {
                        transform: "scale3d(1.03, 1.03, 1)"
                     }
                  }}
                  key={index}
                  item xs={12} xm={6} sm={6} md={6} lg={4} xl={3}>
                  <ProductCard
                     product={product}
                     index={index}
                     path={
                        selectedItems.length ?
                           `/shop/${product.name.toLowerCase().split(' ')[0]}/${product.id}` :
                           `/shop/${category.toLowerCase()}/${product.id}`
                     }
                  />
               </Grid>
            ))}
         </Grid>
      </Box>
   );
};

export default ShopProducts;