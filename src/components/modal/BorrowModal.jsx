import { useState } from "react";
import "./Modal.css";

const BorrowModal = ({ isOpen, book, setModal, setMsg }) => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");

  const closeModal = () => {
    setModal(false);
    setName("");
    setDate("");
  };
  if (isOpen)
    return (
      <div className="modal-overlay" onClick={closeModal}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <div className="header">
            <h2>Deseja emprestar "{book.name}"?</h2>
          </div>
          <form className="body">
            <label>
              Para quem o livro será emprestado?
              <input
                type="text"
                name="name"
                id="name"
                required
                onClick={(e) => setName(e.target.value)}
              />
            </label>
            <label>
              Data da devolução
              <input
                type="date"
                name="date"
                id="date"
                required
                onClick={(e) => setDate(e.target.value)}
              />
            </label>
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

export default BorrowModal;
