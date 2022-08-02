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
    const logOut = () => {
        setViewing(null)
        setUserData(null)
        signOut(googleSignIn.auth)
    }

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

        let document = doc(db, 'users', currentUser.uid)

        const unsub = onSnapshot(document, doc => {
            let todayString = format(new Date(), 'dd-MM-YYY')
            let dataDotDay = `data.${todayString}`
            if (doc.data()) {
                if (doc.data().data[todayString] == undefined) {
                    // Existe en db pero no registra día de hoy
                    ;(async () => {
                        await updateDoc(document, {
                            [dataDotDay]: {
                                count: 0,
                                dayObjective: 0,
                                day: todayString,
                            },
                        })
                    })()
                    return
                }
                setUserData(doc.data())
                return
            }
            if (!doc.data()) {
                ;(async () => {
                    let docData = {
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
                    }
                    try {
                        await setDoc(document, {
                            createdTime: serverTimestamp(),
                            ...docData,
                        })
                    } catch (err) {
                        // eslint-disable-next-line no-undef
                        console.log('err get data when none existed => ', err)
                    }
                })()
            }
        })

        return () => unsub()
    }, [currentUser])

    /* SET VIEWING INFO FOR FIRST TIME ENTERING THE APP */
    useEffect(() => {
        if (!currentUser) return
        if (!userData) return
        if (viewing) return

        let todayString = format(new Date(), 'dd-MM-YYY')

        if (!userData.data[todayString]) return

        setViewing(todayString)
    }, [currentUser, userData, viewing])

    /* ADD ONE DAY, AND CHANGE VIEWING TO THAT DATE */
    const addAndChangeViewingDay = async current => {
        let currentWithSlash = current.split('-').reverse().join('/')
        let plusOneDay = addDays(new Date(currentWithSlash), 1)
        let formatedPlusOneDay = format(plusOneDay, 'dd-MM-yyyy')

        if (userData.data[formatedPlusOneDay]) {
            return setViewing(formatedPlusOneDay)
        }

        let document = doc(db, 'users', currentUser.uid)
        let dataDotDay = `data.${formatedPlusOneDay}`

        setViewing(formatedPlusOneDay)

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
        let currentWithSlash = current.split('-').reverse().join('/')
        let subOneDay = subDays(new Date(currentWithSlash), 1)
        let formatedSubOneDay = format(subOneDay, 'dd-MM-yyyy')
        if (!userData.data[formatedSubOneDay]) {
            let docDate = `data.${formatedSubOneDay}`
            let document = doc(db, 'users', currentUser.uid)
            ;(async () => {
                await updateDoc(document, {
                    [docDate]: {
                        count: 0,
                        dayObjective: 0,
                        day: formatedSubOneDay,
                    },
                })
            })()
        }
        setViewing(formatedSubOneDay)
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
    }

    const removeCigarette = async current => {
        let day = current.day
        let count = current.count
        let dataDotDay = `data.${day}.count`

        let document = doc(db, 'users', currentUser.uid)
        try {
            await updateDoc(document, {
                [dataDotDay]: count - 1,
            })
        } catch (err) {
            // eslint-disable-next-line no-undef
            console.log(err)
        }
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
        removeCigarette,

        addAndChangeViewingDay,
        removeAndChangeViewingDay,
    }

    return <Provider value={value}>{children}</Provider>
}

export { useGlobalContext }
export default GlobalProvider
