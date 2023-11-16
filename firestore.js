import { collection, addDoc, getDocs } from "firebase/firestore"; 
import { db } from "./firebaseConfig";

export default async function RegisterUserData(data) {
    try {
        const docRef = await addDoc(collection(db, "users"), {
            name: data.name,
            height: data.height,
            weight: data.weight,
            city: data.city,
            imc: data.imc,
        });
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
            });
        });

        usersData.sort((a, b) => parseFloat(b.imc) - parseFloat(a.imc));
        return usersData;
    } catch (error) {
        console.error("Error getting documents: ", error);
        return [];
    }
}
