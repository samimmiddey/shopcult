import React from 'react';
import { Box, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchBar from './SearchBar';
import { uiActions } from '../../../store/ui-slice';
import { useDispatch } from 'react-redux';

const SearchBarSmall = React.forwardRef(({ value, setValue, submitted, setSubmitted, terms, setTerms, handleSearch, handleChange }, ref) => {
   const dispatch = useDispatch();

   return (
      <Box
         sx={theme => ({
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: '75px',
            backgroundColor: '#fff',
            display: 'flex',
            alignItems: 'center',
            columnGap: '8px',
            zIndex: 99999,
            padding: '0 1rem',
            [theme.breakpoints.up('md')]: {
               display: 'none'
            }
         })}
      >
         <IconButton
            onClick={() => dispatch(uiActions.setActiveSearch(false))}
            sx={theme => ({
               marginRight: '-2rem',
               [theme.breakpoints.down('lg')]: {
                  marginRight: '-1.5rem'
               }
            })}
         >
            <ArrowBackIcon sx={{ color: 'text.secondary' }} />
         </IconButton>
         <SearchBar
            value={value}
            setValue={setValue}
            submitted={submitted}
            setSubmitted={setSubmitted}
            terms={terms}
            setTerms={setTerms}
            handleSearch={handleSearch}
            handleChange={handleChange}
            ref={ref}
         />
      </Box>
   );
});

export default SearchBarSmall;