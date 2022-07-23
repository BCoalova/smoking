import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth'
import { createContext, useContext, useEffect, useState } from 'react'
import useDarkMode from '../hooks/useDarkMode'

import { doc, onSnapshot, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore'
import { auth, db, googleSignIn } from '../firebase'
import useBoolean from '../hooks/useBoolean'

import addDays from 'date-fns/addDays'
import format from 'date-fns/format'
import subDays from 'date-fns/subDays'

const globalContext = createContext()

const { Provider } = globalContext

const useGlobalContext = () => {
    return useContext(globalContext)
}

const GlobalProvider = ({ children }) => {
    const [isLight] = useDarkMode(false)
    const [currentUser, setCurrentUser] = useState(null)
    const [loadingUser, loadingFalse] = useBoolean(true)
    const [userData, setUserData] = useState(null)
    const [viewing, setViewing] = useState(null)

    /* Log in user with gmail */
    const login = () => signInWithPopup(googleSignIn.auth, googleSignIn.googleProvider)

    /* Log out */
    const logOut = () => signOut(googleSignIn.auth)

    /* log in observer (triggers ) */
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user) {
                setCurrentUser(user)
            } else {
                setCurrentUser(null)
            }
            loadingFalse()
        })
        return () => {
            unsubscribe()
        }
    }, [loadingFalse])

    /* GET OR CREATE USER DATABASE INFO */
    useEffect(() => {
        if (!currentUser) return
        let todayString = format(new Date(), 'dd-MM-YYY')
        let dataDotDay = `data.${todayString}`

        let document = doc(db, 'users', currentUser.uid)

        const unsub = onSnapshot(document, doc => {
            if (doc.data()) {
                if (!doc.data().data[todayString]) {
                    ;(async () => {
                        await updateDoc(document, {
                            [dataDotDay]: {
                                count: 0,
                                dayObjective: 0,
                                day: todayString,
                            },
                        })
                    })()
                }
                setUserData(doc.data())
            } else {
                // doc.data() will be undefined in this case
                let todayString = format(new Date(), 'dd-MM-yyyy')
                ;(async () =>
                    await setDoc(document, {
                        createdTime: serverTimestamp(),
                        currentObjective: 0,
                        data: {
                            [todayString]: {
                                count: 0,
                                dayObjective: 0,
                                day: todayString,
                            },
                        },
                        name: currentUser.displayName,
                        email: currentUser.email,
                    }))()
            }
        })

        return () => unsub()
    }, [currentUser])

    /* SET VIEWING INFO FOR FIRST TIME ENTERING THE APP */
    useEffect(() => {
        if (!currentUser) return
        if (!userData) return

        let todayString = format(new Date(), 'dd-MM-YYY')

        if (viewing) return

        setViewing(userData.data[todayString])
    }, [currentUser, userData, viewing])

    /* ADD ONE DAY, AND CHANGE VIEWING TO THAT DATE */
    const addAndChangeViewingDay = async current => {
        console.log('entrando en la función')
        console.log('current')
        console.log(current)
        let currentWithSlash = current.split('-').reverse().join('/')
        console.log('despues de let currentWithSlash = current.split("-").reverse()')
        console.log('currentWithSlash')
        console.log(currentWithSlash)
        let plusOneDay = addDays(new Date(currentWithSlash), 1)
        console.log('despues de let plusOneDay = addDays(new Date(currentWithSlash), 1)')
        console.log('plusOneDay')
        console.log(plusOneDay)
        let formatedPlusOneDay = format(plusOneDay, 'dd-MM-yyyy')
        console.log('despues de let formatedPlusOneDay = format(plusOneDay, dd-MM-yyyy)')
        console.log('formatedPlusOneDay')
        console.log(formatedPlusOneDay)

        if (userData.data[formatedPlusOneDay]) {
            console.log('adentro del if')
            console.log('userData.data[formatedPlusOneDay]')
            console.log(userData.data[formatedPlusOneDay])
            return setViewing(userData.data[formatedPlusOneDay])
        }

        let document = doc(db, 'users', currentUser.uid)
        let dataDotDay = `data.${formatedPlusOneDay}`
        console.log('afuera del if')
        console.log('dataDotDay')
        console.log(dataDotDay)

        setViewing({
            count: 0,
            dayObjective: 0,
            day: formatedPlusOneDay,
        })

        try {
            await updateDoc(document, {
                [dataDotDay]: {
                    count: 0,
                    dayObjective: 0,
                    day: formatedPlusOneDay,
                },
            })
        } catch (err) {
            // eslint-disable-next-line no-undef
            console.log(err)
        }
    }

    /* SUBSTRACT ONE DAY, AND CHANGE VIEWING TO THAT DATE */
    const removeAndChangeViewingDay = async current => {
        console.log('entrando en la función')
        console.log('current')
        console.log(current)
        let currentWithSlash = current.split('-').reverse().join('/')
        console.log('despues de let currentWithSlash = current.split("-").reverse()')
        console.log('currentWithSlash')
        console.log(currentWithSlash)
        let subOneDay = subDays(new Date(currentWithSlash), 1)
        console.log('despues de let subOneDay = subDays(new Date(currentWithSlash), 1)')
        console.log('subOneDay')
        console.log(subOneDay)
        let formatedPlusOneDay = format(subOneDay, 'dd-MM-yyyy')
        console.log('despues de let formatedPlusOneDay = format(subOneDay, "dd-MM-yyyy")')
        console.log('formatedPlusOneDay')
        console.log(formatedPlusOneDay)
        setViewing(userData.data[formatedPlusOneDay])
    }

    const setDayObjective = async (value, day) => {
        let dataDotDay = `data.${day}.dayObjective`

        let document = doc(db, 'users', currentUser.uid)

        try {
            await updateDoc(document, {
                [dataDotDay]: parseInt(value),
            })
        } catch (err) {
            // eslint-disable-next-line no-undef
            console.log(err)
        }

        setViewing(current => ({ ...current, dayObjective: parseInt(value) }))
    }

    /* ADD A CIGARETTE SMOKE */
    const addCigarette = async current => {
        let day = current.day
        let count = current.count
        let dataDotDay = `data.${day}.count`

        let document = doc(db, 'users', currentUser.uid)
        try {
            await updateDoc(document, {
                [dataDotDay]: count + 1,
            })
        } catch (err) {
            // eslint-disable-next-line no-undef
            console.log(err)
        }

        setViewing(current => ({ ...current, count: current.count + 1 }))
    }

    const value = {
        userData,
        isLight,
        login,
        logOut,
        currentUser,
        loadingUser,
        viewing,

        setDayObjective,
        addCigarette,

        addAndChangeViewingDay,
        removeAndChangeViewingDay,
    }

    return <Provider value={value}>{children}</Provider>
}

export { useGlobalContext }
export default GlobalProvider
