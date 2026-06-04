import { createContext, useContext, useEffect, useState } from "react";

const ProgramsContext = createContext(null);

export function ProgramsProvider({ children }) {

    const [programs, setPrograms] = useState(localStorage.getItem('programs') ? JSON.parse(localStorage.getItem('programs')) : [
        {
            id: '09329akjsusa9823nm820skme9809',
            title: 'Art',
            status: 'active',
            date: '2025-08-28'
        },
        {
            id: 'ksuiw7832n139n4298f032ndk4230',
            title: 'General',
            status: 'active',
            date: '2025-08-28'
        },
        {
            id: 'jskwq8723nj9sa89adsds2jj43jj3',
            title: 'Science',
            status: 'active',
            date: '2025-08-28'
        }
    ]);

    useEffect(() => {
        localStorage.setItem('programs', JSON.stringify(programs));
    }, [programs]);

    return (
        <ProgramsContext.Provider value={{ programs, setPrograms }}>{children}</ProgramsContext.Provider>
    )
}

export function usePrograms() {
    return useContext(ProgramsContext);
}