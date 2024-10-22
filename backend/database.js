import { db } from './firebase';
import { collection, getDocs, addDocs, deleteDoc, doc } from 'firebase/firestore';

const itemsCollection = collection(db, 'items');

export const getItems = async () => {
    const querySnapshot = await getDocs(itemsCollection);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const addItem = async (item) => {
    const docRef = await addDoc(itemsCollection,item);
    return docRef.id;
};

export const updateItem = async ( id, updateData ) => {
    const itemRef = doc(db, 'items', id);
    await updateDoc(itemRef, updateData);
};


export const deleteItem = async (id) => {
    const itemRef = doc(db, 'items', id);
    await deleteDoc(itemRef);
};
