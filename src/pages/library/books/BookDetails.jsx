import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBookByName } from "../../../firebase/firebase.config";

import Header from "../../../components/header/Header";
import Footer from "../../../components/footer/Footer";

import css from "../../../assets/css/BookDetails.module.css";

const BookDetails = () => {
  let { bookName } = useParams();
  bookName = bookName.replaceAll("_", " ");
  const [book, setBook] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const bookData = await getBookByName(bookName);
        setBook(bookData);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchBook();
  }, [bookName]);

  if (loading) {
    return (
      <>
        <Header />
        <main>
          <p>Carregando informações do livro...</p>
        </main>
        <Footer />
      </>
    );
  } else if (!loading && !book) {
    return (
      <>
        <Header />
        <main>
          <p>
            O livro <span>{bookName}</span> não foi encontrado no banco de
            dados...
          </p>
          ;
        </main>
        <Footer />
      </>
    );
  } else {
    return (
      <>
        <Header />
        <main>
          <h1 className="text-center">Informações para o livro</h1>
          <section className={css.bookInfo}>
            <div className={css.bookCover}></div>
            <article>
              <div className={`${css.bookNameTitle} text-center`}>
                <h2>{bookName}</h2>
                <h3>Por {book.author}</h3>
              </div>
              <p className={css.description}>
                <strong>Sobre o livro:</strong> <span>{book.description}</span>
              </p>
              {book.collection?.title && book.collection?.volume && (
                <p>
                  <strong>Coleção:</strong> <span>{book.collection.title}</span>{" "}
                  - <span>Volume {book.collection.volume}</span>
                </p>
              )}
              <p className={css.publisher}>
                <strong>Editora:</strong> <span>{book.publisher}</span>
              </p>
              {book.borrowed && (
                <p>
                  <strong>Situação:</strong> <span className={`${css.status} ${css.avalible}`}>indisponível!</span> Este livro está nas mãos de alguém
                  agora... A estimativa de devolução é para o dia{" "}
                  <span>{new Date(book.returnDate).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric"
                  })}.</span>
                </p>
              )}
              {!book.borrowed && (
                <p>
                  <strong>Situação:</strong> <span className={`${css.status} ${css.avalible}`}>livre!</span> Você pode pedir esse livro emprestado.</p>
              )}
            </article>
          </section>
        </main>
        <Footer />
      </>
    );
  }
};

export default BookDetails;
