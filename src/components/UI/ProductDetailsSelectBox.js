import React from 'react';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const ProductDetailsSelectBox = () => {
   const [age, setAge] = React.useState('');

   const handleChange = (event) => {
      setAge(event.target.value);
   };

   return (
      <div>
         <FormControl
            sx={{
               minWidth: 120,
            }}
         >
            <Select
               value={age}
               onChange={handleChange}
               displayEmpty
               inputProps={{ 'aria-label': 'Without label' }}
               sx={theme => ({
                  '.MuiOutlinedInput-notchedOutline': {
                     borderColor: 'rgb(132, 76, 196)',
                     borderWidth: '1px',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                     borderColor: 'rgb(90, 57, 161)',
                     borderWidth: '1px'
                  },
                  height: '50px',
                  [theme.breakpoints.down('sm')]: {
                     height: '45px'
                  }
               })}
            >
               <MenuItem value="">None</MenuItem>
               <MenuItem value={10}>1</MenuItem>
               <MenuItem value={20}>2</MenuItem>
               <MenuItem value={30}>3</MenuItem>
               <MenuItem value={30}>4</MenuItem>
               <MenuItem value={30}>5</MenuItem>
               <MenuItem value={30}>6</MenuItem>
               <MenuItem value={30}>7</MenuItem>
               <MenuItem value={30}>8</MenuItem>
            </Select>
         </FormControl>
      </div >
   );
}

export default ProductDetailsSelectBox;