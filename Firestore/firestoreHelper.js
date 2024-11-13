import {
    addDoc, collection,
    deleteDoc, doc, getDocs,
    setDoc
} from "firebase/firestore";
import { database } from "./firestoreSetup";

export async function writeToDB(collectionName, data) {
    try {
        const docRef = await addDoc(collection(database, collectionName), data);
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