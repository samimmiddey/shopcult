import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { uiActions } from '../../../store/ui-slice';
import { useParams } from 'react-router-dom';
import ProductCard from '../../UI/ProductCard';
import CustomPagination from '../../UI/CustomPagination';
import { useTheme, useMediaQuery } from '@mui/material';
import CustomHeader from '../../UI/CustomHeader';

const BrandedProducts = () => {
   const [currentPage, setCurrentPage] = useState(1);

   const products = useSelector(state => state.products.products);

   const dispatch = useDispatch();
   const { id } = useParams();

   const brandedProducts = products.filter(product => product.name.split(' ')[0].toLowerCase() === id);

   const theme = useTheme();
   const smWidth = useMediaQuery(theme.breakpoints.down('sm'));
   const xlUpWidth = useMediaQuery(theme.breakpoints.up('xl'));


   // Pagination Logic
   const productsPerPage = xlUpWidth ? 8 : 6;
   const indexOfLastProduct = currentPage * productsPerPage;
   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
   const currentProducts = brandedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

   let pageNumbers = 0;
   for (let i = 1; i <= Math.ceil(brandedProducts.length / productsPerPage); i++) {
      pageNumbers++;
   }

   const paginate = (page) => setCurrentPage(page);

   // Resetting the page to 1 when other category is selected
   useEffect(() => {
      paginate(1);
   }, [id]);

   return (
      <Box className='small-container'>
         <CustomHeader
            text={id.charAt(0).toUpperCase() + id.slice(1)}
            filter={false}
            selectMenu={false}
         />
         <Grid spacing={smWidth ? 1 : 2} container>
            {currentProducts.map((product, index) => (
               <Grid
                  sx={{
                     transition: "transform 0.15s ease-in-out",
                     "&:hover": {
                        transform: "scale3d(1.03, 1.03, 1)"
                     }
                  }}
                  key={index}
                  item xs={12} xm={6} sm={6} md={4} lg={3}
                  onClick={() => {
                     dispatch(uiActions.setBrandWise(product.name.toLowerCase().split(' ')[0]));
                     localStorage.setItem('brandWise', product.name.toLowerCase().split(' ')[0]);
                  }}
               >
                  <ProductCard
                     product={product}
                     index={index}
                     path={`/brands/${product.name.toLowerCase().split(' ')[0]}/${product.id}`}
                  />
               </Grid>
            ))}
         </Grid>
         <CustomPagination
            pageNumbers={pageNumbers}
            paginate={paginate}
            currentPage={currentPage}
         />
      </Box>
   );
};

export default BrandedProducts;