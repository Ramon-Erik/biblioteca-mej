import logoMej from "../../assets/logo-mej.png";
import css from "./Header.module.css";

const Header = () => {
  return (
    <header>
      <div className={css.container}>
        <div className="logo">
          <img
            src={logoMej}
            width="90px"
            alt="Logo Movmento Eucarístico Jovem"
          />
        </div>
        <div className={css.title}>
          <h1>mej - maranguape</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
