import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAYq7wgjDkBWKLn_VgU6hOpIJdlTGQVgBg",
  authDomain: "login-teste-9ec44.firebaseapp.com",
  projectId: "login-teste-9ec44",
  storageBucket: "login-teste-9ec44.firebasestorage.app",
  messagingSenderId: "959028355644",
  appId: "1:959028355644:web:d2e8f841ab9dee307bd939"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth()
const logar = async (nome, senha) => {
  const user = await signInWithEmailAndPassword(auth, nome, senha)
  return user
}

export { logar }