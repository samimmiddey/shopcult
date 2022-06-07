import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Zoom from '@mui/material/Zoom';
import { useTheme, useMediaQuery } from '@mui/material';

const BackToTop = () => {
   const [visible, setVisible] = useState(false);

   const theme = useTheme();
   const mdWidth = useMediaQuery(theme.breakpoints.down('md'));

   useEffect(() => {
      window.addEventListener("scroll", () => {
         if (window.pageYOffset > 100) {
            setVisible(true);
         } else {
            setVisible(false);
         }
      });
   }, []);

   const handleClick = () => {
      window.scrollTo({
         top: 0,
         behavior: 'smooth'
      });
   };

   return (
      <Zoom in={visible}>
         <Box
            onClick={handleClick}
            sx={{
               position: 'fixed',
               bottom: mdWidth ? 30 : 50,
               right: mdWidth ? 30 : 50,
               zIndex: 999
            }}
         >
            <Fab
               sx={{
                  backgroundColor: 'rgb(90, 57, 161)',
                  color: '#fff',
                  '&:hover': {
                     backgroundColor: 'rgb(90, 57, 161)'
                  }
               }}
               size="medium">
               <KeyboardArrowUpIcon sx={{ fontSize: '2rem' }} />
            </Fab>
         </Box>
      </Zoom>
   );
}

export default BackToTop;