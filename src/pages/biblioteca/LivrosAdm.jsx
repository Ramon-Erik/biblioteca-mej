import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { listenToBooksAndCatalogue } from "../../firebase/firebase.config";

import Header from "../../components/header/Header";
import SquareSection from "../../components/square-section/SquareSection";
import CatalogControls from "../../components/catalogControls/CatalogControls";
import Loading from "../../components/loadingBooks/LoadingBooks";
import FlashMessage from "../../components/flash-message/FlashMessage";
import Pagination from "../../components/pagination/Pagination";
import Footer from "../../components/footer/Footer";

const LivrosAdm = () => {
  const { user } = useAuth();
  
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
        <SquareSection>
          <h1 className="text-center">Oi {user.displayName || "aa"}!</h1>
        </SquareSection>
        <SquareSection>
          <p>O que deseja fazer?</p>
        </SquareSection>
        <SquareSection>
          <div>
            <CatalogControls
              results={results}
              handleChangeValue={handleFilterChange}
            />
          </div>
        </SquareSection>
        <SquareSection>
          <FlashMessage message={message} />
        </SquareSection>
        <SquareSection>
          <Loading
            loading={loading}
            books={AllBooks}
            filtered={filteredBooks}
          />
        </SquareSection>
        <SquareSection>
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
        </SquareSection>
      </main>
      <Footer auth={{email: "mej@mpe.com"}}/>
    </>
  );
};

export default LivrosAdm;
