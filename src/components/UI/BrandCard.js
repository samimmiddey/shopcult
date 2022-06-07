import { Card, CardMedia, Typography, Box } from '@mui/material';
import React from 'react';
import { useTheme } from '@mui/material';
import { useMediaQuery } from '@mui/material';

const BrandCard = ({ brand }) => {
   const theme = useTheme();
   const mdWidth = useMediaQuery(theme.breakpoints.down(900));
   const smWidth = useMediaQuery(theme.breakpoints.down(600));

   return (
      <Card
         className='brand-card'
         sx={{
            maxWidth: 400,
            position: 'relative',
            transition: "transform 0.15s ease-in-out",
            "&:hover": {
               transform: "scale3d(1.03, 1.03, 1)"
            }
         }}
         elevation={0}
      >
         <CardMedia
            className='brand-card-img'
            component="img"
            alt="Image"
            height={mdWidth && !smWidth ? '300' : mdWidth && smWidth ? '250' : '350'}
            image={brand.img}
         />
         <Box className='brand-card-extra' />
         <Box sx={{ position: 'absolute', bottom: 0, color: '#fff', width: '100%', zIndex: 99 }}>
            <Typography gutterBottom variant="h6"
               sx={theme => ({
                  fontWeight: 600,
                  padding: '0.5rem 1.5rem',
                  fontSize: '2rem',
                  [theme.breakpoints.down('lg')]: {
                     fontSize: '1.75rem'
                  },
                  [theme.breakpoints.down('md')]: {
                     fontSize: '1.5rem'
                  },
                  [theme.breakpoints.down('sm')]: {
                     fontSize: '1.3rem',
                     padding: '0.5rem 1rem',
                  },
                  [theme.breakpoints.down(400)]: {
                     fontSize: '1.2rem'
                  }
               })}
            >
               {brand.name}
            </Typography>
         </Box>
      </Card >
   );
};

export default BrandCard;