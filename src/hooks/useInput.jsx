import { useCallback, useState } from 'react'

export default function useInput(initial = '') {
    const [value, setValue] = useState(initial)

    const bind = {
        value,
        onChange: e => setValue(e.target.value),
    }

    const reset = useCallback(() => setValue(initial), [initial])

    const setFN = useCallback(incomingValue => setValue(incomingValue), [])

    return [value, bind, reset, setFN]
}
