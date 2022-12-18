import React from 'react';
import { Typography } from '@mui/material';

const CustomHeaderText = ({ text, fontSize, variant }) => {
   return (
      <Typography
         variant={variant ? variant : 'h4'}
         sx={theme => ({
            fontWeight: 700,
            fontSize: fontSize ? fontSize : '2rem',
            [theme.breakpoints.down('lg')]: {
               fontSize: fontSize ? fontSize : '1.75rem',
            },
            [theme.breakpoints.down('md')]: {
               fontSize: fontSize ? fontSize : '1.5rem'
            },
            [theme.breakpoints.down('sm')]: {
               fontSize: fontSize ? fontSize : '1.35rem'
            },
            [theme.breakpoints.down(375)]: {
               fontSize: fontSize ? fontSize : '1.25rem'
            }
         })}
      >
         {text}
      </Typography>
   );
};

export default CustomHeaderText;