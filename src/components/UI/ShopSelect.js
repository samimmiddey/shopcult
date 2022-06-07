import React, { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch } from 'react-redux';
import { uiActions } from '../../store/ui-slice';

const ShopSelect = () => {
   const [sort, setSort] = useState('');
   const dispatch = useDispatch();

   const handleChange = (event) => {
      setSort(event.target.value);
      dispatch(uiActions.setSortProducts(event.target.value));
   };

   return (
      <div>
         <FormControl
            size='small'
            sx={theme => ({
               ml: 1,
               minWidth: 120,
               [theme.breakpoints.down('sm')]: {
                  margin: '10px 0'
               }
            })}
         >
            <InputLabel>Sort By</InputLabel>
            <Select
               value={sort}
               label="Sort By"
               onChange={handleChange}
               sx={{
                  '.MuiOutlinedInput-notchedOutline': {
                     borderColor: 'rgb(132, 76, 196)',
                     borderWidth: '1px',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                     borderColor: 'rgb(90, 57, 161)',
                     borderWidth: '1px'
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                     borderColor: 'rgb(90, 57, 161)',
                  },
               }}
            >
               <MenuItem value="">None</MenuItem>
               <MenuItem value={'Low-High'}>Price : Low-High</MenuItem>
               <MenuItem value={'High-Low'}>Price : High-Low</MenuItem>
            </Select>
         </FormControl>
      </div>
   );
}

export default ShopSelect;
