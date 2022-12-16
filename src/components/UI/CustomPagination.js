import React from 'react';
import { Stack, Pagination } from '@mui/material';

const CustomPagination = ({ pageNumbers, paginate, currentPage }) => {
   return (
      <Stack sx={{ marginTop: '2rem' }} spacing={2}>
         <Pagination
            page={currentPage}
            onChange={(event, page) => {
               paginate(page);
            }}
            count={pageNumbers}
            variant='outlined'
            shape='rounded'
            color='primary'
         />
      </Stack>
   );
};

export default CustomPagination;