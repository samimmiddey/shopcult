import { Grid } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { Brands } from '../../../../data/BrandsData';
import BrandCard from '../BrandCard/BrandCard';

const BrandCards = ({ mdWidth, smWidth }) => {
   return (
      <Grid spacing={smWidth ? 1 : 2} container>
         {Brands.map((brand, index) => (
            <Grid key={index} item xs={12} xm={6} sm={6} md={4} lg={3}>
               <Link to={`/brands/${brand.name.toLowerCase()}`}>
                  <BrandCard
                     brand={brand}
                     mdWidth={mdWidth}
                     smWidth={smWidth}
                  />
               </Link>
            </Grid>
         ))}
      </Grid>
   );
};

export default BrandCards;