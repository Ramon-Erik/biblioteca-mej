import { useState } from "react";

import css from "./Pagination.module.css";
import AddModal from "../../components/modal/AddModal";
import Book from "../../components/book/Book";

import addIcon from "../../assets/add.svg";

const Pagination = ({
  auth = { email: "null" },
  setMsg,
  books = [],
  descIndex,
  handleShowDescription,
  AllBooksId,
  currentPage,
  setCurrentPage,
}) => {
  const itemsPerPage = 5;
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBoks = books.slice(startIndex, endIndex);

  const totalPages = Math.ceil(books.length / itemsPerPage);

  const handleBack = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };
  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };
  const handleShowModal = () => {
    if (!addModalIsOpen) {
      setAddModalIsOpen(true);
    }
  };
  return (
    <>
      <div className={css.paginationBtns}>
        <button type="button" onClick={handleBack} disabled={currentPage === 1}>
          Voltar
        </button>
        <span>
          &nbsp;página {currentPage} / {totalPages}&nbsp;
        </span>
        <button
          type="button"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          Próximo
        </button>
      </div>
      {auth.email === "mej@mpe.com" && (
        <div className={`${css.containerAddBtn} full-width`}>
          <div className="adm-buttons add-book">
            <div>
              <button className="btn" id="create" onClick={handleShowModal}>
                <img src={addIcon} alt="Ícone de mais" />
                <span>Cadastrar novo livro</span>
              </button>
              <AddModal
                isOpen={addModalIsOpen}
                setMsg={setMsg}
                setModal={setAddModalIsOpen}
                ids={AllBooksId}
              />
            </div>
          </div>
        </div>
      )}
      {auth.email === "null" && (
        <span style={{margin: "3rem"}}></span>
      )}
      <ul className="catalog">
        {currentBoks.map((book, index) => (
          <Book
            key={index}
            setMsg={setMsg}
            book={book}
            index={index} // index singular desse item
            descIndex={descIndex} //lista com todos os index
            handleShowDescription={handleShowDescription}
            auth={auth}
          />
        ))}
      </ul>
      <div className={css.paginationBtns}>
        <button type="button" onClick={handleBack} disabled={currentPage === 1}>
          Voltar
        </button>
        <span>
          &nbsp;página {currentPage} / {totalPages}&nbsp;
        </span>
        <button
          type="button"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          Próximo
        </button>
      </div>
    </>
  );
};

export default Pagination;
