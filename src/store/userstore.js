import { async } from "@firebase/util";
import { addDoc, collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "./firestore";

export const createUser = async (uid, name, email = null, pass = null, emailVerified = false, photoUrl = null, isAdsOn = true, isUserVerified = true) => {
    await addDoc(collection(db, 'users'), {
        uid: uid,
        email: email,
        password: pass,
        name: name,
        emailVerified: emailVerified,
        photoUrl: photoUrl,
        isAdsOn: isAdsOn,
        isUserVerified: isUserVerified
    });
}

export const getUsers = async () => {
    const notesSnapshot = await getDocs(collection(db, "users"));
    const notesList = notesSnapshot.docs.map((doc) => doc.data());
    return notesList;
}
