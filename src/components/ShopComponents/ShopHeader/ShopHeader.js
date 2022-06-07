import { Box, Typography } from '@mui/material';
import React from 'react';
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import ShopSelect from '../../UI/ShopSelect';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../../store/ui-slice';
import { useTheme, useMediaQuery } from '@mui/material';

const ShopHeader = () => {
   const dispatch = useDispatch();
   const showFilter = useSelector(state => state.ui.showFilter);

   const theme = useTheme();
   const mdWidth = useMediaQuery(theme.breakpoints.down('md'));

   return (
      <Box
         sx={theme => ({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '5rem',
            [theme.breakpoints.down('xl')]: {
               marginTop: '4rem'
            },
            [theme.breakpoints.down('lg')]: {
               marginTop: '3rem'
            },
            [theme.breakpoints.down('md')]: {
               marginTop: '2rem'
            },
            [theme.breakpoints.down(450)]: {
               flexDirection: 'column',
               alignItems: 'flex-start',
               rowGap: '10px'
            }
         })}
      >
         <Typography variant='h4'
            sx={theme => ({
               fontWeight: 700,
               [theme.breakpoints.down('lg')]: {
                  fontSize: '2rem'
               },
               [theme.breakpoints.down('md')]: {
                  fontSize: '1.5rem'
               },
               [theme.breakpoints.down('sm')]: {
                  fontSize: '1.3rem'
               },
               [theme.breakpoints.down(400)]: {
                  fontSize: '1.2rem'
               }
            })}>
            Products
         </Typography>
         <Box
            sx={theme => ({
               display: 'flex',
               alignItems: 'center',
               columnGap: '1.5rem',
               cursor: 'pointer',
               [theme.breakpoints.down(350)]: {
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  rowGap: '5px',
                  marginTop: '10px'
               }
            })}
         >
            {!mdWidth && (
               <Typography
                  onClick={() => dispatch(uiActions.toggleFilter())}
                  sx={{
                     display: 'flex',
                     alignItems: 'center',
                     columnGap: '5px'
                  }}>
                  {showFilter ? 'Hide' : 'Show'} Filters <FilterListOutlinedIcon />
               </Typography>
            )}
            {
               mdWidth && (
                  <Typography
                     onClick={() => dispatch(uiActions.toggleModalFilter())}
                     sx={{
                        display: 'flex',
                        alignItems: 'center',
                        columnGap: '5px'
                     }}>
                     Filters <FilterListOutlinedIcon />
                  </Typography>
               )
            }
            <ShopSelect />
         </Box>
      </Box>
   );
};

export default ShopHeader;