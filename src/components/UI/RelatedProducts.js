import React from 'react';
import { Box } from '@mui/material';
import ProductCard from '../UI/ProductCard';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay } from "swiper";
import '../../cardswiper.css';
import { useTheme } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import CustomHeaderText from './CustomHeaderText';

const RelatedProducts = ({ product }) => {
   const allProducts = useSelector(state => state.products.products);
   const categories = product.categories.map(category => category.name);

   const relatedProducts = allProducts.filter(product => {
      const allCategories = product.categories.map(category => category.name);
      return categories.some((category) => allCategories.includes(category));
   });

   const theme = useTheme();
   const smWidth = useMediaQuery(theme.breakpoints.down('sm'));

   return (
      <Box className='product-swiper-container section-margin'>
         <Box sx={{ textAlign: 'center' }}>
            <CustomHeaderText text='Products You May Like' />
         </Box>
         <Box className='card-swiper'>
            <Swiper
               slidesPerView={4}
               spaceBetween={smWidth ? 8 : 16}
               slidesPerGroup={1}
               loop={true}
               autoplay={{
                  autoplay: 5000,
                  speed: 800,
                  disableOnInteraction: false
               }}
               modules={[Autoplay]}
               breakpoints={{
                  250: {
                     slidesPerView: 1,
                  },
                  450: {
                     slidesPerView: 2,
                  },
                  768: {
                     slidesPerView: 3,
                  },
                  1250: {
                     slidesPerView: 4,
                  }
               }}
            >
               {relatedProducts.map((product, index) => (
                  <SwiperSlide key={index}>
                     <Box
                        sx={theme => ({
                           margin: '2rem 0 8rem 0',
                           [theme.breakpoints.down('xl')]: {
                              margin: '2rem 0 7rem 0'
                           },
                           [theme.breakpoints.down('lg')]: {
                              margin: '2rem 0 6rem 0'
                           },
                           [theme.breakpoints.down('md')]: {
                              margin: '2rem 0 5rem 0'
                           },
                           [theme.breakpoints.down('sm')]: {
                              margin: '1.5rem 0 4.5rem 0'
                           }
                        })}
                     >
                        <ProductCard
                           product={product}
                           path={`/related/${product.id}`}
                        />
                     </Box>
                  </SwiperSlide>
               ))}
            </Swiper>
         </Box>
      </Box>
   );
};

export default RelatedProducts;