import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { uiActions } from '../../../store/ui-slice';
import { useParams } from 'react-router-dom';
import ProductCard from '../../UI/ProductCard';
import CustomPagination from '../../UI/CustomPagination';
import { useTheme, useMediaQuery } from '@mui/material';
import ProgressBar from '../../UI/ProgressBar';

const BrandedProducts = () => {
   const [isLoading, setIsLoading] = useState(true);
   const products = useSelector(state => state.products.products);
   const dispatch = useDispatch();
   const { id } = useParams();
   const brandedProducts = products.filter(product => product.name.split(' ')[0].toLowerCase() === id);

   const theme = useTheme();
   const smWidth = useMediaQuery(theme.breakpoints.down('sm'));
   const xlUpWidth = useMediaQuery(theme.breakpoints.up('xl'));

   const productsPerPage = xlUpWidth ? 8 : 6;
   const currPage = localStorage.getItem('branedCurrentPage');
   const [currentPage, setCurrentPage] = useState(currPage ? parseInt(currPage) : 1);

   // Pagination Logic
   const indexOfLastProduct = currentPage * productsPerPage;
   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
   const currentProducts = brandedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

   let pageNumbers = 0;

   for (let i = 1; i <= Math.ceil(brandedProducts.length / productsPerPage); i++) {
      pageNumbers++;
   }

   const paginate = (page) => {
      localStorage.setItem('brandedCurrentPage', page);
      setCurrentPage(page);
   }

   // Resetting the page to 1 when other category is selected
   const pagCurrPage = localStorage.getItem('brandedCurrentPage');
   useEffect(() => {
      if (pageNumbers === 0) {
         return;
      }

      if (parseInt(pagCurrPage) === 1) {
         paginate(parseInt(pagCurrPage));
      }
   }, [pageNumbers, pagCurrPage]);

   useEffect(() => {
      if (products.length) {
         setIsLoading(false);
      }
   }, [products]);

   return (
      <>
         {isLoading && <ProgressBar />}
         {!isLoading &&
            <Box
               className='container'
               sx={theme => ({
                  marginTop: '5rem',
                  padding: '80px 32px 0 32px',
                  [theme.breakpoints.down('xl')]: {
                     marginTop: '4rem'
                  },
                  [theme.breakpoints.down('lg')]: {
                     marginTop: '3rem'
                  },
                  [theme.breakpoints.down('md')]: {
                     marginTop: '2rem'
                  },
                  [theme.breakpoints.down('sm')]: {
                     paddingLeft: '16px',
                     paddingRight: '16px'
                  }
               })}
            >
               <Typography
                  variant='h4'
                  sx={theme => ({
                     fontWeight: 700,
                     [theme.breakpoints.down('lg')]: {
                        fontSize: '2rem'
                     },
                     [theme.breakpoints.down('md')]: {
                        fontSize: '1.5rem'
                     },
                     [theme.breakpoints.down('sm')]: {
                        fontSize: '1.3rem'
                     },
                     [theme.breakpoints.down(400)]: {
                        fontSize: '1.2rem'
                     }
                  })}
               >
                  {id.charAt(0).toUpperCase() + id.slice(1)}
               </Typography>
               <Grid spacing={smWidth ? 1 : 2} container sx={{ paddingTop: '2rem' }}>
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
                  currPage={pagCurrPage}
               />
            </Box >
         }
      </>
   );
};

export default BrandedProducts;