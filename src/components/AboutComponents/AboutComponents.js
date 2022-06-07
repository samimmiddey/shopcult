import React from 'react';
import AboutHero from './AboutHero/AboutHero';
import AboutPoints from './AboutPoints/AboutPoints';
import AboutFeatured from './AboutFeatured.js/AboutFeatured';
import AboutForm from './AboutForm/AboutForm';
import { useSelector } from 'react-redux';
import ProgressBar from '../UI/ProgressBar';

const AboutComponents = () => {
   const loading = useSelector(state => state.ui.progressBar);

   return (
      <>
         {loading && <ProgressBar />}
         {
            !loading &&
            <div className='container' style={{ paddingTop: '80px' }}>
               <AboutHero />
               <AboutPoints />
               <AboutForm />
               <AboutFeatured />
            </div>
         }
      </>
   );
};

export default AboutComponents;