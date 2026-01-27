import css from "./Logo.module.css";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <div className={css.logo}>
      <Link to="/home" aria-label="Home" className={css.logo_text}>
        petl
        <svg className={css.logo_icon} width={44} height={44}>
          <use href="/sprite.svg#icon-heart" />
        </svg>
        ve
      </Link>
    </div>
  );
}

export default Logo;
