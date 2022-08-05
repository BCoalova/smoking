import { useEffect, useState } from 'react'

export default function useStopWatch() {
    const [isActive, setIsActive] = useState(false)
    const [isPaused, setIsPaused] = useState(true)
    const [time, setTime] = useState({ timeNow: 0 })

    useEffect(() => {
        let interval = null

        if (isActive && isPaused === false) {
            // eslint-disable-next-line no-undef
            interval = setInterval(() => {
                setTime(time => {
                    let timeNowNew = time.timeNow + 10
                    let hundredthsOfASeconds = ('0' + ((timeNowNew / 10) % 100)).slice(-2)
                    let seconds = Math.floor(timeNowNew / 1000)
                    let minutes = Math.floor(seconds / 60)
                    let hours = Math.floor(minutes / 60)
                    return {
                        timeNow: timeNowNew,
                        hundredthsOfASeconds: hundredthsOfASeconds,
                        seconds: seconds.toString().padStart(2, '0'),
                        minutes: minutes.toString().padStart(2, '0'),
                        hours: hours.toString().padStart(2, '0'),
                    }
                })
            }, 10)
        } else {
            // eslint-disable-next-line no-undef
            clearInterval(interval)
        }
        // eslint-disable-next-line no-undef
        return () => clearInterval(interval)
    }, [isActive, isPaused])

    const handleStart = () => {
        setIsActive(true)
        setIsPaused(false)
    }

    const handlePauseResume = () => {
        setIsPaused(!isPaused)
    }

    const handleReset = () => {
        if (!isPaused) return setIsPaused(true)
        setIsActive(false)
        setTime({ timeNow: 0 })
    }

    return [time, handleStart, handlePauseResume, handleReset, isActive, isPaused]
}
