/* eslint-disable no-undef */
import { useCallback, useEffect, useRef, useState } from 'react'
import { defaults /* , initialCountDown */, initialCountDownData, status } from '../constants/excersizeCons'
import alarm from '../assets/alarm.mp3'

export default function useExcersizeTimers() {
    const audioRef = useRef(new Audio(alarm))
    const [data, setData] = useState(defaults)
    const [countDownData, setCountDownData] = useState(initialCountDownData)
    const [countDown, setCountDown] = useState(0)

    const intervalRef = useRef()

    const handleChange = useCallback((value, name, id) => {
        // eslint-disable-next-line no-undef
        // console.log('value, name, id => ', value, name, id)
        setData(prev => {
            return prev.map(el => {
                if (el.id === id) {
                    // eslint-disable-next-line no-undef
                    console.log('value, name, id => ', value, name, id, el)
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

    const start = useCallback(paramData => {
        setCountDownData(curr => {
            const minutes = parseInt(paramData[curr.currentStep].minutes) * 60
            const seconds = parseInt(paramData[curr.currentStep].seconds)

            setCountDown(minutes + seconds)

            return { ...curr, time: minutes + seconds, status: status.RUNNING, currentStep: 0 }
        })
    }, [])

    useEffect(() => {
        if (countDownData.status === status.RUNNING && countDown === 3) {
            audioRef.current.play()
        } else if (countDownData.status === status.RUNNING && countDown === 0) {
            audioRef.current.pause()
        }

        if (countDown === 0 && countDownData.status !== status.RUNNING) return

        if (countDown === 0 && countDownData.status === status.RUNNING) {
            if (countDownData.currentStep === 2) {
                setCountDownData(curr => {
                    return { ...curr, status: status.READY, currentStep: 0 }
                })
                clearInterval(intervalRef.current)
                setCountDown(0)
                return
            }

            setTimeout(() => {
                // eslint-disable-next-line no-undef
                clearInterval(intervalRef.current)
                setCountDownData(curr => {
                    const minutes = parseInt(data[curr.currentStep + 1].minutes) * 60
                    const seconds = parseInt(data[curr.currentStep + 1].seconds)

                    setCountDown(minutes + seconds)

                    return { ...curr, time: minutes + seconds, status: status.RUNNING, currentStep: curr.currentStep + 1 }
                })
            }, 1000)
        }

        intervalRef.current = setInterval(() => {
            setCountDown(prev => prev - 1)
        }, 1000)

        return () => clearInterval(intervalRef.current)
    }, [countDown, countDownData, data])

    const stop = useCallback(() => {
        setCountDownData(curr => {
            return { ...curr, status: status.READY, currentStep: 0 }
        })

        setCountDown(0)
    }, [])

    const reset = useCallback(() => {
        setCountDownData(curr => {
            const minutes = parseInt(data[0].minutes) * 60
            const seconds = parseInt(data[0].seconds)

            setCountDown(minutes + seconds)

            return { ...curr, time: minutes + seconds, status: status.RUNNING, currentStep: 0 }
        })
    }, [data])

    return [data, handleChange, handleMoveUp, handleMoveDown, start, stop, reset, countDown, countDownData]
}
