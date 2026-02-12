import css from "./ModalAttention.module.css";
import { Link } from "react-router-dom";

function ModalAttention() {
  return (
    <div className={css.modal_attention}>
      <button className={css.btn_close} type="button">
        <svg width={14} height={14} className={css.icon_cross}>
          <use href="/sprite.svg#icon-cross"></use>
        </svg>
      </button>
      <div className={css.image}>
        <img className={css.image_dog} src="/title/dog.jpg" alt="dog" />
      </div>
      <div className={css.modal_box}>
        <h3 className={css.modal_title}>Attention</h3>
        <p className={css.modal_text}>
          We would like to remind you that certain functionality is available
          only to authorized users.If you have an account, please log in with
          your credentials. If you do not already have an account, you must
          register to access these features.
        </p>
        <div className={css.modal_btns}>
          <Link className={css.modal_login} to="/login"></Link>
          <Link className={css.modal_register} to="/register"></Link>
        </div>
      </div>
    </div>
  );
}

export default ModalAttention;
