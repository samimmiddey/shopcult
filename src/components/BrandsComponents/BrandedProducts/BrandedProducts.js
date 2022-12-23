import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProductCard from '../../UI/ProductCard';
import CustomPagination from '../../UI/CustomPagination';
import { useTheme, useMediaQuery } from '@mui/material';
import CustomHeader from '../../UI/CustomHeader';
import { getBranedProducts } from '../../../store/product-thunks';
import BodySpinner from '../../UI/BodySpinner';
import EmptyTemplate from '../../UI/EmptyTemplate';
import brand from '../../../assets/brand.svg';
import Footer from '../../Footer/Footer';
import { productActions } from '../../../store/product-slice';
import ErrorCard from '../../UI/ErrorCard';

const BrandedProducts = () => {
   const [currentPage, setCurrentPage] = useState(1);

   const progress = useSelector(state => state.products.progress);
   const products = useSelector(state => state.products.brandedProducts);
   const brandedProductsURL = useSelector(state => state.products.brandedProductsURL);
   const error = useSelector(state => state.ui.brandedProductsError);
   const errorText = useSelector(state => state.ui.brandedProductsErrorText);

   const dispatch = useDispatch();
   const { id } = useParams();

   const theme = useTheme();
   const xlUpWidth = useMediaQuery(theme.breakpoints.up('xl'));


   // Pagination Logic
   const productsPerPage = xlUpWidth ? 8 : 6;
   const indexOfLastProduct = currentPage * productsPerPage;
   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
   const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

   let pageNumbers = 0;
   for (let i = 1; i <= Math.ceil(products.length / productsPerPage); i++) {
      pageNumbers++;
   }

   const paginate = (page) => setCurrentPage(page);

   // Resetting the page to 1 when other category is selected
   useEffect(() => {
      paginate(1);
   }, [id]);

   // Get braned products
   useEffect(() => {
      if (brandedProductsURL !== id) {
         dispatch(getBranedProducts(id));
         dispatch(productActions.setBrandedProductsURL(id));
      }
   }, [dispatch, id, brandedProductsURL]);

   // Loading state
   if (progress) {
      return <BodySpinner open={progress} />
   };

   // Error state
   if (error) {
      return (
         <>
            <ErrorCard errorText={errorText} />
            <Footer />
         </>
      );
   }

   return (
      <>
         <Box className='small-container'>
            <CustomHeader
               text={id.charAt(0).toUpperCase() + id.slice(1)}
               filter={false}
               selectMenu={false}
            />
            {
               products.length >= 1 &&
               <Grid spacing={2} container>
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
                     >
                        <ProductCard
                           product={product}
                           path={`/brands/${product.name.toLowerCase().split(' ')[0]}/${product.id}`}
                        />
                     </Grid>
                  ))}
               </Grid>
            }
            {
               products.length >= 1 &&
               <CustomPagination
                  pageNumbers={pageNumbers}
                  paginate={paginate}
                  currentPage={currentPage}
               />
            }
            {
               products.length < 1 &&
               <EmptyTemplate
                  img={brand}
                  text='No product found!'
               />
            }
         </Box>
         <Footer />
      </>
   );
};

export default BrandedProducts;