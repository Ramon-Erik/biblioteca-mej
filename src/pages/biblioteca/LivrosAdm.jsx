import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { listenToBooksAndCatalogue } from "../../firebase/firebase.config";

import Header from "../../components/header/Header";
import Section from "../../components/section/Section";
import CatalogControls from "../../components/catalogControls/CatalogControls";
import Loading from "../../components/loadingBooks/LoadingBooks";
import FlashMessage from "../../components/flash-message/FlashMessage";
import Pagination from "../../components/pagination/Pagination";
import Footer from "../../components/footer/Footer";

const LivrosAdm = () => {
  const { user } = useAuth();
  console.log(user);
  
  const [AllBooks, setAllBooks] = useState([]);
  const [AllBooksId, setAllBooksId] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState();
  const [descIndex, setDescIndex] = useState([]);
  const [message, setMessage] = useState({ type: "unset", msg: "none" });
  const [currentPage, setCurrentPage] = useState(1);

  const handleShowDescription = (index) => {
    setDescIndex((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleFilterChange = (value) => {
    const booksData = AllBooks.filter((b) => b.filters.includes(value));
    setFilteredBooks(booksData);
    setResults(booksData.length);
    setCurrentPage(1);
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
          <h1 className="text-center">Oi {user.displayName || "aa"}!</h1>
        </Section>
        <Section>
          <p>O que deseja fazer?</p>
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
          <Loading
            loading={loading}
            books={AllBooks}
            filtered={filteredBooks}
          />
        </Section>
        <Section>
          <div className="full-width">
            <div className="full-width">
              {!loading && AllBooks.length > 0 && results > 0 && (
                <Pagination
                  setMsg={handleShowMessage}
                  auth={user}
                  AllBooksId={AllBooksId}
                  books={filteredBooks}
                  descIndex={descIndex}
                  handleShowDescription={handleShowDescription}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              )}
            </div>
          </div>
        </Section>
      </main>
      <Footer auth={{email: "mej@mpe.com"}}/>
    </>
  );
};

export default LivrosAdm;
