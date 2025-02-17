import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

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
  const user = await signInWithEmailAndPassword(auth, nome, senha,);
  user.user.displayName = nome === "mej@mpe.com" ? "MEJ adm" : "Unknown";
  localStorage.setItem("userName", user.user.displayName);
  return user.user;
};

export { login, app };
