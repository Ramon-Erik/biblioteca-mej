import css from "./Separator.module.css";

const Separator = ({children}) => {
  return (
    <div className={css.separator}>
      <p>{children}</p>
    </div>
  );
};

export default Separator;
