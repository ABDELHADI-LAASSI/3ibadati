import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ApplicationStateContext = createContext({
    testVar: 'test',
});

export function ApplicationContext({ children }) {
    // functions
    const [testVar, setTestVar] = useState('test');


    return (
        <ApplicationStateContext.Provider value={{
        
            //  define states here to be used in components and functions

            testVar,
            setTestVar

        }}>
            {children}
        </ApplicationStateContext.Provider>
    );
};

export const useApplication = () => {
    return useContext(ApplicationStateContext);
}

