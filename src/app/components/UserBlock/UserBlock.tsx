import css from "./UserBlock.module.css";
import EditUserBtn from "../EditUserBtn/EditUserBtn";
import type { User } from "../../types/users";

interface UserBlockProps {
  user: User;
  openEditUserModal: () => void;
}

function UserBlock({ user, openEditUserModal }: UserBlockProps) {
  return (
    <div className={css.user_block}>
      <EditUserBtn openEditUserModal={openEditUserModal} user={user} />
      <div className={css.wrapper}>
        <label className={css.uploadBox}>
          {user.avatar ? (
            <img src={user.avatar} alt="User avatar" className={css.avatar} />
          ) : (
            <div className={css.box_image}>
              <svg className={css.icon_user} width={40} height={40}>
                <use href="/sprite.svg#icon-user" />
              </svg>
            </div>
          )}
        </label>
      </div>
      <div className={css.form}>
        <p className={css.form_text}>My information</p>
        <div className={css.user_form}>
          <div className={css.wrapper_text}>
            <p className={css.profile_text}>{user.name}</p>
          </div>

          <div className={css.wrapper_text}>
            <p className={css.profile_text}> {user.email}</p>
          </div>

          <input
            className={css.form_input_tel}
            type="text"
            placeholder="+380"
            disabled
          />
        </div>
      </div>
    </div>
  );
}

export default UserBlock;
