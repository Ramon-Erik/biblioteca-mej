import { useState } from "react";
import { deleteBook } from "../../firebase/firebase.config";
import FlashMessage from "../../components/flash-message/FlashMessage";
import "./Modal.css";

import React from "react";

const DeleteModal = ({ isOpen, setModal, book, setMsg }) => {
  const filterStyle = {
    padding: "2px 5px",
    borderRadius: "10px",
    background: "rgba(0, 0, 0, 0.31)",
    color: "white",
  };
  const [filterString, setFilterString] = useState("");
  const [message, setMessage] = useState({ type: "unset", msg: "none" });

  const closeModal = () => {
    setModal(false);
  };

  const handleFilterString = (e) => {
    setFilterString(e.target.value);
  };

  const handleShowMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage({ type: "unset", msg: "none" });
    }, 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (book.filters[0] === filterString) {
      closeModal();
      await deleteBook(book.idDoc);
      setFilterString("");
      setMsg({ type: "success", msg: "Livro apagado com sucesso!" });
    } else {
      handleShowMessage({
        type: "error",
        msg: "Digite a palavra destacada para apagar o livro.",
      });
    }
  };

  if (isOpen)
    return (
      <div className="modal-overlay" onClick={closeModal}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <div className="header">
            <h2>Deseja apagar o registro do livro?</h2>
          </div>
          <form className="body" onSubmit={handleSubmit}>
            <p>
              Digite este filtro <span style={filterStyle}>{book.filters[0]}</span> do livro "{book.name}" no campo abaixo para apagar.
            </p>
            <label>
              <input
                type="text"
                required
                name="filterString"
                onChange={handleFilterString}
              />
            </label>
            <p>
              <FlashMessage message={message} />
            </p>
            <div className="buttons">
              <button type="button" onClick={closeModal}>
                Cancelar
              </button>
              <button type="submit">Salvar</button>
            </div>
          </form>
        </div>
      </div>
    );
  return null;
};

export default DeleteModal;
