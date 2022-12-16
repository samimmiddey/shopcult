import React, { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch } from 'react-redux';
import { uiActions } from '../../store/ui-slice';
import { Box, Typography } from '@mui/material';

const SelectMenu = () => {
   const [sort, setSort] = useState('None');
   const dispatch = useDispatch();

   const handleChange = (event) => {
      setSort(event.target.value);
      dispatch(uiActions.setSortProducts(event.target.value));
   };

   return (
      <Box>
         <FormControl sx={{ minWidth: 120 }} size='small'>
            <Select
               value={sort}
               onChange={handleChange}
               displayEmpty
               inputProps={{ 'aria-label': 'Without label' }}
               renderValue={selected => {
                  if (selected === 'None') {
                     return (
                        <Typography
                           sx={{
                              fontSize: '14px',
                              color: 'text.secondary',
                              fontWeight: 500
                           }}
                        >
                           Sort By
                        </Typography>
                     );
                  };

                  return selected;
               }}
               sx={{
                  fontSize: '14px',
                  '.MuiOutlinedInput-notchedOutline': {
                     borderColor: 'rgba(0, 0, 0, 0.18)',
                     borderWidth: '1px'
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                     borderColor: 'rgb(90, 57, 161)',
                     borderWidth: '1px'
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                     borderColor: 'rgb(90, 57, 161)'
                  },
               }}
               MenuProps={{
                  sx: {
                     "&& .Mui-selected": {
                        backgroundColor: '#5a39a120'
                     },
                     "&& .Mui-selected:hover": {
                        backgroundColor: '#5a39a120'
                     }
                  }
               }}
            >
               {['None', 'Low-High', 'High-Low'].map((item, index) => (
                  <MenuItem
                     disableRipple
                     sx={{
                        fontSize: '14px',
                        color: 'text.primary',
                        fontWeight: 500,
                        padding: '7px 16px'
                     }}
                     key={index}
                     value={item}
                  >
                     {
                        item === 'None' ? item : `Price : ${item}`
                     }
                  </MenuItem>
               ))}
            </Select>
         </FormControl>
      </Box>
   );
}

export default SelectMenu;
