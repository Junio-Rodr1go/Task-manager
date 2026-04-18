
import { createContext, useContext, useState } from "react";

export const SearchTextcontext = createContext();

export default function SearchProvider({ children }) {
    const [SearchText, setSearchText] = useState('');
    const [Done, setDone] = useState([]);

    return (
        <SearchTextcontext.Provider value={{ Done, setDone, SearchText, setSearchText }}>
            {children}
        </SearchTextcontext.Provider>
    );
}

export const useSearch = () => useContext(SearchTextcontext);
