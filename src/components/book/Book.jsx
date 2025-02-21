import DeleteModal from "../modal/DeleteModal";
import BorrowModal from "../modal/BorrowModal";
import UpdateModal from "../modal/UpdateModal";

import editIcon from "../../assets/edit.svg";
import borrowIcon from "../../assets/borrow.svg";
import deleteIcon from "../../assets/delete.svg";
import { useState } from "react";

const Book = ({ book, index, descIndex, handleShowDescription, setMsg }) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [borrowModalOpen, setBorrowModalOpen] = useState(false)
  const [updateModalOpen, setUpdateModalOpen] = useState(false)

  const handleShowDeleteModal = () => {
    if (!deleteModalOpen) {
      setDeleteModalOpen(true);
    }
  }

  const handleShowBorrowModal = () => {
    if (!borrowModalOpen) {
      setBorrowModalOpen(true);
    }
  }

  const handleShowUpdateModal = () => {
    if (!updateModalOpen) {
      setUpdateModalOpen(true);
    }
  }

  return (
    <li key={index} className="book">
      <div className="book-header">
        <button
          onClick={() => handleShowDescription(index)}
          className="book-cover"
        ></button>
        <div className="book-title">
          <span className="name">
            {book.name}, por {book.author}
          </span>
          <p>
            {book.collection && (
              <span className="collection">
                {book.collection.title} - Vol. {book.collection.volume}
              </span>
            )}
          </p>
        </div>
      </div>
      <p className="actions">
        Ações:
        <span className="adm-buttons">
          <button className="btn edit" onClick={handleShowUpdateModal}>
            <img src={editIcon} alt="ìcone de lápis" />
          </button>
          <button className="btn borrow" onClick={handleShowBorrowModal}>
            <img src={borrowIcon} alt="ìcone de enviar" />
          </button>
          <button className="btn delete" onClick={handleShowDeleteModal}>
            <img src={deleteIcon} alt="ìcone de lixeira" />
          </button>
        </span>
      </p>
      <div className="modals">
        <DeleteModal
          book={book}
          isOpen={deleteModalOpen}
          setMsg={setMsg}
          setModal={setDeleteModalOpen}
         />
        <BorrowModal
          book={book}
          isOpen={borrowModalOpen}
          setMsg={setMsg}
          setModal={setBorrowModalOpen}
         />
        <UpdateModal
          book={book}
          isOpen={updateModalOpen}
          setMsg={setMsg}
          setModal={setUpdateModalOpen}
         />
      </div>
      <p>
        {book.borrowed && (
          <span className="line">
            Status: <span className="borrowed">emprestado</span>
          </span>
        )}
        {!book.borrowed && (
          <span className="line">
            Status: <span className="avalible">disponível</span>
          </span>
        )}
        <span className="line">Filtros: {book.filters.join(", ")}</span>
      </p>
      <div className="desc">
        <p className={descIndex.includes(index) ? "shown" : "hidden"}>
          {book.description}
        </p>
      </div>
    </li>
  );
};

export default Book;
