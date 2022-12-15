import React from 'react';
import { styled } from '@mui/material/styles';
import { SearchOutlined } from '@mui/icons-material';
import { Box, IconButton, TextField } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { uiActions } from '../../../store/ui-slice';
import SearchBarBody from './SearchBarBody';
import CloseIcon from '@mui/icons-material/Close';

// Search Bar Style
const Search = styled('form')(({ theme }) => ({
   position: 'relative',
   borderRadius: '5px',
   zIndex: 1002,
   width: '100%',
   backgroundColor: '#F2F3F4',
   '&:hover': {
      backgroundColor: '#F8F9F9',
   },
   marginLeft: '2rem',
   [theme.breakpoints.down('lg')]: {
      marginLeft: '1.5rem'
   }
}));

const SearchBar = React.forwardRef(({ value, setValue, submitted, setSubmitted, terms, setTerms, handleSearch, handleChange }, ref) => {
   const inputFocus = useSelector(state => state.ui.inputFocus);

   const dispatch = useDispatch();

   return (
      <Search onSubmit={handleSearch}>
         <Box
            sx={{
               padding: '1rem',
               height: '100%',
               width: '100%',
               position: 'absolute',
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'space-between',
            }}
         >
            <SearchOutlined
               sx={{
                  color: '#AEB6BF',
                  zIndex: 99,
                  cursor: 'text'
               }}
            />
            {
               value &&
               <IconButton
                  size='small'
                  onClick={() => {
                     ref.current.value = '';
                     setValue('');
                  }}
               >
                  <CloseIcon
                     sx={{
                        color: '#7e8b9a',
                        cursor: 'pointer',
                        zIndex: 99,
                        fontSize: '1.5rem',
                        fontWeight: 600
                     }}
                  />
               </IconButton>
            }
         </Box>
         <TextField
            inputRef={ref}
            onClick={() => setSubmitted(false)}
            onBlur={() => dispatch(uiActions.setInputFocus(false))}
            onFocus={() => dispatch(uiActions.setInputFocus(true))}
            onChange={handleChange}
            placeholder="Search…"
            value={value || ''}
            sx={{
               color: 'inherit',
               width: '100%',
               backgroundColor: inputFocus && '#F8F9F9',
               '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                     borderRadius: '5px',
                     borderColor: 'transparent',
                  },
                  '&:hover fieldset': {
                     borderColor: 'transparent',
                  },
                  '&.Mui-focused fieldset': {
                     borderColor: 'rgb(90, 57, 161)',
                     borderWidth: '2px'
                  }
               }
            }}
            inputProps={{
               style: {
                  height: '15px',
                  marginLeft: '2rem',
                  marginRight: '2rem'
               }
            }}
         />
         <SearchBarBody
            setValue={setValue}
            submitted={submitted}
            setSubmitted={setSubmitted}
            terms={terms}
            setTerms={setTerms}
            ref={ref}
         />
      </Search>
   );
})

export default SearchBar;