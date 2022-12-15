import React, { useEffect, useRef, useState } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import SearchBar from './SearchBar';
import { useSelector } from 'react-redux';
import SearchBarSmall from './SearchBarSmall';
import { useHistory } from 'react-router-dom';

const SearchComponents = () => {
   const [value, setValue] = useState('');
   const [submitted, setSubmitted] = useState(false);
   const [terms, setTerms] = useState([]);

   const activeSearch = useSelector(state => state.ui.activeSearch);

   const ref = useRef();

   const history = useHistory();

   const theme = useTheme();
   const mdWidth = useMediaQuery(theme.breakpoints.down('md'));

   // Retreieve search terms from local storage
   useEffect(() => {
      setTerms(JSON.parse(localStorage.getItem('searchTerms')));
   }, []);

   // Handle form submission
   const handleSearch = e => {
      e.preventDefault();
      ref.current.blur();

      if (ref.current.value.trim() !== '') {
         const enteredValue = ref.current.value;
         const terms = JSON.parse(localStorage.getItem('searchTerms'));
         setSubmitted(true);

         if (terms) {
            let newArr;
            if (terms.length === 10) {
               if (terms.includes(enteredValue)) {
                  const arr = terms.filter(item => item !== enteredValue);
                  newArr = [enteredValue, ...arr];
               } else {
                  terms.pop();
                  newArr = [enteredValue, ...terms];
               }
            } else {
               if (terms.length < 10 && !terms.includes(enteredValue)) {
                  newArr = [enteredValue, ...terms];
               } else {
                  const arr = terms.filter(item => item !== enteredValue);
                  newArr = [enteredValue, ...arr];
               }
            }
            setTerms(newArr);
            localStorage.setItem('searchTerms', JSON.stringify(newArr));
         } else {
            setTerms([enteredValue]);
            localStorage.setItem('searchTerms', JSON.stringify([enteredValue]));
         }

         history.push(`/search/${enteredValue}`);
      }
   };

   const handleChange = e => {
      setValue(e.target.value.toLowerCase());
   }

   return (
      <>
         {
            !mdWidth &&
            <SearchBar
               value={value}
               setValue={setValue}
               submitted={submitted}
               setSubmitted={setSubmitted}
               terms={terms}
               setTerms={setTerms}
               handleSearch={handleSearch}
               handleChange={handleChange}
               ref={ref}
            />
         }
         {
            activeSearch &&
            <SearchBarSmall
               value={value}
               setValue={setValue}
               submitted={submitted}
               setSubmitted={setSubmitted}
               terms={terms}
               setTerms={setTerms}
               handleSearch={handleSearch}
               handleChange={handleChange}
               ref={ref}
            />
         }
      </>
   );
};

export default SearchComponents;