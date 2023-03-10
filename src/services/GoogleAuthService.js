import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { auth, provider } from "../store/firestore";
import { createUser, getUsers } from '../store/userstore';
import { setCookie } from './UtilService';

export const googleHandler = async (e) => {

    e.preventDefault();

    provider.setCustomParameters({ prompt: 'select_account' });
    signInWithPopup(auth, provider).then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // redux action? --> dispatch({ type: SET_USER, user });

        getUsers().then(res => {
            if (res.map(r => r.uid === user.uid)[0]) {
                console.log('y');
                setCookie('isLogged', true);
            } else {
                createUser(user.uid, null, null, user.displayName, true, user.photoURL, true)
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

        console.log(error);
    });
};