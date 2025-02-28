import instagram from "../../assets/icons8-instagram.svg";

import { Link } from "react-router-dom";
import { logOut } from "../../firebase/firebase.config";

import css from "./Footer.module.css";

const Footer = ({ auth = { email: "null" } }) => {
  return (
    <footer className={css.container}>
      <div className="rights text-center">
        <p>Todos os direitos reservados &copy;</p>
      </div>
      {auth.email === "mej@mpe.com" && (
        <div className="text-center">
          <p onClick={logOut}>Sair da conta</p>
        </div>
      )}
      <div className={`${css.medias} text-center`}>
        <p>
          MEJ Maaranguape:{" "}
          <Link target="_blank" to="https://www.instagram.com/mej_mpe/">
            <img src={instagram} alt="Icone Instagram" />
          </Link>
        </p>
        <p>
          Nossa paróquia:{" "}
          <Link
            target="_blank"
            to="https://www.instagram.com/senhoradapenha_mpe/"
          >
            <img src={instagram} alt="Icone Instagram" />
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
