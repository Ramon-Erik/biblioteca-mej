import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  logOut,
  listenToBooksAndCatalogue,
} from "../../firebase/firebase.config";

import Header from "../../components/header/Header";
import Section from "../../components/section/Section";
import CatalogControls from "../../components/catalogControls/CatalogControls";
import Loading from "../../components/loadingBooks/LoadingBooks";
import Book from "../../components/book/Book";
import AddModal from "../../components/modal/AddModal";
import FlashMessage from "../../components/flash-message/FlashMessage";

import addIcon from "../../assets/add.svg";

const LivrosAdm = () => {
  const { user } = useAuth();
  const [AllBooks, setAllBooks] = useState([]);
  const [AllBooksId, setAllBooksId] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState();
  const [descIndex, setDescIndex] = useState([]);
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [message, setMessage] = useState({ type: "unset", msg: "none" });

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

  const handleShowModal = () => {
    if (!addModalIsOpen) {
      setAddModalIsOpen(true);
    }
  };

  const handleShowMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage({ type: "unset", msg: "none" });
    }, 7000);
  };

  useEffect(() => {
    try {
      const unsubscribe = listenToBooksAndCatalogue((booksData) => {
        setAllBooks(booksData);
        setAllBooksId(booksData.map((b) => b.id));
        setFilteredBooks(booksData);
        setResults(booksData.length);
        setLoading(false);
      });
      return () => unsubscribe();
    } catch (error) {
      console.error("erro ao ler livros", error);
    }
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
          <div>
            <CatalogControls
              results={results}
              handleChangeValue={handleFilterChange}
            />
          </div>
        </Section>
        <Section>
          <FlashMessage message={message} />
        </Section>
        <Section>
          <div className="full-width">
            <div className="adm-buttons add-book">
              <div>
                <button className="btn" id="create" onClick={handleShowModal}>
                  <img src={addIcon} alt="Ícone de mais" />
                  <span>Cadastrar novo livro</span>
                </button>
                <AddModal
                  isOpen={addModalIsOpen}
                  setMsg={handleShowMessage}
                  setModal={setAddModalIsOpen}
                  ids={AllBooksId}
                />
              </div>
            </div>
          </div>
        </Section>
        <Section>
          <Loading
            loading={loading}
            books={AllBooks}
            filtered={filteredBooks}
          />
        </Section>
        <Section>
          {!loading && AllBooks.length > 0 && results > 0 && (
            <ul className="catalog">
              {filteredBooks.map((book, index) => (
                <Book
                  key={index}
                  setMsg={handleShowMessage}
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
