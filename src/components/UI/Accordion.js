import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const CustomizedAccordion = ({ title, list }) => {
   return (
      <div
         style={{
            width: '100%'
         }}
      >
         <Accordion
            elevation={0}
            sx={{
               width: '100%',
               color: 'rgb(196, 174, 243)',
               background: 'none',
               border: '1px solid #9666cc',
            }}>
            <AccordionSummary
               expandIcon={<ExpandMoreIcon sx={{ color: 'rgb(196, 174, 243)' }} />}
            >
               <Typography
                  sx={{
                     fontWeight: 600,
                     fontSize: '1.05rem'
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
                  rowGap: '8px'
               }}
            >
               {list.map((item, index) => (
                  <Typography key={index}>
                     {item}
                  </Typography>
               ))}
            </AccordionDetails>
         </Accordion>
      </div>
   );
}

export default CustomizedAccordion;
