import React, { useState } from 'react';
import InputBase from '@mui/material/InputBase';
import { styled } from '@mui/material/styles';
import { SearchOutlined } from '@mui/icons-material';
import { Backdrop, Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { uiActions } from '../../store/ui-slice';
import SearchBarBody from './SearchBarBody';
import CloseIcon from '@mui/icons-material/Close';
import { useHistory } from 'react-router-dom';

// Search Bar Style
const Search = styled('form')(({ theme }) => ({
   position: 'relative',
   borderRadius: '10px',
   zIndex: 1002,
   width: '100%',
   backgroundColor: '#F2F3F4',
   '&:hover': {
      backgroundColor: '#F8F9F9',
   },
   marginLeft: '2rem',
   [theme.breakpoints.down('md')]: {
      width: '100%',
   },
   [theme.breakpoints.down('sm')]: {
      marginLeft: '10px',
   }
}));

const SearchIconWrapper = styled(Box, {
   shouldForwardProp: (prop) => prop !== "activesearchbar"
})(({ theme, activesearchbar }) => ({
   padding: theme.spacing(0, 2),
   height: '100%',
   width: '100%',
   position: 'absolute',
   // pointerEvents: 'none',
   display: 'flex',
   alignItems: 'center',
   justifyContent: activesearchbar === 'true' ? 'flex-end' : 'space-between',
}));

const StyledInputBase = styled(InputBase, {
   shouldForwardProp: (prop) => prop !== "activesearchbar"
})(({ theme, activesearchbar }) => ({
   color: 'inherit',
   '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      border: '1px solid #eceff1',
      borderRadius: activesearchbar === 'true' ? '10px 10px 0 0' : '10px',
      backgroundColor: activesearchbar === 'true' && '#F8F9F9',
   },
   width: '100%'
}));

const SearchBar = () => {
   const inputValue = localStorage.getItem('searchInput') || '';
   const [input, setInput] = useState(inputValue);
   const activeSearchBar = useSelector(state => state.ui.activeSearchBar);
   const products = useSelector(state => state.products.products);

   const dispatch = useDispatch();
   const history = useHistory();

   let filteredProducts = [];
   if (input) {
      filteredProducts = products.filter(product => product.name.toLowerCase().includes(input));
   }

   const handleSubmit = e => {
      e.preventDefault();
      dispatch(uiActions.setActiveSearchBar(false));

      if (!input) {
         return;
      }

      localStorage.setItem('searchInput', input.toLowerCase());
      localStorage.setItem('searchedProducts', JSON.stringify(filteredProducts));
      dispatch(uiActions.setSearchedProducts(filteredProducts));
      history.push('/shop/search');
   }

   const handleChange = e => {
      setInput(e.target.value.toLowerCase());
   }

   return (
      <>
         {activeSearchBar &&
            <Backdrop
               onClick={() => dispatch(uiActions.setActiveSearchBar(false))}
               open={true}
               sx={{ zIndex: 1001 }}
            />}
         <Search
            onSubmit={handleSubmit}
         >
            <SearchIconWrapper>
               {
                  !input &&
                  <SearchOutlined
                     onClick={() => dispatch(uiActions.setActiveSearchBar(true))}
                     sx={{
                        color: '#AEB6BF',
                        zIndex: 99,
                        cursor: 'text'
                     }}
                  />
               }
               {
                  input &&
                  <CloseIcon
                     onClick={() => {
                        setInput('');
                        localStorage.setItem('searchInput', '');
                        localStorage.setItem('searchedProducts', JSON.stringify([]));
                     }}
                     sx={{
                        color: '#777',
                        cursor: 'pointer',
                        zIndex: 99,
                        fontSize: '20px'
                     }}
                  />
               }
            </SearchIconWrapper>
            <StyledInputBase
               onClick={() => dispatch(uiActions.setActiveSearchBar(true))}
               onChange={handleChange}
               activesearchbar={activeSearchBar.toString()}
               placeholder="Search…"
               inputProps={{ 'aria-label': 'search' }}
               value={input || ''}
            />
            {
               activeSearchBar &&
               <SearchBarBody
                  input={input}
                  setInput={setInput}
                  filteredProducts={filteredProducts}
               />
            }
         </Search>
      </>
   );
}

export default SearchBar;