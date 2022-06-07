import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Checkbox, FormControlLabel } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../store/ui-slice';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const FilterAccordion = ({ title, products }) => {
   const selectedItems = useSelector(state => state.ui.selectedItems);
   const dispatch = useDispatch();

   const { id } = useParams();
   const history = useHistory();

   const handleChange = (event) => {
      if(id === 'search') {
         history.push('/shop/all');
      }
      dispatch(uiActions.setSelectedItems({
         type: event.target.checked,
         name: event.target.name
      }));

      const arr = JSON.parse(localStorage.getItem('selectedItems')) || [];
      if (event.target.checked) {
         if (!arr.length) {
            arr.push(event.target.name);
            localStorage.setItem('selectedItems', JSON.stringify(arr));
         } else {
            if (!arr.includes(event.target.name)) {
               arr.push(event.target.name);
               localStorage.setItem('selectedItems', JSON.stringify(arr));
            }
         }
      } else {
         const newArr = arr.filter(name => name !== event.target.name);
         localStorage.setItem('selectedItems', JSON.stringify(newArr));
      }
   };

   return (
      <div
         style={{
            width: '100%',
            borderBottom: '1px solid #eceff1'
         }}
      >
         <Accordion
            defaultExpanded={true}
            elevation={0}
            sx={{
               width: '100%',
               background: 'none',
            }}>
            <AccordionSummary
               expandIcon={<ExpandMoreIcon sx={{ color: 'text.secondary' }} />}
            >
               <Typography
                  sx={{
                     fontWeight: 600,
                     fontSize: '1.05rem',
                     padding: 0
                  }}
                  variant='h6'
               >
                  {title}
               </Typography>
            </AccordionSummary>
            <AccordionDetails
               sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  rowGap: '5px'
               }}
            >
               {products.map((product, index) => (
                  <FormControlLabel
                     key={index}
                     control={
                        <Checkbox
                           size='small'
                           onClick={() => localStorage.setItem('currentPage', 1)}
                           onChange={handleChange}
                           name={product.name}
                           checked={
                              selectedItems.indexOf(product.name) !== -1
                                 ? true
                                 : false
                           }
                           sx={{
                              '&.Mui-checked': {
                                 color: 'rgb(90, 57, 161)',
                              },
                           }}
                        />
                     }
                     label={product.name}
                  />
               ))}
            </AccordionDetails>
         </Accordion>
      </div>
   );
}

export default FilterAccordion;
