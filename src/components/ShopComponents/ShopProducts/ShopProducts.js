import React from 'react';
import { Box, Grid } from '@mui/material';
import ProductCard from '../../UI/ProductCard';

const ShopProducts = ({ shopProducts, xs, xm, sm, md, lg, xl, path }) => {
   return (
      <Box>
         <Grid spacing={2} container>
            {shopProducts.map((product, index) => (
               <Grid
                  sx={{
                     transition: "transform 0.15s ease-in-out",
                     "&:hover": {
                        transform: "scale3d(1.03, 1.03, 1)"
                     }
                  }}
                  key={index}
                  item
                  xs={xs}
                  xm={xm}
                  sm={sm}
                  md={md}
                  lg={lg}
                  xl={xl}
               >
                  <ProductCard
                     product={product}
                     path={`${path}/${product.id}`}
                  />
               </Grid>
            ))}
         </Grid>
      </Box>
   );
};

export default ShopProducts;