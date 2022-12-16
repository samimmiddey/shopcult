import { Grid } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { Brands } from '../../../data/BrandsData';
import BrandCard from '../../UI/BrandCard';
import { useTheme, useMediaQuery } from '@mui/material';

const BrandCards = () => {
   const theme = useTheme();
   const smWidth = useMediaQuery(theme.breakpoints.down('sm'));

   return (
      <Grid spacing={smWidth ? 1 : 2} container>
         {Brands.map((brand, index) => (
            <Grid key={index} item xs={12} xm={6} sm={6} md={4} lg={3}>
               <Link to={`/brands/${brand.name.toLowerCase()}`}>
                  <BrandCard brand={brand} />
               </Link>
            </Grid>
         ))}
      </Grid>
   );
};

export default BrandCards;