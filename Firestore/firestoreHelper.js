import {
    addDoc, collection,
    deleteDoc, doc, getDocs,
    setDoc, updateDoc,
} from "firebase/firestore";
import { database } from "./firestoreSetup";

export async function writeToDB(userID, subCollectionName, data) {
    try {
        const userDataRef = doc(database, 'trashData', userID);
        const trashDataRef = collection(userDataRef, subCollectionName);
        const docRef = await addDoc(trashDataRef, data);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export async function deleteDB(deletedId, collectionName) {
    try {
        const rmDoc = await deleteDoc(doc(database, collectionName, deletedId));
    } catch (e) {
        console.error("Error deleting document: ", e);
    }
}

export async function getAllDocs(collectionName, fieldName) {
    try {
        const querySnapshot = await getDocs(collection(database, collectionName));
        const data = [];
        if (!querySnapshot.empty) {
            querySnapshot.forEach((docdata) => {
                const fieldArray = docdata.data()['category'][fieldName]; // Access the specific field array
                if (Array.isArray(fieldArray)) {
                    const transformedArray = fieldArray.map((item) => ({
                        value: item,
                        label: item,
                    }));
                    data.push(...transformedArray);
                }
            });
        }
        return data;
    } catch (e) {
        console.error("Error getting documents: ", e);
        return [];
    }
}

export async function updateDB(collectionName, docId, data) {
    try {
        const docRef = await updateDoc(doc(database, collectionName, docId), data);
    } catch (e) {
        console.error("Error updating document: ", e);
    }
}

export async function registerUserInfo(uid, data) {
    try {
        const docRef = doc(database, 'trashData', uid);
        await setDoc(docRef, data, { merge: true });
    } catch (e) {
        console.error("Error creating user entry: ", e);
    }
}