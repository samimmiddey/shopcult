import React from 'react';
import { useSelector } from 'react-redux';
import HomeComponents from '../components/HomeComponents/HomeComponents';
import ErrorComponent from '../components/UI/ErrorComponent';

const Home = () => {
   const error = useSelector(state => state.error.error);
   return (
      <>
         {error && <ErrorComponent error={error} />}
         {!error && <HomeComponents />}
      </>
   );
};

export default Home;