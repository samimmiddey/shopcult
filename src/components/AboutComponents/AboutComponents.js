import React from 'react';
import AboutHero from './AboutHero/AboutHero';
import AboutPoints from './AboutPoints/AboutPoints';
import AboutFeatured from './AboutFeatured.js/AboutFeatured';
import AboutForm from './AboutForm/AboutForm';

const AboutComponents = () => {
   return (
      <div className='container' style={{ paddingTop: '80px' }}>
         <AboutHero />
         <AboutPoints />
         <AboutForm />
         <AboutFeatured />
      </div>
   );
};

export default AboutComponents;