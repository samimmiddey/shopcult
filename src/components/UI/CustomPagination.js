import React from 'react';
import { Stack, Pagination } from '@mui/material';

const CustomPagination = ({ pageNumbers, paginate, currPage }) => {
   return (
      <Stack sx={{ marginTop: '2rem' }} spacing={2}>
         <Pagination
            page={parseInt(currPage) === 1 ? 1 : parseInt(currPage)}
            onChange={(event, page) => {
               paginate(page);
            }}
            count={pageNumbers}
            variant="outlined"
            shape="rounded"
            color='secondary'
         />
      </Stack>
   );
};

export default CustomPagination;