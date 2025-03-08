import { useEffect, useState } from "react";
import { borrowBook } from "../../firebase/firebase.config";
import "./Modal.css";

const BorrowModal = ({ isOpen, book, setModal, setMsg }) => {
  const [name, setName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [returningBook, setReturningBook] = useState(null);

  useEffect(() => {
    setDueDate(formattedDate());
  }, []);

  const formattedDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 15);
    const formattedDate = `${today.getFullYear()}-${String(
      today.getMonth() + 1
    ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
    return formattedDate;
  };

  const dateToLocaleDate = (day) =>
    new Date(day).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

  const calculateFine = (day) => {
    const today = new Date();
    const dueDate = new Date(day);
    if (today < dueDate) {
      return { custo: "R$ 1,00", atrasos: "R$ 0,00", total: "R$ 1,00" };
    }
    let difference = Math.abs(dueDate - today);
    difference = Math.floor(difference / (1000 * 60 * 60 * 24));
    return {
      custo: "R$ 1,00",
      atrasos: difference.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      }),
      total: (difference + 1).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      }),
    };
  };

  const closeModal = () => {
    setModal(false);
    setName("");
    setDueDate(formattedDate());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loanId = `loan_${Date.now()}`;
    const borrowData = returningBook
      ? {
          borrowed: false,
          borrowerName: null,
          dueDate: null,
          loanId: null,
        }
      : {
          borrowed: true,
          borrowerName: name,
          dueDate,
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
      console.error(err);
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
              {!book.borrowed && (
                <>
                  <h3>Emprestar livro</h3>
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
                      value={dueDate}
                      required
                      onChange={(e) => setDueDate(e.target.value)}
                    />
                  </label>
                </>
              )}
              {book.borrowed && (
                <>
                  <h3>Devolução do livro</h3>
                  <p>
                    Atualmente este livro está nas mãos de {book.borrowerName}.
                    A data prevista para entrega é de{" "}
                    {dateToLocaleDate(book.dueDate)}.
                  </p>
                  <p>
                    O total mínimo (entrega + atrasos) a ser recebido pelo
                    empréstimo é:
                  </p>
                  <p>Empéstimo: {calculateFine(book.dueDate).custo}</p>
                  <p>Atrasos: {calculateFine(book.dueDate).atrasos}</p>
                  <p>total: {calculateFine(book.dueDate).total}</p>
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
                </>
              )}
            </div>

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
