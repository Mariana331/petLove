import css from "./UserBlock.module.css";
import EditUserBtn from "../EditUserBtn/EditUserBtn";
import { useState } from "react";
import type { ChangeEvent } from "react";

interface UserBlockProps {
  userName: string;
  userEmail: string;
}

function UserBlock({ userName, userEmail }: UserBlockProps) {
  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
  };
  return (
    <div className={css.user_block}>
      <EditUserBtn />
      <div className={css.wrapper}>
        <label className={css.uploadBox}>
          {preview ? (
            <img src={preview} alt="User avatar" className={css.avatar} />
          ) : (
            <>
              <div className={css.box_image}>
                <svg className={css.icon_user} width={40} height={40}>
                  <use href="/sprite.svg#icon-user" />
                </svg>
              </div>
              <span className={css.text}>Upload photo</span>
            </>
          )}

          <input type="file" accept="image/*" hidden onChange={handleChange} />
        </label>
      </div>
      <div className={css.form}>
        <p className={css.form_text}>My information</p>
        <form className={css.user_form}>
          <input
            className={css.form_input}
            type="text"
            defaultValue={userName}
          />
          <input
            className={css.form_input}
            type="email"
            defaultValue={userEmail}
          />
          <input
            className={css.form_input_tel}
            type="text"
            placeholder="+380"
          />
        </form>
      </div>
    </div>
  );
}

export default UserBlock;
