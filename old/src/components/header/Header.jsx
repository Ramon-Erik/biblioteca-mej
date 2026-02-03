import { Link } from "react-router-dom";
import logoMej from "../../assets/logo-mej.png";
import css from "./Header.module.css";

const Header = ({link="/"}) => {
  return (
    <header>
      <div className={css.container}>
        <div className={css.logo}>
          <Link to={link}>
            <img
              src={logoMej}
              width="40px"
              alt="Logo Movmento Eucarístico Jovem"
            />
          </Link>
        </div>
        <div className={css.title}>
          <h1>
            <span style={{ display: "block" }}>mej</span> maranguape
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
