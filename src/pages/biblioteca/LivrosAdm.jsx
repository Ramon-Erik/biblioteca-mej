import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { logOut, catalog } from "../../firebase/firebase.config";

import Header from "../../components/header/Header";
import Section from "../../components/section/Section";
import CatalogControls from "../../components/catalogControls/CatalogControls";
import Loading from "../../components/loadingBooks/LoadingBooks";
import Book from "../../components/book/Book";

import addIcon from "../../assets/add.svg";

const LivrosAdm = () => {
  const { user } = useAuth();
  const [AllBooks, setAllBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState();
  const [descIndex, setDescIndex] = useState([]);

  const handleShowDescription = (index) => {
    setDescIndex((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleFilterChange = (value) => {
    const booksData = AllBooks.filter((b) => b.filters.includes(value));
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
          <h1>Oi {user.displayName || "aa"}!</h1>
        </Section>
        <Section>
          <p>O que deseja fazer...?</p>
        </Section>
        <Section>
          <CatalogControls
            results={results}
            handleChangeValue={handleFilterChange}
          />
        </Section>
        <Section>
          <div className="adm-buttons add-book">
            <div>
              <button id="create">
                <img src={addIcon} alt="Ícone de mais" />
                <span>Cadastrar novo livro</span>
              </button>
            </div>
          </div>
        </Section>
        <Section>
          <Loading
            loading={loading}
            books={AllBooks}
            filtered={filteredBooks}
          />

          {!loading && AllBooks.length > 0 && results > 0 && (
            <ul className="catalog">
              {filteredBooks.map((book, index) => (
                <Book
                  key={index}
                  book={book}
                  index={index}
                  descIndex={descIndex}
                  handleShowDescription={handleShowDescription}
                />
              ))}
            </ul>
          )}
        </Section>
        <button onClick={logOut}>Sair</button>
      </main>
    </>
  );
};

export default LivrosAdm;
