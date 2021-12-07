import React, { useContext, useState, useEffect } from 'react'
import app, { auth } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@firebase/auth'


const AuthContext = React.createContext()

//zugriff auf AuthContext
export function useAuth() {
    return useContext(AuthContext)
}


//Wir verwendet um den Code mit dem Context zu umhüllen und gleichzeitig Funktionen zu integrieren. Diese Funktionen geben uns den User
export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function signin(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    function signOut() {
        return auth.signOut()
    }

    //damit der User nur ein mal beim mount gesetzt wird
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    }, [])

    const value = {
        currentUser,
        signin,
        signup,
        signOut
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}