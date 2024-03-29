import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { searchProducts } from '../../store/product-thunks';
import search from '../../assets/search.svg';
import BodySpinner from '../UI/BodySpinner';
import EmptyTemplate from '../UI/EmptyTemplate';
import { Box, Grid, useMediaQuery, useTheme } from '@mui/material';
import ShopProducts from '../ShopComponents/ShopProducts/ShopProducts';
import CustomHeader from '../UI/CustomHeader';
import CustomPagination from '../UI/CustomPagination';
import Footer from '../Footer/Footer';
import { productActions } from '../../store/product-slice';
import ErrorCard from '../UI/ErrorCard';

const SearchComponent = () => {
   const [currentPage, setCurrentPage] = useState(1);

   const searchedProducts = useSelector(state => state.products.searchedProducts);
   const sortProducts = useSelector(state => state.ui.sortProducts);
   const loading = useSelector(state => state.products.searchLoading);
   const searchKey = useSelector(state => state.products.searchKey);
   const error = useSelector(state => state.ui.searchError);
   const errorText = useSelector(state => state.ui.searchErrorText);

   const theme = useTheme();
   const xlUpWidth = useMediaQuery(theme.breakpoints.up('xl'));

   const dispatch = useDispatch();
   const { id } = useParams();

   const LowToHighProducts = [...searchedProducts].sort((a, b) => a.price.raw - b.price.raw);
   const HighToLowProducts = [...searchedProducts].sort((a, b) => b.price.raw - a.price.raw);

   let shopProducts = [];

   switch (sortProducts) {
      case 'Low-High':
         shopProducts = LowToHighProducts;
         break;
      case 'High-Low':
         shopProducts = HighToLowProducts;
         break;
      default:
         shopProducts = searchedProducts;
   };


   // Pagination Logic
   const productsPerPage = xlUpWidth ? 8 : 6;
   const indexOfLastProduct = currentPage * productsPerPage;
   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
   const currentProducts = shopProducts.slice(indexOfFirstProduct, indexOfLastProduct);

   let pageNumbers = 0;
   for (let i = 1; i <= Math.ceil(shopProducts.length / productsPerPage); i++) {
      pageNumbers++;
   };

   const paginate = (page) => setCurrentPage(page);

   useEffect(() => {
      if (searchKey !== id) {
         dispatch(searchProducts(id));
         dispatch(productActions.setSearchKey(id));
      }
   }, [dispatch, id, searchKey]);

   // Loading state
   if (loading) {
      return <BodySpinner open={loading} />;
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
               text={
                  <>
                     <span>Search result for</span> <span style={{ color: 'rgb(90, 57, 161)' }}>{id}</span>
                  </>
               }
               filter={false}
               selectMenu={true}
               fontSize='1.25rem'
            />
            {searchedProducts.length === 0 && <EmptyTemplate img={search} text='No product found!' />}
            {
               searchedProducts.length >= 1 &&
               <Grid spacing={1} container>
                  <Grid item xs={12}>
                     <ShopProducts
                        shopProducts={currentProducts}
                        xs={12}
                        xm={6}
                        sm={6}
                        md={4}
                        lg={3}
                        xl={3}
                        path={`/search/${id}`}
                     />
                     <CustomPagination
                        pageNumbers={pageNumbers}
                        paginate={paginate}
                        currentPage={currentPage}
                     />
                  </Grid>
               </Grid>
            }
         </Box>
         <Footer />
      </>
   );
};

export default SearchComponent;