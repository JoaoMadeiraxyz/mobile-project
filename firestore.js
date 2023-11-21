import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "./firebaseConfig";

export default async function RegisterUserData(data) {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      name: data.name,
      height: data.height,
      weight: data.weight,
      city: data.city,
      imc: data.imc,
      sexo: data.sexo,
    });
    console.log(data)
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}

export async function ListUsersData() {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    const usersData = [];

    querySnapshot.forEach((doc) => {
      usersData.push({
        id: doc.id,
        name: doc.data().name,
        height: doc.data().height,
        weight: doc.data().weight,
        city: doc.data().city,
        imc: doc.data().imc,
        sexo: doc.data().sexo,
      });
    });

    usersData.sort((a, b) => parseFloat(b.imc) - parseFloat(a.imc));
    return usersData;
  } catch (error) {
    console.error("Error getting documents: ", error);
    return [];
  }
}

export async function UpdateUserData(id, data) {
  try {
    const userDocRef = doc(db, "users", id);
    await updateDoc(userDocRef, {
      name: data.name,
      height: data.height,
      weight: data.weight,
      city: data.city,
      imc: data.imc,
    });
    console.log("Document updated successfully!");
  } catch (error) {
    console.error("Error updating document: ", error);
  }
}

export async function DeleteUserData(id) {
  try {
    const userDocRef = doc(db, "users", id);
    await deleteDoc(userDocRef);
    console.log("Document deleted successfully!");
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
}
