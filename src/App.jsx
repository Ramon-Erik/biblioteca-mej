import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexBiblioteca from "./pages/biblioteca/IndexBiblioteca";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<IndexBiblioteca />} />
          <Route path="/biblioteca" element={<IndexBiblioteca />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
