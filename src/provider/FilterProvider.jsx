import React, { createContext, useContext, useState } from 'react';

const FilterContext = createContext();

export function FilterProvider({children}){
    const [country, setCountry] = useState("")
    const [category, setCategory] = useState("")
    const [fromDate, setFromDate] = useState("")
    const [toDate, setToDate] = useState("")


    return ( <FilterContext.Provider value={{country,category,setCountry,setCategory,setToDate,toDate,fromDate,setFromDate}}>
        {children}
    </FilterContext.Provider>);
}

export function useFilterContext(){
    return useContext(FilterContext);
}

