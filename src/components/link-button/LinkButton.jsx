import { Link } from "react-router-dom";
import css from "./LinkButton.module.css";

const LinkButton = ({ text, link }) => {
  return (
    <Link className={css.link} to={link}>
      {text}
    </Link>
  );
};

export default LinkButton;
