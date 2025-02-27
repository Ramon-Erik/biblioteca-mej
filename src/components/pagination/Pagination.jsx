import css from "./Pagination.module.css";
import Book from "../../components/book/Book";

const Pagination = ({
  auth,
  setMsg,
  books,
  descIndex,
  handleShowDescription,
}) => {
  return (
    <ul className="catalog">
      {books.map((book, index) => (
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
  );
};

export default Pagination;
