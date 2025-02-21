import { useEffect, useState } from "react";
import { borrowBook } from "../../firebase/firebase.config";
import "./Modal.css";

const BorrowModal = ({ isOpen, book, setModal, setMsg }) => {
  const [name, setName] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [returningBook, setReturningBook] = useState(null);

  useEffect(() => {
    setReturnDate(formattedDate());
  }, []);

  const formattedDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 15);
    const formattedDate = `${today.getFullYear()}-${String(
      today.getMonth() + 1
    ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
    return formattedDate;
  };

  const closeModal = () => {
    setModal(false);
    setReturningBook(true);
    setName("");
    setReturnDate(formattedDate());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loanId = `loan_${Date.now()}`;
    const borrowData = returningBook
    ? {
      borrowed: false,
      borrowerName: null,
      returnDate: null,
      loanId: null,
    } 
    : {
        borrowed: true,
        borrowerName: name,
        returnDate,
        loanId,
      };
    try {
      await borrowBook(book.idDoc, borrowData);
      setMsg({
        type: "success",
        msg: returningBook
          ? "Livro devolvido com sucesso!"
          : "Livro emprestado com sucesso!",
      });
    } catch (err) {
      console.error(err)
      setMsg({
        type: "Error",
        msg: returningBook
          ? "O livro não pode ser devolvido!"
          : "O livro não pode ser emprestado!",
      });
    } finally {
      closeModal();
    }
  };

  if (isOpen)
    return (
      <div className="modal-overlay" onClick={closeModal}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <div className="header">
            <h2>Condição de "{book.name}"</h2>
          </div>
          <form className="body" onSubmit={handleSubmit}>
            <div className="radioLabels">
              <h3>O que você deseja fazer?</h3>
              <label className="radioLabel">
                Emprestar
                <input
                  onClick={() => setReturningBook(false)}
                  type="radio"
                  name="returningBook"
                  value="false"
                  id="returningBookFalse"
                />
              </label>
              <label className="radioLabel">
                Confirmar devolução
                <input
                  onChange={() => setReturningBook(true)}
                  type="radio"
                  name="returningBook"
                  value="true"
                  id="returningBookTrue"
                />
              </label>
            </div>
            {!returningBook && returningBook !== null && (
              <>
                <label>
                  Para quem o livro será emprestado?
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    onChange={(e) => setName(e.target.value)}
                  />
                </label>
                <label>
                  Data da devolução
                  <input
                    type="date"
                    name="date"
                    id="date"
                    value={returnDate}
                    required
                    onChange={(e) => setReturnDate(e.target.value)}
                  />
                </label>
              </>
            )}

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
