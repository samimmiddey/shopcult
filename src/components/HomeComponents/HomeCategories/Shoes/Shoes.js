import React, { useRef, useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import HomeCategoryCard from '../../../UI/HomeCategoryCard';
import { useTheme } from '@mui/material';
import { useMediaQuery } from '@mui/material';

const Shoes = ({ shoes }) => {
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
      <Box className='category-swiper-container'>
         <Box className='card-swiper'>
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
               {shoes.map((item, index) => (
                  <SwiperSlide key={index}>
                     <HomeCategoryCard
                        item={item}
                        index={index}
                        path={`/product/${item.id}`}
                     />
                  </SwiperSlide>
               ))}
            </Swiper>
         </Box>
      </Box>
   )
};

export default Shoes;