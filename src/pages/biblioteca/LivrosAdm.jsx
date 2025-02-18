import Header from "../../components/header/Header";
import { useAuth } from "../../context/AuthContext";
import { logOut   } from "../../firebase/firebase.config";

const LivrosAdm = () => {
  const { user } = useAuth();
  return (
    <>
      <Header />
      <main>
        <h1>Olá {user?.displayName || "aa"}, como vai?</h1>
        <button onClick={logOut}>Sair</button>
      </main>
    </>
  );
};

export default LivrosAdm;
