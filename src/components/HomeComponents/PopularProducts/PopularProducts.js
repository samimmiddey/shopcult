import { Box, Typography, Button } from '@mui/material';
import React, { useRef, useState, useEffect } from 'react';
import ProductCard from '../../UI/ProductCard';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import '../../../cardswiper.css';
import { useTheme } from '@mui/material';
import { useMediaQuery } from '@mui/material';

const PopularProducts = ({ bestsellers }) => {
   const [swiper, setSwiper] = useState();
   const prevRef = useRef();
   const nextRef = useRef();

   const theme = useTheme();
   const mdWidth = useMediaQuery(theme.breakpoints.down(900));
   const smWidth = useMediaQuery(theme.breakpoints.down('sm'));

   useEffect(() => {
      if (swiper) {
         swiper.params.navigation.prevEl = prevRef.current;
         swiper.params.navigation.nextEl = nextRef.current;
         swiper.navigation.init();
         swiper.navigation.update();
      }
   }, [swiper]);

   return (
      <Box className='product-swiper-container'
         sx={theme => ({
            marginTop: '8rem',
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
         <Box>
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
               <span style={{ color: 'rgb(132, 76, 196)' }}>Popular</span> <span style={{ color: 'rgb(90, 57, 161)' }}>Products</span>
            </Typography>
         </Box>
         <Box className='card-swiper'
            sx={theme => ({
               marginTop: '1.5rem',
               [theme.breakpoints.down('sm')]: {
                  marginTop: '2rem',
               }
            })}>
            <div className='swiper-button-container'>
               <Button
                  className={`${mdWidth ? 'swiper-button prev small-swiper-button' : 'swiper-button prev'}`}
                  ref={prevRef}
               >
                  <ArrowBackIcon sx={{ fontSize: `${mdWidth ? '1.5rem' : '1.75rem'}` }} />
               </Button>
               <Button
                  className={`${mdWidth ? 'swiper-button next small-swiper-button' : 'swiper-button next'}`}
                  ref={nextRef}
               >
                  <ArrowForwardIcon sx={{ fontSize: `${mdWidth ? '1.5rem' : '1.75rem'}` }} />
               </Button>
            </div>
            <Swiper
               slidesPerView={4}
               spaceBetween={smWidth ? 8 : 16}
               slidesPerGroup={1}
               loop={true}
               navigation={{
                  prevEl: prevRef?.current,
                  nextEl: nextRef?.current
               }}
               modules={[Navigation]}
               className="mySwiper"
               updateOnWindowResize
               observer
               observeParents
               onSwiper={setSwiper}
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
               {bestsellers.map((product, index) => (
                  <SwiperSlide key={index}>
                     <ProductCard
                        product={product}
                        index={index}
                        path={`/home/${product.id}`}
                     />
                  </SwiperSlide>
               ))}
            </Swiper>
         </Box>
      </Box>
   );
};

export default PopularProducts;