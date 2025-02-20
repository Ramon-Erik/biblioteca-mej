import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  updateProfile,
  signOut,
} from "firebase/auth";
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";

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

setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Persistência de login ativada");
  })
  .catch((error) => {
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

const catalog = async () => {
  const collectionBooks = collection(db, "books");
  const booksSnap = await getDocs(collectionBooks);
  const books = booksSnap.docs.map((doc) => doc.data());
  return books;
};

const addBook = async (bookData) => {
  const collectionBooks = collection(db, "books");
  const docRef = await addDoc(collectionBooks, bookData);
  console.log("Livro adicionado... Livro: ", docRef)
  return docRef
};

export { login, logOut, catalog, addBook };
