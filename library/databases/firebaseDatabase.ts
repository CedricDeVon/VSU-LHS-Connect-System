import { Database } from "./database";

export class FirebaseDatabase extends Database {

}

// // import { firebaseApp } from '../database/firebase'
// import { useCollection } from 'vuefire';
// import * as firestore from 'firebase/firestore';
// import { getApp } from 'firebase/app';

// const database = firestore.getFirestore(getApp());

// // CREATE One
// try {
//   await firestore.runTransaction(database, async (transaction: any) => {
//     await firestore.setDoc(firestore.doc(database, 'demoUser', 'jerrydoe@gmail.com'), { name: 'Jerry Doe', age: 26, role: 'thirdRole' }, { merge: false });
//     await firestore.setDoc(firestore.doc(database, 'demoUser', 'jackdoe@gmail.com'), { name: 'Jack A. Doe', age: 22, role: 'thirdRole' }, { merge: false });
//     // await firestore.addDoc(firestore.collection(database, 'demoUser'), { name: 'Jerry Doe', age: 21, role: 'thirdRole' });
//   });
// } catch (error) {
//   console.error(error);
// }

// // UPDATE One
// try {
//   await firestore.runTransaction(database, async (transaction: any) => {
//     await firestore.updateDoc(firestore.doc(database, 'demoUser', 'jerrydoe@gmail.com'), { name: 'Jerry A. Doe' });
//   });
// } catch (error) {
//   console.error(error);
// }

// // DELETE One
// try {
//   await firestore.runTransaction(database, async (transaction: any) => {
//     await firestore.deleteDoc(firestore.doc(database, 'demoUser', 'jackdoe@gmail.com'));
//     await firestore.updateDoc(firestore.doc(database, 'demoUser', 'jerrydoe@gmail.com'), {
//         age: firestore.deleteField()
//     });
//   });
// } catch (error) {
//   console.error(error);
// }

// // Batch CREATE, UPDATE and DELETE
// try {
//   await firestore.setDoc(firestore.doc(database, 'demoUser', 'jackdoe@gmail.com'), { name: 'Jack A. Doe', age: 22, role: 'thirdRole' }, { merge: false });

//   const batch = firestore.writeBatch(database);
//   const nycRef = firestore.doc(database, "demoUser", "jackdoe@gmail.com");
//   batch.set(nycRef, { name: "Jack Doe" });
//   const sfRef = firestore.doc(database, "demoUser", "jackdoe@gmail.com");
//   batch.update(sfRef, { age: 24 });
//   const laRef = firestore.doc(database, "demoUser", "jackdoe@gmail.com");
//   batch.delete(laRef);
//   await batch.commit();

// } catch (error) {
//   console.error(error);
// }

// // GET Many and One
// try {
//   const results = await firestore.runTransaction(database, async (transaction: any) => {
//     const demoUsers = useCollection(firestore.collection(database, 'demoUser'), { once: true });
//     const demoRoles = useCollection(firestore.collection(database, 'demoRole'), { once: true });
//     const demoUser = useDocument(firestore.doc(database, 'demoUser', 'jerrydoe@gmail.com'), { once: true });
//     const demoRole = await firestore.getDoc(firestore.doc(database, 'demoRole', 'firstRole'));
//     const querySnapshot = await firestore.getDocs(firestore.collection(database, 'demoUser'));
//     console.log(demoRole.count());
//     let results = {
//       demoUsers, demoRoles, demoUser, demoRole, ids: [], data: []
//     }
//     querySnapshot.forEach((document: any) => {
//       results.ids.push(document.id);
//       results.data.push(document.data());
//     });
//     return results;
//   });
//   console.log(results);
// } catch (error) {
//   console.error(error);
// }

// // Listening
// const unsubscribe = await firestore.onSnapshot(
//   await firestore.collection(database, "demoUser"), (snapshot: any) => {
//     snapshot.docChanges().forEach((change) => {
//     if (change.type === "added") {
//         console.log(change.doc.data());
//     }
//     if (change.type === "modified") {
//         console.log(change.doc.data());
//     }
//     if (change.type === "removed") {
//         console.log(change.doc.data());
//     }
//   })}, (error: any) => {
//     console.error(error);
//   });

// // Queries
// // const citiesRef = firestore.collection(database, "cities");
// // await firestore.setDoc(firestore.doc(citiesRef, "SF"), {
// //     name: "San Francisco", state: "CA", country: "USA",
// //     capital: false, population: 860000,
// //     regions: ["west_coast", "norcal"] });
// // await firestore.setDoc(firestore.doc(citiesRef, "LA"), {
// //     name: "Los Angeles", state: "CA", country: "USA",
// //     capital: false, population: 3900000,
// //     regions: ["west_coast", "socal"] });
// // await firestore.setDoc(firestore.doc(citiesRef, "DC"), {
// //     name: "Washington, D.C.", state: null, country: "USA",
// //     capital: true, population: 680000,
// //     regions: ["east_coast"] });
// // await firestore.setDoc(firestore.doc(citiesRef, "TOK"), {
// //     name: "Tokyo", state: null, country: "Japan",
// //     capital: true, population: 9000000,
// //     regions: ["kanto", "honshu"] });
// // await firestore.setDoc(firestore.doc(citiesRef, "BJ"), {
// //     name: "Beijing", state: null, country: "China",
// //     capital: true, population: 21500000,
// //     regions: ["jingjinji", "hebei"] });
// // const stateQuery = query(citiesRef, where("state", "==", "CA"));
// // const populationQuery = query(citiesRef, where("population", "<", 100000));
// // const nameQuery = query(citiesRef, where("name", ">=", "San Francisco"));
// // const notCapitalQuery = query(citiesRef, where("capital", "!=", false));
// // const q = query(citiesRef, where("regions", "array-contains", "west_coast"));
// // const q = query(citiesRef, where('country', 'in', ['USA', 'Japan']));
// // const q = query(citiesRef, where('country', 'not-in', ['USA', 'Japan']));
// // const q = query(citiesRef, 
// //   where('regions', 'array-contains-any', ['west_coast', 'east_coast']));
// //   import { query, where } from "firebase/firestore";  
// // const q = query(citiesRef, where('regions', 'in', [['west_coast'], ['east_coast']]));
// // const q1 = query(citiesRef, where("state", "==", "CO"), where("name", "==", "Denver"));
// // const q2 = query(citiesRef, where("state", "==", "CA"), where("population", "<", 1000000));
// // const q = query(citiesRef,
// //   or(where('capital', '==', true),
// //      where('population', '>=', 1000000)
// //   )
// // );
// // const q = query(collection(db, "cities"), and(
// //   where('state', '==', 'CA'),   
// //   or(
// //     where('capital', '==', true),
// //     where('population', '>=', 1000000)
// //   )
// // ));
// // const q = firestore.query(citiesRef, firestore.orderBy("name", "desc"), firestore.limit(3));
// // const q = query(citiesRef, orderBy("name", "asc"), limit(3));
// // const q = query(citiesRef, orderBy("state"), orderBy("population", "desc"));
// // const q = query(citiesRef, where("population", ">", 100000), orderBy("population"), limit(2));
// // let q = firestore.collection("employees")
// //       .where("salary", ">", 100000)
// //       .where("experience", ">",0);
// // let options = { analyze : 'true' };
// // let explainResults = await q.explain(options);
// // let planSummary = explainResults.metrics.planSummary;
// // let stats = explainResults.metrics.executionStats;
// // console.log(planSummary);
// // console.log(stats);
// // let coll = firestore.collection(database, "cities");
// // let snapshot = await firestore.getCountFromServer(coll);
// // console.log('count: ', snapshot.data().count);

// // coll = firestore.collection(database, 'cities');
// // snapshot = await firestore.getAggregateFromServer(coll, {
// //   totalPopulation: firestore.sum('population')
// // });
// // console.log('totalPopulation: ', snapshot.data().totalPopulation);

// // coll = firestore.collection(database, 'cities');
// // snapshot = await firestore.getAggregateFromServer(coll, {
// //   averagePopulation: firestore.average('population')
// // });
// // console.log('averagePopulation: ', snapshot.data().averagePopulation);

// // coll = firestore.collection(database, 'cities');
// // snapshot = await firestore.getAggregateFromServer(coll, {
// //   countOfDocs: firestore.count(),
// //   totalPopulation: firestore.sum('population'),
// //   averagePopulation: firestore.average('population')
// // });
// // console.log('countOfDocs: ', snapshot.data().countOfDocs);
// // console.log('totalPopulation: ', snapshot.data().totalPopulation);
// // console.log('averagePopulation: ', snapshot.data().averagePopulation);
// // const q = firestore.query(citiesRef, firestore.orderBy("population"), firestore.startAt(1000000), firestore.endAt(1000000));

// // Date and Timestamp
// // const docData = {
// //     stringExample: "Hello world!",
// //     booleanExample: true,
// //     numberExample: 3.14159265,
// //     dateExample: Timestamp.fromDate(new Date("December 10, 1815")),
// //     arrayExample: [5, true, "hello"],
// //     nullExample: null,
// //     objectExample: {
// //         a: 5,
// //         b: {
// //             nested: "foo"
// //         }
// //     }
// // };
// // await setDoc(doc(db, "data", "one"), docData);
// // const docRef = doc(db, 'objects', 'some-id');
// // // Update the timestamp field with the value from the server
// // const updateTimestamp = await updateDoc(docRef, {
// //     timestamp: serverTimestamp()
// // });

// // Termination
// // unsubscribe();
// // terminate(database);



