import React, { createContext, useState } from 'react';

const SearchContext = createContext();

const MyContextProvider = ({children}) => {
    const [travelDetails, setTravelDetails] = useState({
        fromStation: '',
        toStation: '',
        travelDate: '',
    });

    const updateTravelDetails = (details) => {
        setTravelDetails((prevDetails) => ({
            ...prevDetails,
            ...details,
        }));
    };

    const [loggedUserData, setLoggedUser] = useState({});

    const updateLoggedUserData = (user) => {
        setLoggedUser(user);
    }
    return (
        <SearchContext.Provider value={{ travelDetails, updateTravelDetails,loggedUserData,updateLoggedUserData }}>
            {children}
        </SearchContext.Provider>
    );
};

export { SearchContext, MyContextProvider };