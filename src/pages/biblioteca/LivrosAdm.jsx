import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import { useAuth } from "../../context/AuthContext";
import { logOut, catalog } from "../../firebase/firebase.config";

const LivrosAdm = () => {
  const { user } = useAuth();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksData = await catalog();
        setBooks(booksData);
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
        <h1>Olá {user.displayName || "aa"}, como vai?</h1>
        <ul>
          {loading ? (
            <p>Carregando...</p>
          ) : books.length > 0 ? (
            books.map((b, i) => <li key={i}>{b.name}</li>)
          ) : (
            <li>Nenhum livro encontrado</li>
          )}
        </ul>
        <button onClick={logOut}>Sair</button>
      </main>
    </>
  );
};

export default LivrosAdm;
