import { Avatar, Box, MenuItem, Typography } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { uiActions } from '../../store/ui-slice';

const SearchBarBody = ({ input, setInput, filteredProducts }) => {
   const dispatch = useDispatch();

   return (
      <Box
         className='search-body'
         sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '300px',
            backgroundColor: '#F8F9F9',
            marginTop: '41px',
            border: '1px solid #d2c6eb',
            borderRadius: '0 0 10px 10px',
            overflowY: 'auto',
            overflowX: 'hidden',
            paddingTop: '5px'
         }}
      >
         {
            filteredProducts.map((product, index) => (
               <Link
                  onClick={() => {
                     dispatch(uiActions.setActiveSearchBar(false));
                     setInput(product.name.toLowerCase());
                     localStorage.setItem('searchInput', product.name.toLowerCase());
                  }}
                  key={index}
                  to={`/home/${product.id}`}
               >
                  <MenuItem>
                     <Box
                        sx={{
                           display: 'flex',
                           alignItems: 'center',
                           columnGap: '10px'
                        }}
                     >
                        <Avatar sx={{ width: 32, height: 32 }} alt='product' src={product.image.url} />
                        <Box>
                           <Typography
                              className='searchbody-text-wrap'
                              sx={{
                                 fontSize: '14px',
                                 fontWeight: 400
                              }}
                           >
                              {product.name}
                           </Typography>
                        </Box>
                     </Box>
                  </MenuItem>
               </Link>
            ))
         }
      </Box>
   );
};

export default SearchBarBody;