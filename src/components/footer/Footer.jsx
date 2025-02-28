import instagram from "../../assets/icons8-instagram.svg"

import { Link } from "react-router-dom"
import css from "./Footer.module.css"

const Footer = ({auth = {email: "null"}}) => {
  return (
    <footer className={css.container}>
      <div className="rights text-center">
        <p>Todos os direitos reservados &copy;</p>
      </div>
      <div className={`${css.medias} text-center`}>
        <p>Conheça o instagram do mej: <Link target="_blank" to="https://www.instagram.com/mej_mpe/"><img src={instagram} alt="Icone Instagram" /></Link></p>
      </div>
    </footer>
  )
}

export default Footer