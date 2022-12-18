import React, { useEffect, useState } from 'react';
import ShopProducts from './ShopProducts/ShopProducts';
import ShopFilter from './ShopFilter/ShopFilter';
import { Box, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import FilterBottomModal from '../UI/FilterBottomModal';
import { useTheme, useMediaQuery } from '@mui/material';
import { useParams } from 'react-router-dom';
import CustomPagination from '../UI/CustomPagination';
import CustomHeader from '../UI/CustomHeader';
import EmptyTemplate from '../UI/EmptyTemplate';
import nocategory from '../../assets/nocategory.svg';

const ShopComponents = () => {
   const [currentPage, setCurrentPage] = useState(1);

   const showFilter = useSelector(state => state.ui.showFilter);
   const products = useSelector(state => state.products.products);
   const sortProducts = useSelector(state => state.ui.sortProducts);
   const selectedItems = useSelector(state => state.ui.selectedItems);
   const categories = useSelector(state => state.products.categories);

   const theme = useTheme();
   const smWidth = useMediaQuery(theme.breakpoints.down('sm'));
   const mdWidth = useMediaQuery(theme.breakpoints.down('md'));
   const xlUpWidth = useMediaQuery(theme.breakpoints.up('xl'));

   const { id } = useParams();

   // Category
   const category = id.charAt(0).toUpperCase() + id.slice(1);

   // Categorywise products
   const categoryWiseProducts = products.filter(product => {
      return product.categories.some(cat => cat.name === category) === true;
   });

   // Selected products
   const selectedProducts = products.filter(product => {
      return selectedItems.some(item => item === product.name) === true;
   });

   // Low to high sorted products
   const LowToHighProducts = category !== 'All' && selectedProducts.length < 1 ?
      [...categoryWiseProducts].sort((a, b) => a.price.raw - b.price.raw) :
      selectedProducts.length >= 1 ?
         [...selectedProducts].sort((a, b) => a.price.raw - b.price.raw) :
         [...products].sort((a, b) => a.price.raw - b.price.raw);

   // High to low sorted products
   const HighToLowProducts = category !== 'All' && selectedProducts.length < 1 ?
      [...categoryWiseProducts].sort((a, b) => b.price.raw - a.price.raw) :
      selectedProducts.length >= 1 ?
         [...selectedProducts].sort((a, b) => b.price.raw - a.price.raw) :
         [...products].sort((a, b) => b.price.raw - a.price.raw);

   // Sorted products based on selection
   let shopProducts = [];
   switch (sortProducts) {
      case 'Low-High':
         shopProducts = LowToHighProducts;
         break;
      case 'High-Low':
         shopProducts = HighToLowProducts;
         break;
      default:
         shopProducts = category !== 'All' && selectedProducts.length < 1 ?
            categoryWiseProducts : selectedProducts.length >= 1 ?
               selectedProducts : products;
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

   // Resetting the page to 1 when other category is selected
   useEffect(() => {
      paginate(1);
   }, [id]);

   // Check if category exists or not
   const allCategories = categories.map(category => category.slug);
   const categoryExists = ['all', ...allCategories].includes(id);

   return (
      <Box
         className='small-container'
         sx={{ padding: smWidth ? '80px 16px 0 16px' : '80px 32px 0 32px' }}
      >
         <CustomHeader
            text='Products'
            filter={categoryExists ? true : false}
            selectMenu={categoryExists ? true : false}
         />
         {
            mdWidth && categoryExists && <FilterBottomModal />
         }
         <Grid spacing={1} container>
            {
               !mdWidth && categoryExists && (
                  <Grid
                     className='shop-filter'
                     sx={
                        showFilter ? {
                           height: '98.5vh',
                           overflow: 'auto',
                           paddingRight: '8px',
                           marginTop: '0.25rem'
                        } : {}
                     }
                     item md={3} lg={2.5} xl={2}
                  >
                     <ShopFilter />
                  </Grid>
               )
            }
            {
               categoryExists &&
               (
                  <Grid
                     item
                     xs={12}
                     sm={12}
                     md={showFilter ? 9 : 12}
                     lg={showFilter ? 9.5 : 12}
                     xl={showFilter ? 10 : 12}
                  >
                     <ShopProducts
                        shopProducts={currentProducts}
                        xs={12}
                        xm={6}
                        sm={6}
                        md={showFilter ? 6 : 4}
                        lg={showFilter ? 4 : 3}
                        xl={3}
                        path='/shop/product'
                     />
                     <CustomPagination
                        pageNumbers={pageNumbers}
                        paginate={paginate}
                        currentPage={currentPage}
                     />
                  </Grid>
               )
            }
         </Grid>
         {
            !categoryExists &&
            <EmptyTemplate
               img={nocategory}
               text='This category does not exist!'
            />
         }
      </Box>
   );
};

export default ShopComponents;