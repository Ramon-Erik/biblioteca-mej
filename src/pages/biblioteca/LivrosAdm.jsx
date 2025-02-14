import { useAuth } from "../../context/AuthContext";
import ProtectedRoute from "../../components/ProtectedRoute";
import Header from "../../components/header/Header";

const LivrosAdm = () => {
  const { user } = useAuth();
  return (
    <>
      <ProtectedRoute>
        <Header />
        <main>
          <h1>Olá adm</h1>
        </main>
      </ProtectedRoute>
    </>
  );
};

export default LivrosAdm;
