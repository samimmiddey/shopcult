import React, { useRef } from 'react';
import { Box, Button } from '@mui/material';
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
   const swiperRef = useRef();

   const theme = useTheme();
   const mdWidth = useMediaQuery(theme.breakpoints.down('md'));
   const xmWidth = useMediaQuery(theme.breakpoints.down('xm'));

   const text = <>What Our {xmWidth && <br />} Customers Say</>;

   return (
      <Box className='product-swiper-container section-margin'>
         <CustomHeaderText text={text} />
         <Box className='card-swiper'>
            <Box className='swiper-button-container'>
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
            </Box>
            <Swiper
               slidesPerView={4}
               spaceBetween={16}
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
               {TestimonialData.map((data, index) => (
                  <SwiperSlide key={index}>
                     <Box
                        sx={theme => ({
                           margin: '2rem 0 7rem 0',
                           [theme.breakpoints.down('xl')]: {
                              margin: '2rem 0 6rem 0'
                           },
                           [theme.breakpoints.down('lg')]: {
                              margin: '2rem 0 5rem 0'
                           },
                           [theme.breakpoints.down('md')]: {
                              margin: '2rem 0 4rem 0'
                           },
                           [theme.breakpoints.down('sm')]: {
                              margin: '1.5rem 0 3.5rem 0'
                           }
                        })}
                     >
                        <TestimonialCard data={data} />
                     </Box>
                  </SwiperSlide>
               ))}
            </Swiper>
         </Box>
      </Box>
   );
};

export default HomeTestimonial;