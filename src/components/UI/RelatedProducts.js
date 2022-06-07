import { Box, Typography } from '@mui/material';
import React from 'react';
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
      <Box className='product-swiper-container'
         sx={theme => ({
            marginTop: '7rem',
            [theme.breakpoints.down('xl')]: {
               marginTop: '6rem'
            },
            [theme.breakpoints.down('lg')]: {
               marginTop: '5rem'
            },
            [theme.breakpoints.down('md')]: {
               marginTop: '4rem'
            },
            [theme.breakpoints.down('sm')]: {
               marginTop: '3.5rem'
            }
         })}>
         <Box sx={{ textAlign: 'center' }}>
            <Typography variant='h4'
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
               })}>
               <span style={{ color: 'rgb(132, 76, 196)' }}>Products</span> <span style={{ color: 'rgb(90, 57, 161)' }}>You May Like</span>
            </Typography>
         </Box>
         <Box className='card-swiper'
            sx={theme => ({
               marginTop: '3rem',
               [theme.breakpoints.down('sm')]: {
                  marginTop: '2rem',
               }
            })}>
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
               className="mySwiper"
               updateOnWindowResize
               observer
               observeParents
               breakpoints={{
                  250: {
                     slidesPerView: 1,
                  },
                  375: {
                     slidesPerView: 2,
                  },
                  650: {
                     slidesPerView: 3,
                  },
                  1250: {
                     slidesPerView: 4,
                  }
               }}
            >
               {relatedProducts.map((product, index) => (
                  <SwiperSlide key={index}>
                     <ProductCard
                        product={product}
                        index={index}
                        path={`/related/${product.id}`}
                     />
                  </SwiperSlide>
               ))}
            </Swiper>
         </Box>
      </Box>
   );
};

export default RelatedProducts;