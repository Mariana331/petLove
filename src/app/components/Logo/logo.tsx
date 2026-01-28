import css from "./Logo.module.css";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import { useState } from "react";

function Logo() {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className={css.logo}>
      <Link
        to="/home"
        aria-label="Home"
        className={css.logo_text_home}
        onClick={() => setIsLoading(true)}
      >
        petl
        <svg className={css.logo_icon_home} width={14} height={12}>
          <use href="/sprite.svg#icon-heart" />
        </svg>
        ve
      </Link>
      {isLoading && <Loader />}
    </div>
  );
}

export default Logo;
