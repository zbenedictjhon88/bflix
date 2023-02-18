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
        if (user.emailVerified) {
            setCookie('uid', user.uid);
            setCookie('isLogged', true);
            setCookie('isUserVerified', true);
            window.location.replace('/');
        } else {
            swal('Your account is not yet verified', 'Please check your email for a verification link or contact customer support for assistance.', 'error');
        }
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorCode == 'auth/user-not-found') {
            swal('User not found', 'Please ensure that the username or email you entered is correct, or create a new account if you are a new user.', 'error');
        }

        if (errorCode == 'auth/wrong-password') {
            swal('Oops!', 'Incorrect username/email or password', 'warning');
        }

        if (errorCode == 'auth/too-many-requests') {
            swal('Error', 'Please try again later. Thank you!', 'error');
        }

        console.log(error);
    });
}

export const signUpEmailPassword = async (name, email, password) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
        createUser(user.uid, name, email, password, user.emailVerified, null, true, true);
        swal(
            "Thank you for signing up! Your account is currently being verified.",
            "Please check your email for further instructions on how to complete the verification process. If you don't receive an email within a few minutes, please check your spam folder. We appreciate your patience.",
            "success",
            {
                closeOnClickOutside: false,
                buttons: {
                    confirm: "OK"
                },
            }
        ).then((value) => {
            if (value) {
                window.location.replace('/sign-in');
            }
        });
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        if (errorCode == 'auth/weak-password') {
            swal('Warning', 'Password should be at least 6 characters', 'warning');
        }

        if (errorCode == 'auth/email-already-in-use') {
            swal('Warning', 'Sorry, the email you entered is already in use. Please try again with a different email or log in to your existing account.', 'warning');
        }

        console.log(error);
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
        // ...
        getUsers().then(res => {
            let isNewUser = false;
            res.map(r => {
                if (r.uid == user.uid) {
                    isNewUser = true;
                }
            });

            if (!isNewUser) {
                createUser(user.uid, null, null, user.displayName, true, user.photoURL, true, true)
            }

            setCookie('uid', user.uid);
            setCookie('isLogged', true);
            setCookie('isUserVerified', true);
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

        console.log(error);
    });
}

export const signInAsGuest = (e) => {
    e.preventDefault();

    setCookie('isLogged', true);
    setCookie('isUserVerified', false);
    window.location.replace('/');
}

export const signOutGoogleAccount = () => {
    removeCookie('uid');
    removeCookie('isLogged');
    removeCookie('isUserVerified');

    signOut(auth).then(() => {
        console.log('logged out');
    }).catch((error) => {
        console.log(error);
    });

    window.location.replace('/sign-in');
}