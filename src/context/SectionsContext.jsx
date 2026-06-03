import { createContext, useContext, useEffect, useState } from "react";

const SectionsContext = createContext(null);

export function SectionsProvider({ children }) {

    const [sections, setSections] = useState(localStorage.getItem('sections') ? JSON.parse(localStorage.getItem('sections')) : [
        {
            id: '09329akjsusa9823nm820skme9809',
            title: 'Secondary',
            status: 'active',
            date: '2025-08-28'
        },
        {
            id: 'ksuiw7832n139n4298f032ndk4230',
            title: 'Primary',
            status: 'active',
            date: '2025-08-28'
        },
        {
            id: 'jskwq8723nj9sa89adsds2jj43jj3',
            title: 'Nursery',
            status: 'active',
            date: '2025-08-28'
        }
    ]);

    useEffect(() => {
        localStorage.setItem('sections', JSON.stringify(sections));
    }, [sections]);

    return (
        <SectionsContext.Provider value={{ sections, setSections }}>{children}</SectionsContext.Provider>
    )
}

export function useSections() {
    return useContext(SectionsContext);
}