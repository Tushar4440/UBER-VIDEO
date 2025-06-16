import React, {useEffect, createContext, useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom'


export const CaptainDataContext = createContext();

// export const useCaptain = ()=>{
//     const context = useContext(CaptainContext);
//     if(!context){
//         throw new Error('useCaptain must be within a captain provider');
//     }
//     return context;
// }


const CaptainContext = ({ children }) => {
    const [captain, setCaptain] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateCaptain = (captainData) => {
        setCaptain(captainData);
    };
    const value = {
        captain,
        setCaptain,
        updateCaptain,
        isLoading,
        setIsLoading,
        error,
        setError
    };

    return (
        <div>
            <CaptainDataContext.Provider value={value}>
                {children}
            </CaptainDataContext.Provider>
        </div>
    )
}

export default CaptainContext