import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { logOut, catalog } from "../../firebase/firebase.config";

import Header from "../../components/header/Header";
import Section from "../../components/section/Section";
import CatalogControls from "../../components/CatalogControls/CatalogControls";

import addIcon from "../../assets/add.svg";
import editIcon from "../../assets/edit.svg";
import borrowIcon from "../../assets/borrow.svg";
import deleteIcon from "../../assets/delete.svg";

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
            <button id="create">
              <img src={addIcon} alt="Ícone de mais" />
            </button>
            <span>Cadastrar novo livro</span>
          </div>
        </Section>
        <Section>
          {loading && <p style={{width: "100%", textAlign: "left"}}>Carregando...</p>}

          {!loading && AllBooks.length === 0 && (
            <p style={{width: "100%", textAlign: "left"}}>Parece que a biblioteca está sem livros...</p>
          )}

          {!loading && AllBooks.length > 0 && results === 0 && (
            <p style={{width: "100%", textAlign: "left"}}>Não tem livros para esse filtro...</p>
          )}

          {!loading && AllBooks.length > 0 && results > 0 && (
            <ul className="catalog">
              {filteredBooks.map((b, i) => (
                <li key={i}>
                  <div className="book-header">
                    <div className="book-cover"></div>
                    <div>
                      <div className="name">
                        {b.name}, por {b.author}
                      </div>
                      {b.collection && (
                        <div className="collection">
                          {b.collection.title} - Vol. {b.collection.volume}
                        </div>
                      )}
                      <div className="adm-buttons">
                        <button className="edit">
                          <img src={editIcon} alt="ìcone de lápis" />
                        </button>
                        <button className="borrow">
                          <img src={borrowIcon} alt="ìcone de enviar" />
                        </button>
                        <button className="delete">
                          <img src={deleteIcon} alt="ìcone de lixeira" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="description">{b.description}</div>
                </li>
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
