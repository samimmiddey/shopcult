import { Box, Button } from '@mui/material';
import React, { useRef, useState, useEffect } from 'react';
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
import TestimonialCard from '../../UI/TestimonialCard';
import TestimonialData from '../../../data/TestimonialData';
import CustomHeaderText from '../../UI/CustomHeaderText';

const HomeTestimonial = () => {
   const [swiper, setSwiper] = useState();
   const prevRef = useRef();
   const nextRef = useRef();

   const theme = useTheme();
   const mdWidth = useMediaQuery(theme.breakpoints.down('md'));
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
         <CustomHeaderText text='What Our Customers Say' />
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
               spaceBetween={smWidth ? 10 : 20}
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
                  600: {
                     slidesPerView: 2,
                  },
                  1200: {
                     slidesPerView: 3,
                  },
                  1536: {
                     slidesPerView: 4,
                  }
               }}
            >
               {TestimonialData.map((data, index) => (
                  <SwiperSlide key={index}>
                     <TestimonialCard
                        data={data}
                     />
                  </SwiperSlide>
               ))}
            </Swiper>
         </Box>
      </Box>
   );
};

export default HomeTestimonial;