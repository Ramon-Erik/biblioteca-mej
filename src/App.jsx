import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexBiblioteca from "./pages/biblioteca/IndexBiblioteca";
import LoginAdm from "./pages/biblioteca/LoginAdm";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<IndexBiblioteca />} />
          <Route path="/biblioteca" element={<IndexBiblioteca />} />
          <Route path="/biblioteca/login" element={<LoginAdm />} />
          <Route path="/biblioteca/livros-adm" element={<IndexBiblioteca />} />
          <Route path="*" element={<h1>Erro</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
