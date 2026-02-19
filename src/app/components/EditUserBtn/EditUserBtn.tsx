import css from "./EditUserBtn.module.css";
import type { User } from "../../types/users";

interface EditUserBtn {
  openEditUserModal: () => void;
  user: User;
}

function EditUserBtn({ openEditUserModal, user }: EditUserBtn) {
  return (
    <div className={css.edit_user_btn}>
      <div className={css.user}>
        <p className={css.text}>{user.name}</p>
        <svg className={css.icon_user} width={18} height={18}>
          <use href="/sprite.svg#icon-user" />
        </svg>
      </div>
      <button
        className={css.edit_btn}
        type="button"
        onClick={openEditUserModal}
      >
        <svg className={css.icon_edit} width={18} height={18}>
          <use href="/sprite.svg#icon-edit" />
        </svg>
      </button>
    </div>
  );
}

export default EditUserBtn;
