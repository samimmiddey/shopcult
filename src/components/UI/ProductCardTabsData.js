import { Typography, styled } from '@mui/material';
import React from 'react';

const UL = styled('span')({
   display: 'flex',
   flexDirection: 'column',
   rowGap: '20px',
   marginTop: '16px'
});

const ResponsiveSpan = styled('span')(({ theme }) => ({
   display: 'flex',
   marginLeft: '16px',
   [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'center',
      rowGap: '5px'
   },
   [theme.breakpoints.up('sm')]: {
      alignItems: 'center',
      justifyContent: 'space-between',
   }
}));

const ResponsiveInnerSpan = styled('span')(({ theme }) => ({
   color: '#555',
   fontSize: '14px',
   [theme.breakpoints.down('sm')]: {
      width: '100%'
   },
   [theme.breakpoints.up('sm')]: {
      width: '60%'
   }
}));

const ProductCardTabData = ({ details }) => {
   return (
      <span style={{ width: '100%' }}>
         <Typography sx={{ marginBottom: '12px', fontSize: '18px', fontWeight: 600 }} component={'span'}>
            General
         </Typography>
         <UL>
            {details.map((item, index) => (
               <ResponsiveSpan key={index}>
                  <span style={{ color: '#aaa', fontSize: '13px', fontWeight: 600 }}>
                     {item.title}
                  </span>
                  <ResponsiveInnerSpan>
                     {item.data}
                  </ResponsiveInnerSpan>
               </ResponsiveSpan>
            ))}
         </UL>
      </span>
   );
};

export default ProductCardTabData;