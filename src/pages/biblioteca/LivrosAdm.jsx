import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { logOut, catalog } from "../../firebase/firebase.config";

import Header from "../../components/header/Header";
import Section from "../../components/section/Section";
import CatalogControls from "../../components/CatalogControls/CatalogControls";

const LivrosAdm = () => {
  const { user } = useAuth();
  const [AllBooks, setAllBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState();

  const handleFilterChange = (value) => {
    console.log(value);
    const booksData = AllBooks.filter((b) => b.filters.includes(value));
    console.log(booksData);
    setFilteredBooks(booksData);
    setResults(booksData.length);
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksData = await catalog();
        setAllBooks(booksData);
        setFilteredBooks(booksData);
        setResults(booksData.length);
      } catch (error) {
        console.error("erro ao ler livros", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  return (
    <>
      <Header />
      <main>
        <Section>
          <h1>Olá {user.displayName || "aa"}!</h1>
          <p>O que deseja fazer...?</p>
        </Section>
        <Section>
          <CatalogControls
            results={results}
            handleChangeValue={handleFilterChange}
          />
        </Section>
        <Section>
          <ul className="catalogo">
            {loading ? (
              <p>Carregando...</p>
            ) : AllBooks.length > 0 ? (
              filteredBooks.map((b, i) => <li key={i}>{b.name}</li>)
            ) : (
              <li>Nenhum livro encontrado</li>
            )}
          </ul>
        </Section>
        <button onClick={logOut}>Sair</button>
      </main>
    </>
  );
};

export default LivrosAdm;
