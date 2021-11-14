const firebase = require("firebase/compat/app");
require("firebase/compat/firestore");

const config = {
  apiKey: "AIzaSyC4ZiNHrxkU-CC333rS6yBcy6Dbla_azok",
  authDomain: "octopus-clothing.firebaseapp.com",
  projectId: "octopus-clothing",
  storageBucket: "octopus-clothing.appspot.com",
  messagingSenderId: "972785460689",
  appId: "1:972785460689:web:143de7f5f1a4a36646acf0",
  measurementId: "G-1696Y8MQB7",
};

firebase.initializeApp(config);
const firestore = firebase.firestore();

async function fetchCollection() {
  try {
    const collectionRef = await firestore.collection("collections");
    const snapshot = await collectionRef.get();
    const collection = snapshot.docs.map((doc) => {
      return doc.data();
    });

    return collection;
  } catch (error) {
    console.log(error);
  }
}

async function createDocument(collection, orderID, data) {
  const collectionRef = firestore.collection(collection).doc(orderID);
  await collectionRef.set(data);
}

module.exports = { fetchCollection, createDocument };
