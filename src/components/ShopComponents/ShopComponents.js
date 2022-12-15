import React, { useEffect, useState } from 'react';
import ShopHeader from './ShopHeader/ShopHeader';
import ShopProducts from './ShopProducts/ShopProducts';
import ShopFilter from './ShopFilter/ShopFilter';
import { Box, Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import FilterBottomModal from '../UI/FilterBottomModal';
import { useTheme, useMediaQuery } from '@mui/material';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import CustomPagination from '../UI/CustomPagination';
import ProgressBar from '../UI/ProgressBar';
import search from '../../assets/search.svg';

const ShopComponents = () => {
   const theme = useTheme();
   const smWidth = useMediaQuery(theme.breakpoints.down('sm'));
   const mdWidth = useMediaQuery(theme.breakpoints.down('md'));
   const xlUpWidth = useMediaQuery(theme.breakpoints.up('xl'));

   const productsPerPage = xlUpWidth ? 8 : 6;

   const currPage = localStorage.getItem('currentPage');
   if (!currPage) {
      localStorage.setItem('currentPage', 1);
   }
   const [currentPage, setCurrentPage] = useState(currPage ? parseInt(currPage) : 1);

   const loading = useSelector(state => state.ui.navbarProgress);
   const showFilter = useSelector(state => state.ui.showFilter);
   const products = useSelector(state => state.products.products);
   const sortProducts = useSelector(state => state.ui.sortProducts);
   const selectedItems = useSelector(state => state.ui.selectedItems);
   const searchedProducts = useSelector(state => state.ui.searchedProducts);
   const allCategories = useSelector(state => state.products.categories);
   const [isLoading, setIsLoading] = useState(true);

   const history = useHistory();

   const { pathname } = useLocation();

   const { id } = useParams();
   const category = id.charAt(0).toUpperCase() + id.slice(1);

   const categoryWiseProducts = products.filter(product => {
      return product.categories.some(cat => cat.name === category) === true;
   });

   const selectedProducts = products.filter(product => {
      return selectedItems.some(item => item === product.name) === true;
   });

   const LowToHighProducts = category !== 'All' && selectedProducts.length < 1 ?
      [...categoryWiseProducts].sort((a, b) => a.price.raw - b.price.raw) :
      selectedProducts.length >= 1 ?
         [...selectedProducts].sort((a, b) => a.price.raw - b.price.raw) :
         [...products].sort((a, b) => a.price.raw - b.price.raw);

   const HighToLowProducts = category !== 'All' && selectedProducts.length < 1 ?
      [...categoryWiseProducts].sort((a, b) => b.price.raw - a.price.raw) :
      selectedProducts.length >= 1 ?
         [...selectedProducts].sort((a, b) => b.price.raw - a.price.raw) :
         [...products].sort((a, b) => b.price.raw - a.price.raw);

   let shopProducts = [];

   switch (sortProducts) {
      case 'Low-High':
         shopProducts = LowToHighProducts;
         break;
      case 'High-Low':
         shopProducts = HighToLowProducts;
         break;
      default:
         shopProducts = category !== 'All' && selectedProducts.length < 1 && !pathname.startsWith('/search') ?
            categoryWiseProducts : selectedProducts.length >= 1 && !pathname.startsWith('/search') ?
               selectedProducts : searchedProducts.length >= 1 && pathname.startsWith('/search') ?
                  searchedProducts : products;
   }

   // Pagination Logic
   const indexOfLastProduct = currentPage * productsPerPage;
   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
   const currentProducts = shopProducts.slice(indexOfFirstProduct, indexOfLastProduct);

   let pageNumbers = 0;

   for (let i = 1; i <= Math.ceil(shopProducts.length / productsPerPage); i++) {
      pageNumbers++;
   }

   const paginate = (page) => {
      localStorage.setItem('currentPage', page);
      setCurrentPage(page);
   }

   // Resetting the page to 1 when other category is selected
   const pagCurrPage = localStorage.getItem('currentPage');
   useEffect(() => {
      if (pageNumbers === 0) {
         return;
      }

      if (parseInt(pagCurrPage) === 1) {
         paginate(parseInt(pagCurrPage));
      }
   }, [pageNumbers, pagCurrPage]);

   // Set the loading state false
   useEffect(() => {
      if (products.length) {
         setIsLoading(false);
      }
   }, [products]);

   // Redirect if category is invalid
   useEffect(() => {
      const categoriesArray = allCategories.map(item => item.slug);
      if (pathname.startsWith('/shop') && !['all', ...categoriesArray].includes(id)) {
         history.replace('/');
      }
   }, [allCategories, history, id, pathname]);

   // Checking if searched products is empty
   if (pathname.startsWith('/search') && searchedProducts.length < 1) {
      return (
         <>
            {loading && <ProgressBar />}
            {
               !loading &&
               <Box
                  sx={theme => ({
                     textAlign: 'center',
                     marginTop: '15rem',
                     display: 'flex',
                     flexDirection: 'column',
                     alignItems: 'center',
                     [theme.breakpoints.down('xl')]: {
                        marginTop: '14rem'
                     },
                     [theme.breakpoints.down('lg')]: {
                        marginTop: '13rem'
                     },
                     [theme.breakpoints.down('md')]: {
                        marginTop: '12rem'
                     },
                     [theme.breakpoints.down('sm')]: {
                        marginTop: '11rem'
                     },
                  })}
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
                     <img className='image' src={search} alt="search" />
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
                     Type a keyword to search products!
                  </Typography>
               </Box>
            }
         </>
      );
   }

   return (
      <>
         {isLoading && <ProgressBar />}
         {!isLoading && <div
            className='container'
            style={{ padding: smWidth ? '80px 16px 0 16px' : '80px 32px 0 32px' }}
         >
            <ShopHeader />
            {mdWidth && <FilterBottomModal />}
            <Grid mt={3} spacing={1} container>
               {!mdWidth && (
                  <Grid
                     className='shop-filter'
                     sx={showFilter ? { height: '98.5vh', overflow: 'auto', paddingRight: '8px' } : {}}
                     item md={3} lg={2.5} xl={2}
                  >
                     <ShopFilter />
                  </Grid>
               )}
               <Grid item xs={12} sm={12} md={showFilter ? 9 : 12} lg={showFilter ? 9.5 : 12} xl={showFilter ? 10 : 12}>
                  <ShopProducts shopProducts={currentProducts} />
                  <CustomPagination
                     pageNumbers={pageNumbers}
                     paginate={paginate}
                     currPage={pagCurrPage}
                  />
               </Grid>
            </Grid>
         </div>}
      </>
   );
};

export default ShopComponents;