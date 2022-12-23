import React from 'react';
import HomeComponents from '../components/HomeComponents/HomeComponents';
import { useSelector } from 'react-redux';
import ErrorCard from '../components/UI/ErrorCard';

const Home = () => {
   const error = useSelector(state => state.ui.error);
   const errorText = useSelector(state => state.ui.errorText);

   if (error) {
      return <ErrorCard errorText={errorText} />;
   }

   return (
      <>
         <HomeComponents />
      </>
   );
};

export default Home;