import { useState } from 'react'

const useBoolean = (initial = false) => {
    const [value, setValue] = useState(initial)

    const makeFalse = () => setValue(false)

    const makeTrue = () => setValue(true)

    const toggle = () => setValue(prevState => !prevState)

    const reset = () => setValue(initial)

    return [value, makeFalse, makeTrue, toggle, reset]
}

export default useBoolean
