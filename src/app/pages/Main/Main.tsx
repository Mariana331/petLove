import css from "./Main.module.css";
import { useLoaderStore } from "../../stores/loaderStore";
import { useNavigate } from "react-router-dom";

function Main() {
  const navigate = useNavigate();
  const start = useLoaderStore((s) => s.start);
  const finish = useLoaderStore((s) => s.finish);

  const handleClick = () => {
    start();
    navigate("/home");
    finish();
  };

  return (
    <div className={css.layout_wrapper}>
      <div className={css.layout_logo}>
        <button
          type="button"
          className={css.layout_logo_text}
          onClick={handleClick}
        >
          petl
          <svg className={css.layout_logo_icon} width={36} height={31}>
            <use href="/sprite.svg#icon-heart" />
          </svg>
          ve
        </button>
      </div>
    </div>
  );
}

export default Main;
