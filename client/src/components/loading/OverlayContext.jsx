import { createContext, useContext, useState } from 'react';

// Create a context with default value false
const OverlayContext = createContext({
    isOverlayVisible: false,
    setOverlayVisible: () => {}
})

export const useOverlay = () => useContext(OverlayContext)

export const OverlayProvider = ({ children }) => {
    const [isOverlayVisible, setOverlayVisible] = useState(false)

    const values = {
        isOverlayVisible: isOverlayVisible,
        setOverlayVisible: setOverlayVisible
    }

    return (
        <OverlayContext.Provider value={values}>
            {children}
        </OverlayContext.Provider>
    )
}