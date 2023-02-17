import { async } from "@firebase/util";
import { addDoc, collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "./firestore";

export const createUser = async (uid = null, email = null, pass = null, name = null, emailVerified = false, photoUrl = null) => {
    await addDoc(collection(db, 'users'), {
        uid: uid,
        email: email,
        password: pass,
        name: name,
        emailVerified: emailVerified,
        photoUrl: photoUrl,
    });
}

export const getUsers = async () => {
    const notesSnapshot = await getDocs(collection(db, "users"));
    const notesList = notesSnapshot.docs.map((doc) => doc.data());
    return notesList;
}
