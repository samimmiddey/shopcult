import React, { useRef } from 'react';
import { Box, Button } from '@mui/material';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CategoryCard from '../../../UI/CategoryCard';
import { useTheme } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';

const CategoryTab = ({ value }) => {
   const products = useSelector(state => state.products.products);

   const swiperRef = useRef();

   const theme = useTheme();
   const mdWidth = useMediaQuery(theme.breakpoints.down(900));
   const smWidth = useMediaQuery(theme.breakpoints.down('sm'));

   // Filtered Products
   const filteredProducts = products.filter(product => {
      return product.categories.some(category => category.name === value) === true;
   });

   return (
      <Box className='category-swiper-container'>
         <Box className='card-swiper'>
            <div className='swiper-button-container'>
               <Button
                  className={`${mdWidth ? 'swiper-button prev small-swiper-button' : 'swiper-button prev'}`}
                  onClick={() => swiperRef.current?.slidePrev()}
               >
                  <ArrowBackIcon sx={{ fontSize: `${mdWidth ? '1.5rem' : '1.75rem'}` }} />
               </Button>
               <Button
                  className={`${mdWidth ? 'swiper-button next small-swiper-button' : 'swiper-button next'}`}
                  onClick={() => swiperRef.current?.slideNext()}
               >
                  <ArrowForwardIcon sx={{ fontSize: `${mdWidth ? '1.5rem' : '1.75rem'}` }} />
               </Button>
            </div>
            <Swiper
               slidesPerView={4}
               spaceBetween={smWidth ? 8 : 16}
               slidesPerGroup={1}
               loop={true}
               modules={[Navigation]}
               onBeforeInit={(swiper) => swiperRef.current = swiper}
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
               {filteredProducts.map((item, index) => (
                  <SwiperSlide key={index}>
                     <Box
                        sx={theme => ({
                           margin: '2rem 0 11.5rem 0',
                           [theme.breakpoints.down('xl')]: {
                              margin: '2rem 0 10.5rem 0'
                           },
                           [theme.breakpoints.down('lg')]: {
                              margin: '2rem 0 9.5rem 0'
                           },
                           [theme.breakpoints.down('md')]: {
                              margin: '2rem 0 8.5rem 0'
                           },
                           [theme.breakpoints.down('sm')]: {
                              margin: '1.5rem 0 8rem 0'
                           }
                        })}
                     >
                        <CategoryCard
                           item={item}
                           index={index}
                           path={`/product/${item.id}`}
                        />
                     </Box>
                  </SwiperSlide>
               ))}
            </Swiper>
         </Box>
      </Box>
   )
};

export default CategoryTab;