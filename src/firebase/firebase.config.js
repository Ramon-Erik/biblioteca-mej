import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  updateProfile,
  signOut,
} from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  onSnapshot,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDSJXWha5wfD37BIsUQyAMcGlccM-M71rM",
  authDomain: "mej-maranguape.firebaseapp.com",
  projectId: "mej-maranguape",
  storageBucket: "mej-maranguape.firebasestorage.app",
  messagingSenderId: "849985662178",
  appId: "1:849985662178:web:838807d866da8928e8c2bb",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const collectionBooks = collection(db, "books");

setPersistence(auth, browserLocalPersistence).catch((error) => {
  console.error("Erro ao definir persistência", error);
});

const login = async (nome, senha) => {
  const userCredential = await signInWithEmailAndPassword(auth, nome, senha);
  const user = userCredential.user;

  // const newDisplayName = nome === "mej@mpe.com" ? "Coordenação do MEJ" : "ADM";
  // await updateProfile(user, { displayName: newDisplayName });
  // await user.reload();
  return user.user;
};

const logOut = async () => await signOut(auth);

const listenToBooksAndCatalogue = (callback) => {
  const unsubscribe = onSnapshot(collectionBooks, (snapshot) => {
    const booksData = snapshot.docs.map((doc) => ({
      idDoc: doc.id,
      ...doc.data(),
    }))
    callback(booksData)
  });
  return unsubscribe;
};

const addBook = async (bookData) => {
  const docRef = await addDoc(collectionBooks, bookData);
  return docRef;
};

const deleteBook = async (bookId) => await deleteDoc(doc(db, "books", bookId))

export { login, logOut, listenToBooksAndCatalogue, addBook, deleteBook };
