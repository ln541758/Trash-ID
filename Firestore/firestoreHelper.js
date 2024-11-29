import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { database, auth } from "./firestoreSetup";

export async function writeToDB(userID, subCollectionName, data) {
  try {
    const userDataRef = doc(database, "trashData", userID);
    const trashDataRef = collection(userDataRef, subCollectionName);
    const docRef = await addDoc(trashDataRef, data);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function deleteDB(userID, subcollectionName, docID) {
  try {
    const docRef = doc(database, "trashData", userID, subcollectionName, docID);

    await deleteDoc(docRef);

    console.log("Document deleted successfully with ID: ", docID);
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
        const fieldArray = docdata.data()[fieldName]; // Access the specific field array
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

export async function updateDB(userID, subcollectionName, docID, updatedData) {
  try {
    const docRef = doc(database, "trashData", userID, subcollectionName, docID);
    await updateDoc(docRef, updatedData);

    console.log("Document updated successfully with ID: ", docID);
  } catch (e) {
    console.error("Error updating document: ", e);
  }
}

export async function registerUserInfo(uid, data) {
  try {
    const docRef = doc(database, "trashData", uid);
    await setDoc(docRef, data, { merge: true });
  } catch (e) {
    console.error("Error creating user entry: ", e);
  }
}

export async function fetchEnabledItems() {
  try {
    const items = [];
    const uid = auth.currentUser?.uid;
    if (!uid) {
      console.error("User is not authenticated.");
      return [];
    }

    const trashCollectionRef = collection(database, "trashData", uid, "trash");
    const q = query(trashCollectionRef, where("notification", "==", true));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      console.log("Fetched document data:", data); // Debug log
      if (data.trashType) {
        items.push(data.trashType); // Adjust if your document structure differs
      } else {
        console.warn("Document missing 'trashType' field:", doc.id);
      }
    });
    return items;
  } catch (e) {
    console.error("Error fetching enabled items: ", e);
    return [];
  }
}

export async function fetchTrashKeyMap() {
  const collectRef = collection(database, "trashKey");
  try {
    const querySnapshot = await getDocs(collectRef);
    const data = {};
    querySnapshot.forEach(doc => {
      Object.assign(data, doc.data());
    });
    return data;
  } catch (e) {
    console.error("Error fetching trash key map: ", e);
    return [];
  }
}
