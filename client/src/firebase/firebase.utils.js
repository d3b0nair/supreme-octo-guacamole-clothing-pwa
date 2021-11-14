import { initializeApp } from "firebase/app";
import {
  getFirestore,
  getDoc,
  doc,
  where,
  query,
  collection,
  getDocs,
  addDoc,
  setDoc,
} from "firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const config = {
  apiKey: "AIzaSyC4ZiNHrxkU-CC333rS6yBcy6Dbla_azok",
  authDomain: "octopus-clothing.firebaseapp.com",
  projectId: "octopus-clothing",
  storageBucket: "octopus-clothing.appspot.com",
  messagingSenderId: "972785460689",
  appId: "1:972785460689:web:143de7f5f1a4a36646acf0",
  measurementId: "G-1696Y8MQB7",
};

const firebase = initializeApp(config);
export const auth = getAuth(firebase);
export const db = getFirestore(firebase);

export const getUserCartRef = async (userId) => {
  const cartsRef = query(
    collection(db, "carts"),
    where("userId", "==", userId)
  );
  const snapShot = await getDocs(cartsRef);
  if (snapShot.empty) {
    const cartDocRef = collection(db, "carts");
    const newDoc = await addDoc(cartDocRef, {
      userId,
      cartItems: [],
    });
    return newDoc;
  } else {
    return snapShot.docs[0].ref;
  }
};

export const createUserProfileDocument = async ({ userAuth }) => {
  if (!userAuth) {
    return;
  }
  const userRef = doc(db, `users/${userAuth.uid}`);
  const docSnap = await getDoc(userRef);

  if (!docSnap.exists()) {
    console.log(userAuth);
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log(error);
    }
  }
  return docSnap;
};

export const addCollectionAndDocuments = async (collectionKey, objectToAdd) => {
  const collectionRef = db.collection(collectionKey);

  const batch = db.batch();
  objectToAdd.forEach((obj) => {
    const newDocRef = collectionRef.doc(obj.title);
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data();
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });
  return transformedCollection.reduce((acc, collection) => {
    acc[collection.routeName] = collection;
    return acc;
  }, {});
};

export const fetchOrder = async (order) => {
  const orderRef = doc(db, `orders/${order}`);
  const snapshot = await getDoc(orderRef);
  return snapshot.data();
};
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
};

export const createNewUserWithEmailAndPassword = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export const signInWithGooglePopup = async () =>
  await signInWithPopup(auth, googleProvider);

export default firebase;
