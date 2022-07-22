import { useMediaQuery } from '@mui/material'
import { useEffect } from 'react'
import useBoolean from './useBoolean'

function useDarkMode(initialState = true) {
    const [isLight, makeDark, makeLight, toggle] = useBoolean(initialState)
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

    useEffect(() => {
        if (prefersDarkMode) return makeDark()
        return makeLight()
    }, [prefersDarkMode, makeDark, makeLight])

    return [isLight, makeDark, makeLight, toggle]
}

export default useDarkMode
