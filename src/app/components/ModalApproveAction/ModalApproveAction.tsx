import css from "./ModalApproveAction.module.css";

interface ModalApproveActionProps {
  onClose: () => void;
  onLogOut: () => void;
}

function ModalApproveAction({ onClose, onLogOut }: ModalApproveActionProps) {
  return (
    <div className={css.modal_approve}>
      <button className={css.btn_close} type="button" onClick={onClose}>
        <svg width={24} height={24} className={css.icon_cross}>
          <use href="/sprite.svg#icon-cross"></use>
        </svg>
      </button>
      <div className={css.modal_image}>
        <img className={css.image} src="/title/cat.jpg" alt="cat" />
      </div>
      <div className={css.modal_box}>
        <h3 className={css.modal_title}>Already leaving?</h3>
        <div className={css.modal_btn}>
          <button className={css.btn_yes} type="button" onClick={onLogOut}>
            Yes
          </button>
          <button className={css.btn_cancel} type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalApproveAction;
