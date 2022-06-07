import { Button } from '@mui/material';
import React from 'react';

const PrimaryButton = ({ text }) => {
   return (
      <Button
         sx={theme => ({
            textTransform: 'none',
            minWidth: 0,
            minHeight: 0,
            padding: '14px 2rem',
            borderRadius: '8px',
            fontSize: '1rem',
            color: 'rgb(213, 200, 240)',
            transition: '0.5s',
            "&:hover": {
               backgroundPosition: 'right center'
            },
            [theme.breakpoints.down('lg')]: {
               padding: '0.5rem 1.25rem',
               borderRadius: '5px',
            },
            [theme.breakpoints.down('md')]: {
               fontSize: '14px',
            }
         })}
         className='primary-button'
         disableElevation
         variant='contained'
      >
         {text}
      </Button>
   );
};

export default PrimaryButton;