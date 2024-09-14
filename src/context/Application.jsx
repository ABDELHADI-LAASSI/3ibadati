import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ApplicationStateContext = createContext({
    tafsirAyah: '',
    setTafsirAya : () => {},
});

export function ApplicationContext({ children }) {
    
    const [tafsirAyah , setTafsirAya] = useState()







    return (
        <ApplicationStateContext.Provider value={{
        
            //  define states here to be used in components and functions

            tafsirAyah,
            setTafsirAya

        }}>
            {children}
        </ApplicationStateContext.Provider>
    );
};

export const useApplication = () => {
    return useContext(ApplicationStateContext);
}

