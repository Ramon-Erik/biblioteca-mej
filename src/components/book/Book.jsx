import editIcon from "../../assets/edit.svg";
import borrowIcon from "../../assets/borrow.svg";
import deleteIcon from "../../assets/delete.svg";

const Book = ({ book, index, descIndex, handleShowDescription }) => {
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
          <button className="btn edit">
            <img src={editIcon} alt="ìcone de lápis" />
          </button>
          <button className="btn borrow">
            <img src={borrowIcon} alt="ìcone de enviar" />
          </button>
          <button className="btn delete">
            <img src={deleteIcon} alt="ìcone de lixeira" />
          </button>
        </span>
      </p>
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
