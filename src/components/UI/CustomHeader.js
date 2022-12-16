import React from 'react';
import { Box, Typography } from '@mui/material';
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme, useMediaQuery } from '@mui/material';
import { uiActions } from '../../store/ui-slice';
import SelectMenu from './SelectMenu';
import CustomHeaderText from './CustomHeaderText';

const CustomHeader = ({ text, filter, selectMenu, fontSize }) => {
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
            marginBottom: '2rem',
            [theme.breakpoints.down('xl')]: {
               marginTop: '4rem',
               marginBottom: '1.75rem'
            },
            [theme.breakpoints.down('lg')]: {
               marginTop: '3rem',
               marginBottom: '1.5rem'
            },
            [theme.breakpoints.down('md')]: {
               marginTop: '2rem',
               marginBottom: '1.25rem'
            },
            [theme.breakpoints.down('sm')]: {
               marginTop: '1.5rem'
            },
            [theme.breakpoints.down(450)]: {
               flexDirection: 'column',
               alignItems: 'flex-start',
               rowGap: (filter || selectMenu) && '18px',
               marginBottom: (filter || selectMenu) ? '1.5rem' : '1.25rem'
            }
         })}
      >
         <CustomHeaderText text={text} fontSize={fontSize} />
         <Box
            sx={theme => ({
               display: 'flex',
               alignItems: 'center',
               columnGap: '1.5rem',
               cursor: 'pointer',
               [theme.breakpoints.down('sm')]: {
                  columnGap: '1rem'
               },
               [theme.breakpoints.down(350)]: {
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  rowGap: '18px'
               }
            })}
         >
            {
               filter &&
               (
                  !mdWidth && (
                     <Typography
                        onClick={() => dispatch(uiActions.toggleFilter())}
                        sx={{
                           display: 'flex',
                           alignItems: 'center',
                           columnGap: '5px',
                           fontSize: '16px',
                           fontWeight: 500
                        }}
                     >
                        {showFilter ? 'Hide' : 'Show'} Filters <FilterListOutlinedIcon />
                     </Typography>
                  )
               )
            }
            {
               filter &&
               (
                  mdWidth && (
                     <Typography
                        onClick={() => dispatch(uiActions.toggleModalFilter())}
                        sx={{
                           display: 'flex',
                           alignItems: 'center',
                           columnGap: '5px',
                           fontSize: '16px',
                           fontWeight: 500
                        }}
                     >
                        Filters <FilterListOutlinedIcon />
                     </Typography>
                  )
               )
            }
            {
               selectMenu &&
               <SelectMenu />
            }
         </Box>
      </Box >
   );
};

export default CustomHeader;