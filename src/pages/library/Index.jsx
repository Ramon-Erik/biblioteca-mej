import { useEffect, useState } from "react";
import { useRef } from "react";
import { listenToBooksAndCatalogue } from "../../firebase/firebase.config";

import Header from "../../components/header/Header";
import SquareSection from "../../components/square-section/SquareSection";
import ColumnSection from "../../components/column-section/ColumnSection";
import Slider from "../../components/slider/Slider";
import Separator from "../../components/separator/Separator";
import Pagination from "../../components/pagination/Pagination";
import CatalogControls from "../../components/catalogControls/CatalogControls";
import Footer from "../../components/footer/Footer";

import img1 from "../../assets/mej-1.jpg";
import img2 from "../../assets/mej-2.jpg";
import img3 from "../../assets/mej-3.jpg";
import img4 from "../../assets/mej-4.jpg";

const Index = () => {
  const imgs = [
    {
      id: 1,
      link: img1,
      alt: "Foto tirada em encontro do mej",
    },
    {
      id: 2,
      link: img2,
      alt: "Foto tirada em encontro do mej",
    },
    {
      id: 3,
      link: img3,
      alt: "Foto tirada em encontro do mej",
    },
    {
      id: 4,
      link: img4,
      alt: "Foto tirada em encontro do mej",
    },
  ];
  const [AllBooks, setAllBooks] = useState([]);
  const [AllBooksId, setAllBooksId] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const catalogRef = useRef();

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
  const [descIndex, setDescIndex] = useState([]);
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
      <Header link="/biblioteca/login" />
      <main>
        <SquareSection>
          <article>
            <h2>Biblioteca do MEJ</h2>
            <p>
              Com o hábito da leitura, você aprofunda sua compreensão dos
              ensinamentos e tradições da Igreja, fortalecendo sua
              espiritualidade mejista e se aproximando dos valores católicos.
            </p>
            <button
              className="hash-button"
              onClick={() => {
                catalogRef.current?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
            >
              Ver livros
            </button>
          </article>
          <div>
            <Slider imgs={imgs} />
          </div>
        </SquareSection>
        <Separator>
          <q>
            Conhecereis a <strong>Verdade</strong>, e a verdade vos{" "}
            <strong>libertará</strong>
          </q>
        </Separator>
        <SquareSection>
          <article>
            <h2>Sobre o projeto</h2>
            <p>
              A biblioteca do MEJ busca trazer para os jovens o hábito da
              leitura, e também conhecimento acerca da beleza dos da fé
              católica, na Tradição, Escritura e o Magistério, oferecendo livros
              que os ajudarão em seu crescimento espiritual.
            </p>
          </article>
          <div>
            <img
              src={img2}
              // width="335px"
              alt="Foto tirada em encontro do mej"
            />
          </div>
        </SquareSection>
        <Separator>
          <q>
            <strong>Creio</strong> para entender e <strong>entendo</strong> para
            crer
          </q>
        </Separator>
        <SquareSection>
          <article>
            <h2>Como funciona</h2>
            <p>
              O mejista interessado em ler um dos livros do acervo do mej, entra
              em contato com a Emilly &#40;vice-coordenadora do movimento&#41;,
              para combinar como pagar a taxa de empréstimo e quando pegar o
              livro.
            </p>
            <button
              className="hash-button"
              onClick={() => {
                catalogRef.current?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
            >
              Ver livros
            </button>
          </article>
          <div>
            <img
              src={img3}
              // width="335px"
              alt="Foto tirada em encontro do mej"
            />
          </div>
        </SquareSection>
        <Separator>
          <q>
            Só se <strong>ama</strong> aquilo que se <strong>conhece</strong>
          </q>
        </Separator>
        <SquareSection>
          <article>
            <h2>Taxa de empréstimo</h2>
            <p>
              A fim de que o movimento pudesse ter uma forma de arrecadar
              dinheiro para suas despesas, é cobrado um valor simbólico de
              R&#36; 1,00 &#40;um real&#41; pelo empréstimo, que é cobrado no
              ato de entrega do livro.
            </p>
          </article>
          <div>
            <img
              src={img4}
              // width="335px"
              alt="Foto tirada em encontro do mej"
            />
          </div>
        </SquareSection>
        <Separator>
          <q>
            Vale mais a <strong>sabedoria</strong> que as pérolas
          </q>
        </Separator>
        <span ref={catalogRef} spacefor="catalog"></span>
        <ColumnSection>
          <article id="catalog">
            <div className="heading">
              <h2 className="text-center">Catálogo de livros</h2>
              <p className="text-center">
                Ao clicar na imagem do livro, aparecerá um texto que descreve os
                assuntos que o livro aborda.
              </p>
            </div>
            <div className="text-center" style={{ margin: "1rem 0 2rem" }}>
              <CatalogControls
                results={results}
                handleChangeValue={handleFilterChange}
              />
            </div>
            <div className="books">
              {!loading && AllBooks.length > 0 && results > 0 && (
                <Pagination
                  setMsg={null}
                  auth={{ email: "null" }}
                  AllBooksId={AllBooksId}
                  books={filteredBooks}
                  descIndex={descIndex}
                  handleShowDescription={handleShowDescription}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              )}
            </div>
          </article>
        </ColumnSection>
      </main>
      <Footer />
    </>
  );
};

export default Index;
