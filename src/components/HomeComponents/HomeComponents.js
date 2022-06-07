import React, { useEffect, useState } from 'react';
import Hero from './Hero/Hero';
import Brands from './Brands/Brands';
import HomeInformation from './HomeInformation/HomeInformation';
import PopularProducts from './PopularProducts/PopularProducts';
import HomeCategories from './HomeCategories/HomeCategories';
import HomeBox from './HomeBox/HomeBox';
import HomeTestimonial from './HomeTestimonial/HomeTestimonial';
import HomePolicy from './HomePolicy/HomePolicy';
import { useSelector } from 'react-redux';
import ProgressBar from '../UI/ProgressBar';

const HomeComponents = () => {
   const [isLoading, setIsLoading] = useState(true);
   const products = useSelector(state => state.products.products);

   // Bestsellers
   const bestsellers = products.filter(product => {
      return product.categories.some(category => category.name === 'Bestsellers') === true;
   });

   // Headphones
   const headphones = products.filter(product => {
      return product.categories.some(category => category.name === 'Headphones') === true;
   });

   // Shoes
   const shoes = products.filter(product => {
      return product.categories.some(category => category.name === 'Shoes') === true;
   });

   // Sunglasses
   const sunglasses = products.filter(product => {
      return product.categories.some(category => category.name === 'Sunglasses') === true;
   });

   // Watches
   const watches = products.filter(product => {
      return product.categories.some(category => category.name === 'Watches') === true;
   });

   useEffect(() => {
      if (products.length) {
         setIsLoading(false);
      }
   }, [products]);

   return (
      <>
         {isLoading && <ProgressBar />}
         {
            !isLoading &&
            <div className='container' style={{ paddingTop: '80px' }}>
               <Hero />
               <HomePolicy />
               <div className='home-components-container' style={{ maxWidth: '1450px', margin: '0 auto' }}>
                  <PopularProducts
                     bestsellers={bestsellers}
                  />
                  <HomeCategories
                     headphones={headphones}
                     shoes={shoes}
                     sunglasses={sunglasses}
                     watches={watches}
                  />
                  <HomeBox />
                  <HomeInformation />
                  <HomeTestimonial />
               </div>
               <Brands />
            </div>
         }
      </>
   );
};

export default HomeComponents;