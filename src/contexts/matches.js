import { useState, createContext, useEffect } from 'react';

export const MatchesContext = createContext({});

export default function MatchesProvider({ children }) {
    const [matches, setMatches] = useState([]);
    const [loadingMatches, setLoadingMatches] = useState(false);

    useEffect(() => {

        

    }, [])

    return (
        <MatchesContext.Provider 
            value={{
                matches,
                loadingMatches
            }}
        >
            {children}
        </MatchesContext.Provider>
    );
}