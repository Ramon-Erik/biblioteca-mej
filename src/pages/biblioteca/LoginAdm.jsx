import { login, isLogged } from "../../firebase/firebase.config";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Header from "../../components/header/Header";

const LoginAdm = () => {
  const navigate = useNavigate();
  useEffect(() => {
    isLogged((user) => {
      if (user) {
        navigate('/biblioteca/livros-adm')
      }
    })
  }, [])
  
  const [nome, setNome] = useState();
  const [senha, setSenha] = useState();
  const [user, setUser] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userLogin = await login(nome, senha);
      setUser(userLogin)
      if (user) {
        navigate("/biblioteca/livros-adm");
      }
    } catch (error) {
      console.log(error);
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
