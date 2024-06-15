import { useCallback, useState } from 'react'
import { defaults /* , initialCountDown */ } from '../constants/excersizeCons'

export default function useExcersizeTimers() {
    const [data, setData] = useState(defaults)
    // const [countDown, setCountDown] = useState(initialCountDown)

    const handleChange = useCallback((value, name, id) => {
        setData(prev => {
            return prev.map(el => {
                if (el.id === id) {
                    return {
                        ...el,
                        [name]: value,
                    }
                } else {
                    return el
                }
            })
        })
    }, [])

    const handleMoveUp = useCallback(id => {
        setData(prev => {
            const itemToMove = prev.find(el => el.id === id)
            if (itemToMove) {
                const newOrder = itemToMove.order - 1
                const aboveItem = prev.find(item => item.order === newOrder)
                if (aboveItem) {
                    return prev.map(el => {
                        if (el.id === id) {
                            return {
                                ...el,
                                order: newOrder,
                            }
                        } else if (el.id === aboveItem.id) {
                            return {
                                ...el,
                                order: itemToMove.order,
                            }
                        }
                        return el
                    })
                }
            }
            return prev
        })
    }, [])

    const handleMoveDown = useCallback(id => {
        setData(prev => {
            return prev
                .map(el => {
                    if (el.id === id) {
                        return {
                            ...el,
                            order: el.order + 1,
                        }
                    } else if (el.id === id + 1) {
                        return {
                            ...el,
                            order: el.order - 1,
                        }
                    } else {
                        return el
                    }
                })
                .sort((a, b) => a.order - b.order)
        })
    }, [])

    const start = useCallback(() => {}, [])

    const stop = useCallback(() => {}, [])

    const reset = useCallback(() => {}, [])

    return [data, handleChange, handleMoveUp, handleMoveDown, start, stop, reset]
}
