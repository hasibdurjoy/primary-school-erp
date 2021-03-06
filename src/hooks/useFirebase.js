import { useEffect, useState } from 'react';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    getIdToken,
    onAuthStateChanged,
    updateProfile,
} from "firebase/auth";
import initializeFirebase from '../pages/Authentication/firebase/firebase.init';

initializeFirebase();

const useFirebase = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoggedOut, setIsLoggedOut] = useState(false);
    const [user, setUser] = useState({});
    const [authError, setAuthError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [admin, setAdmin] = useState(false);
    const [authToken, setAuthToken] = useState('');


    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    const registerUser = (email, password, name, navigate) => {
        setIsLoading(true);
        setIsLoggedIn(false);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setAuthError('');
                const newUser = { email, displayName: name };
                setUser(newUser);

                saveUser(email, name, 'POST');

                updateProfile(auth.currentUser, {
                    displayName: name
                })
                    .then(() => {

                    })
                    .catch((error) => {

                    });
                navigate('/dashboard');
            })
            .catch((error) => {
                const errorCode = error.code;
                setAuthError(error.message);
                // ..
            })
            .finally(() => setIsLoading(false));

    }

    const loginUser = (email, password, location, navigate) => {
        setIsLoading(true);
        setIsLoggedIn(false);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const destination = location?.state?.from || '/dashboard';
                navigate(destination);
                setAuthError('');
            })
            .catch((error) => {
                setAuthError(error.message);
            })
            .finally(() => setIsLoading(false));
    }

    const logInWithGoogle = (location, navigate) => {
        setIsLoading(true);
        setIsLoggedIn(false);
        console.log(isLoggedIn);
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const user = result.user;
                setAuthError('');
                saveUser(user.email, user.displayName, 'PUT');
                const destination = location?.state?.from || '/dashboard';
                navigate(destination);
            })
            .catch((error) => {
                setAuthError(error.message);
            })
            .finally(() => setIsLoading(false));
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsLoggedIn(true);
                setUser(user);
                getIdToken(user)
                    .then(idToken => {
                        setAuthToken(idToken);
                    })
            } else {
                setUser({});
            }
            setIsLoading(false)
        });
        return () => unsubscribe;
    }, []);

    useEffect(() => {
        fetch(`https://infinite-badlands-03688.herokuapp.com/users/${user.email}`)
            .then(res => res.json())
            .then(data => {
                setAdmin(data.admin);
            })
    }, [user.email]);

    const logOut = () => {
        setIsLoading(true);
        setIsLoggedOut(true);
        setIsLoggedIn(false);
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        })
            .finally(() => {
                setIsLoading(false);
                setIsLoggedOut(false);
            });
    }

    console.log(isLoggedIn);
    console.log('out', isLoggedOut);
    const saveUser = (email, displayName, method) => {
        const user = { email, displayName };
        fetch('https://infinite-badlands-03688.herokuapp.com/users', {
            method: method,
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then()
    }
    return {
        user,
        admin,
        authToken,
        isLoading,
        isLoggedIn,
        isLoggedOut,
        authError,
        registerUser,
        loginUser,
        logInWithGoogle,
        logOut,
    }
}

export default useFirebase;