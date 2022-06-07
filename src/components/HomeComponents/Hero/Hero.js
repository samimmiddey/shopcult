import React, { useState, useRef, useEffect } from 'react';
import HeroCard from './HeroCard';
import { images } from '../../../data/HeroSliderData';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../../../heroswiper.css";
import { Navigation, Autoplay } from "swiper";
import { Box, Button } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useTheme } from '@mui/material';
import { useMediaQuery } from '@mui/material';

const Hero = () => {
   const [swiper, setSwiper] = useState();
   const prevRef = useRef();
   const nextRef = useRef();

   const theme = useTheme();
   const mdWidth = useMediaQuery(theme.breakpoints.down(900));

   useEffect(() => {
      if (swiper) {
         swiper.params.navigation.prevEl = prevRef.current;
         swiper.params.navigation.nextEl = nextRef.current;
         swiper.navigation.init();
         swiper.navigation.update();
      }
   }, [swiper]);

   const HeroCards = images.map((item, index) => (
      <SwiperSlide key={index}>
         <HeroCard
            image={item}
         />
      </SwiperSlide>
   ));

   return (
      <Box className='hero-swiper'>
         <div className='hero-swiper-button-container'>
            <Button
               className={`${mdWidth ? 'hero-swiper-button hero-small-swiper-button prev' : 'hero-swiper-button prev'}`}
               ref={prevRef}
            >
               <ArrowBackIosNewIcon sx={{ fontSize: `${mdWidth ? '1.5rem' : '1.75rem'}` }} />
            </Button>
            <Button
               className={`${mdWidth ? 'hero-swiper-button hero-small-swiper-button next' : 'hero-swiper-button next'}`}
               ref={nextRef}
            >
               <ArrowForwardIosIcon sx={{ fontSize: `${mdWidth ? '1.5rem' : '1.75rem'}` }} />
            </Button>
         </div>
         <Swiper
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            autoplay={{
               delay: 7000,
               disableOnInteraction: false
            }}
            navigation={{
               prevEl: prevRef?.current,
               nextEl: nextRef?.current
            }}
            updateOnWindowResize
            observer
            observeParents
            onSwiper={setSwiper}
            modules={[Autoplay, Navigation]}
            className="mySwiper"
         >
            {HeroCards}
         </Swiper>
      </Box>
   );
};

export default Hero;