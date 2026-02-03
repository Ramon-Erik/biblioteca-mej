import css from "./LoadingBooks.module.css";

const LoadingBooks = ({ loading = true, books = [], filtered = [] }) => {
  return (
    <div className={css.containerWarning}>
      {loading && (
        <p className={css.warning}>
          Carregando
          <span className={css.dot}>.</span>
          <span className={css.dot}>.</span>
          <span className={css.dot}>.</span>
        </p>
      )}

      {!loading && books.length === 0 && (
        <p className={css.warning}>
          Parece que a biblioteca está sem livros
          <span className={css.dot}>.</span>
          <span className={css.dot}>.</span>
          <span className={css.dot}>.</span>
        </p>
      )}

      {!loading && books.length > 0 && filtered.length === 0 && (
        <p className={css.warning}>
          Não tem livros para esse filtro
          <span className={css.dot}>.</span>
          <span className={css.dot}>.</span>
          <span className={css.dot}>.</span>
        </p>
      )}
    </div>
  );
};

export default LoadingBooks;
