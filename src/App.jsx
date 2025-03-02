import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Index from "./pages/library/Index";
import LivrosAdm from "./pages/library/livros/Adm";
import Livro from "./pages/library/livros/Livro";
import Login from "./pages/library/Login";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/biblioteca" element={<Index />} />
            <Route path="/biblioteca/login" element={<Login />} />
            <Route path="/biblioteca/livros/:book_name" element={<Livro />} />
            <Route
              path="/biblioteca/livros/adm"
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
