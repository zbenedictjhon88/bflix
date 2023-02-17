import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import swal from "sweetalert";
import { auth, provider } from "../store/firestore";
import { createUser, getUsers } from "../store/userstore";
import { getCookie, removeCookie, setCookie } from "./UtilService";

export const authentication = () => {
    return getCookie('isLogged');
}

export const signInEmailPassword = async (email, password) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);

        setCookie('isLogged', true);
        window.location.replace('/');
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);

        swal('Warning', errorMessage, 'warning');
    });
}

export const signUpEmailPassword = async (name, email, password) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
            console.log(user);
            createUser(user.uid, email, password, name, false, null)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
            console.log(error);
            swal('Warning', errorMessage, 'warning');
        });
}

export const signInGoogleAccount = async () => {
    provider.setCustomParameters({ prompt: 'select_account' });
    signInWithPopup(auth, provider).then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // redux action? --> dispatch({ type: SET_USER, user });
        console.log(user);

        getUsers().then(res => {
            if (res.map(r => r.uid === user.uid)[0]) {
                console.log('y');
                setCookie('isLogged', true);
            } else {
                createUser(user.uid, null, null, user.displayName, true, user.photoURL)
            }

            window.location.replace('/');
        })

    }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...

        swal('Warning', errorMessage, 'warning');
    });
}

export const signOutGoogleAccount = () => {
    removeCookie('isLogged');
    signOut(auth).then(() => {
        console.log('logged out');
    }).catch((error) => {
        console.log(error);
    });

    window.location.replace('/login');
}