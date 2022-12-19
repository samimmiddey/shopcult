import { Box, Button, IconButton, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import HistoryIcon from '@mui/icons-material/History';

const SearchBarBody = React.forwardRef(({ setValue, submitted, setSubmitted, terms, setTerms }, ref) => {
   const inputFocus = useSelector(state => state.ui.inputFocus);

   return (
      <Box
         className='search-body'
         onClick={() => ref.current.focus()}
         sx={theme => ({
            position: 'absolute',
            top: '10px',
            left: 0,
            right: 0,
            minHeight: '400px',
            zIndex: 9999,
            backgroundColor: '#fff',
            marginTop: '41px',
            borderRadius: '0 0 5px 5px',
            overflowY: 'auto',
            overflowX: 'hidden',
            paddingTop: '5px',
            paddingBottom: '5px',
            display: !inputFocus ? 'none' : 'block',
            '&:hover': {
               display: !submitted && 'block'
            },
            [theme.breakpoints.down('md')]: {
               position: 'fixed',
               marginTop: 0,
               top: '70px'
            }
         })}
      >
         <Typography
            sx={{
               fontSize: '14px',
               fontWeight: 500,
               color: 'text.disabled',
               margin: '6px 1.5rem 0 1.5rem'
            }}
         >
            Recent searches
         </Typography>
         <Box sx={{ margin: '5px 0 0.5rem 0' }}>
            {
               terms.map((term, index) => (
                  <Box
                     key={index}
                     sx={{
                        width: '100%',
                        position: 'relative'
                     }}
                  >
                     <Button
                        onClick={() => {
                           ref.current.value = term;
                           setValue(term);
                           setSubmitted(true);
                        }}
                        type={submitted ? 'submit' : 'button'}
                        className='search-text-wrap'
                        sx={{
                           textTransform: 'none',
                           height: '35px',
                           width: '100%',
                           padding: '0 24px',
                           display: 'flex',
                           justifyContent: 'flex-start',
                           textAlign: 'start'
                        }}
                     >
                        <HistoryIcon />
                        <Typography
                           className='search-text-wrap'
                           sx={theme => ({
                              width: '80%',
                              fontSize: '15px',
                              fontWeight: 600,
                              marginLeft: '16px',
                              [theme.breakpoints.down(500)]: {
                                 width: '70%'
                              }
                           })}
                        >
                           {term}
                        </Typography>
                     </Button>
                     <IconButton
                        size='small'
                        onClick={() => {
                           const newArr = terms.filter(text => text !== term);
                           setTerms(newArr);
                           localStorage.setItem('searchTerms', JSON.stringify(newArr));
                        }}
                        sx={{
                           position: 'absolute',
                           top: '50%',
                           right: '16px',
                           zIndex: 1,
                           transform: 'translateY(-50%)'
                        }}
                     >
                        <CloseIcon sx={{ color: 'text.disabled' }} />
                     </IconButton>
                  </Box>
               ))
            }
         </Box>
      </Box>
   );
});

export default SearchBarBody;