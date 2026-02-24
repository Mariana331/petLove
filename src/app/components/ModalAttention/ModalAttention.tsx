import css from "./ModalAttention.module.css";
import { Link } from "react-router-dom";

interface ModalAttentionProps {
  onClose: () => void;
}

function ModalAttention({ onClose }: ModalAttentionProps) {
  return (
    <div className={css.modal_attention}>
      <button className={css.btn_close} type="button" onClick={onClose}>
        <svg width={24} height={24} className={css.icon_cross}>
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
          <button type="button" onClick={onClose}>
            <Link to="/login"> Log In</Link>
          </button>
          <button
            type="button"
            className={css.modal_register}
            onClick={onClose}
          >
            <Link to="/register"> Registration</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalAttention;
