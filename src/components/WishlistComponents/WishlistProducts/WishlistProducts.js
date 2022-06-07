import { Box, Button, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ProductCard from '../../UI/ProductCard';
import { useTheme, useMediaQuery } from '@mui/material';
import CustomPagination from '../../UI/CustomPagination';
import { Link } from 'react-router-dom';
import wishlist from '../../../assets/emptywishlist.svg';
import ProgressBar from '../../UI/ProgressBar';

const WishlistProducts = () => {
   const loading = useSelector(state => state.ui.navbarProgress);
   const wishlistItems = useSelector(state => state.wishlist.wishlistItems);
   const products = useSelector(state => state.products.products);
   const wishlistProducts = products.filter(product => wishlistItems.includes(product.id));

   const theme = useTheme();
   const smWidth = useMediaQuery(theme.breakpoints.down('sm'));
   const xlUpWidth = useMediaQuery(theme.breakpoints.up('xl'));

   // Pagination Logic
   const productsPerPage = xlUpWidth ? 8 : 6;
   const [currentPage, setCurrentPage] = useState(1);

   const indexOfLastProduct = currentPage * productsPerPage;
   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
   const currentProducts = wishlistProducts.slice(indexOfFirstProduct, indexOfLastProduct);

   let pageNumbers = 0;

   for (let i = 1; i <= Math.ceil(wishlistProducts.length / productsPerPage); i++) {
      pageNumbers++;
   }

   const paginate = (page) => {
      localStorage.setItem('brandedCurrentPage', page);
      setCurrentPage(page);
   }

   return (
      <Box sx={{ marginTop: '2rem' }}>
         {
            currentProducts.length >= 1 &&
            <>
               <Grid spacing={smWidth ? 1 : 2} container>
                  {currentProducts.map((product, index) => (
                     <Grid key={index} item xs={12} xm={6} sm={6} md={4} lg={3}>
                        <ProductCard
                           product={product}
                           index={index}
                           path={`/home/${product.id}`}
                        />
                     </Grid>
                  ))}
               </Grid>
               <CustomPagination
                  pageNumbers={pageNumbers}
                  paginate={paginate}
                  currPage={currentPage}
               />
            </>
         }
         {currentProducts.length < 1 &&
            <>
               {loading && <ProgressBar />}
               {
                  !loading && <Box
                     sx={{
                        textAlign: 'center',
                        margin: '3rem 0',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                     }}
                  >
                     <Box
                        sx={theme => ({
                           height: '200px',
                           width: '100%',
                           marginBottom: '2.5rem',
                           [theme.breakpoints.down('sm')]: {
                              height: '100px'
                           }
                        })}
                     >
                        <img className='image' src={wishlist} alt="wishlist" />
                     </Box>
                     <Typography
                        mb={2}
                        variant='h6'
                        sx={theme => ({
                           fontWeight: 600,
                           color: 'text.primary',
                           [theme.breakpoints.down('sm')]: {
                              fontSize: '1rem'
                           }
                        })}
                     >
                        Your wishlist is empty!
                     </Typography>
                     <Link
                        to='/shop/all'
                     >
                        <Button sx={{ textTransform: 'none' }} variant='outlined'>Shop Now</Button>
                     </Link>
                  </Box>
               }
            </>
         }
      </Box>
   );
};

export default WishlistProducts;