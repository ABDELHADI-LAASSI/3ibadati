import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ApplicationStateContext = createContext({
    tafsirAyah: '',
    setTafsirAya : () => {},
    currentSorah : 1,
    setCurrentSorah : () => {}
});

export function ApplicationContext({ children }) {
    
    const [tafsirAyah , setTafsirAya] = useState()
    const [currentSorah , setCurrentSorah] = useState(1)







    return (
        <ApplicationStateContext.Provider value={{
        
            //  define states here to be used in components and functions

            tafsirAyah,
            setTafsirAya,

            currentSorah,
            setCurrentSorah

        }}>
            {children}
        </ApplicationStateContext.Provider>
    );
};

export const useApplication = () => {
    return useContext(ApplicationStateContext);
}

