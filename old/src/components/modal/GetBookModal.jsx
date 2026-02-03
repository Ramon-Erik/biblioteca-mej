import { useState } from "react";
import { deleteBook } from "../../firebase/firebase.config";
import FlashMessage from "../../components/flash-message/FlashMessage";
import "./Modal.css";

const GetBookModal = ({ isOpen, setModal, book, setMsg }) => {
  const filterStyle = {
    padding: "2px 5px",
    borderRadius: "10px",
    background: "rgba(0, 0, 0, 0.31)",
    color: "white",
  };
  const [filterString, setFilterString] = useState("");
  const [message, setMessage] = useState({ type: "unset", msg: "none" });
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    if (value.length < 3) {
      setNameError("O nome deve ter pelo menos 3 caracteres");
    } else if (!/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/.test(value)) {
      setNameError("O nome deve conter apenas letras e espaços");
    } else {
      setNameError("");
    }
  };

  const formatPhoneNumber = (value) => {
    value = value.replace(/\D/g, "");
    if (value.startsWith("55") && value.length > 11) {
      value = value.slice(2);
    }

    if (value.length > 11) value = value.slice(0, 11);
    if (value.length >= 11) {
      return `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(
        7,
        11
      )}`;
    } else if (value.length >= 7) {
      return `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    } else if (value.length >= 2) {
      return `(${value.slice(0, 2)}) ${value.slice(2)}`;
    } else if (value.length > 0) {
      return `(${value}`;
    }
    return "";
  };

  const handlePhoneChange = (e) => {
    const formattedPhone = formatPhoneNumber(e.target.value);
    setPhone(formattedPhone);
    const regex = /^\(\d{2}\) \d{5}-\d{4}$/;
    if (!regex.test(formattedPhone) && formattedPhone.length > 0) {
      setPhoneError("Formato inválido. Use: (99) 99999-9999");
    } else {
      setPhoneError("");
    }
  };

  const closeModal = () => {
    setModal(false);
    setPhone("")
    setName("")
    setPhoneError("")
    setNameError("")
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
            <h2>Pedir livro emprestado</h2>
          </div>
          <h3>Em construção...</h3>
          {/* <form className="body" onSubmit={handleSubmit}>
            <h3>Para pedir o livro, passe as seguintes informações</h3>
            <label htmlFor="name">Nome:</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={handleNameChange}
              placeholder="Digite seu nome"
              required
            />
            {nameError && <p style={{ color: "red" }}>{nameError}</p>}

            <label htmlFor="phone">Número de WhatsApp:</label>
            <input
              id="phone"
              type="text"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="(99) 99999-9999"
              pattern="\(\d{2}\) \d{5}-\d{4}"
              title="Digite o número no formato correto: (99) 99999-9999"
              required
            />
            {phoneError && <p style={{ color: "red" }}>{phoneError}</p>}
            <label>
              Digite este filtro{" "}
              <span style={filterStyle}>{book.filters[1]}</span> do livro "
              {book.name}" no campo abaixo confirmar o pedido
              <input
                type="text"
                required
                name="filterString"
                onChange={handleFilterString}
              />
            </label>
            <div>
              <FlashMessage message={message} />
            </div>
            <div className="buttons">
              <button type="button" onClick={closeModal}>
                Cancelar
              </button>
              <button type="submit">Salvar</button>
            </div>
          </form> */}
        </div>
      </div>
    );
  return null;
};

export default GetBookModal;
