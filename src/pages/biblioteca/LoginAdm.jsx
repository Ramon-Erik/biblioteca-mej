import { login } from "../../firebase/firebase.config";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Header from "../../components/header/Header";

const LoginAdm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [nome, setNome] = useState();
  const [senha, setSenha] = useState();

  useEffect(() => {
    if (user) {
      // console.log("useEffect, user:", user);
      navigate("/biblioteca/Livros-adm")
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(nome, senha);
    } catch (error) {
      console.log("erro ao fazer login...", error);
    }
  };
  return (
    <>
      <Header />
      <main>
        <h1 className="text-center">Realizar login</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-area">
            <label htmlFor="nome">Nome: </label>
            <input
              type="text"
              name="nome"
              id="nome"
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
          <div className="form-area">
            <label htmlFor="senha">Senha: </label>
            <input
              type="password"
              name="senha"
              id="senha"
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>
          <div className="form-area">
            <input type="submit" value="Enviar" />
          </div>
        </form>
      </main>
    </>
  );
};

export default LoginAdm;
