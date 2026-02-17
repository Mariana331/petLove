import css from "./Main.module.css";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader/Loader";

function Main() {
  return (
    <div className={css.layout_wrapper}>
      <div className={css.layout_logo}>
        <Link to="/home" aria-label="Home" className={css.layout_logo_text}>
          petl
          <svg className={css.layout_logo_icon} width={36} height={31}>
            <use href="/sprite.svg#icon-heart" />
          </svg>
          ve
        </Link>
        {<Loader />}
      </div>
    </div>
  );
}

export default Main;
