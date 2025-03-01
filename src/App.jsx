import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import IndexBiblioteca from "./pages/biblioteca/IndexBiblioteca";
import LivrosAdm from "./pages/biblioteca/LivrosAdm";
import LoginAdm from "./pages/biblioteca/LoginAdm";
import "./App.css"; 

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<IndexBiblioteca />} />
            <Route path="/biblioteca" element={<IndexBiblioteca />} />
            <Route path="/biblioteca/login" element={<LoginAdm />} />
            <Route path="/biblioteca/livro/:nome_livro" element={<h1>Em construção</h1>} />
            <Route
              path="/biblioteca/livros-adm"
              element={
                <ProtectedRoute>
                  <LivrosAdm />
                </ProtectedRoute> 
              }
            />
            <Route path="*" element={<h1>Erro</h1>} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
