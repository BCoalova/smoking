import { useEffect, useRef } from 'react'

export default function useWakeLock() {
    const wakeLockRef = useRef()

    const requestWakeLock = async () => {
        try {
            // eslint-disable-next-line no-undef
            const lock = await navigator.wakeLock.request('screen')
            wakeLockRef.current = lock
        } catch (err) {
            // eslint-disable-next-line no-undef
            console.log(err)
        }
    }

    const releaseWakeLock = async () => {
        try {
            await wakeLockRef.current.release()
        } catch (err) {
            // eslint-disable-next-line no-undef
            console.log(err)
        }
    }

    useEffect(() => {
        requestWakeLock()
    }, [])

    return { releaseWakeLock }
}
