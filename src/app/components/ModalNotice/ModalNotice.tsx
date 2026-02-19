import css from "./ModalNotice.module.css";
import type { Notice } from "../../types/notices";

interface ModalNoticeProps {
  notice: Notice;
  onClose: () => void;
  toggleFavorite: (notice: Notice) => void;
}

function ModalNotice({ notice, onClose, toggleFavorite }: ModalNoticeProps) {
  const date = new Date(notice.birthday).toLocaleDateString("uk-UA");

  return (
    <div className={css.modal_notice}>
      <button className={css.btn_close} type="button" onClick={onClose}>
        <svg width={24} height={24} className={css.icon_cross}>
          <use href="/sprite.svg#icon-cross"></use>
        </svg>
      </button>
      <div className={css.image_box}>
        <div className={css.category}>
          <p className={css.category_text}>{notice.category}</p>
        </div>
        <img className={css.image} src={notice.imgURL} alt={notice.name} />
      </div>
      <div className={css.box_title_pop}>
        <h3 className={css.title}>{notice.title}</h3>
        <ul className={css.popularity}>
          <li className={css.star_icon}>
            <svg className={css.icon_star} width={16} height={16}>
              <use href="/sprite.svg#icon-star" />
            </svg>
          </li>
          <li className={css.star_icon}>
            <svg className={css.icon_star} width={16} height={16}>
              <use href="/sprite.svg#icon-star" />
            </svg>
          </li>
          <li className={css.star_icon}>
            <svg className={css.icon_star} width={16} height={16}>
              <use href="/sprite.svg#icon-star" />
            </svg>
          </li>
          <li className={css.star_icon}>
            <svg className={css.icon_star} width={16} height={16}>
              <use href="/sprite.svg#icon-star" />
            </svg>
          </li>
          <li className={css.star_icon}>
            <svg className={css.icon_star} width={16} height={16}>
              <use href="/sprite.svg#icon-star" />
            </svg>
          </li>
          <li className={css.item_popularity}>{notice.popularity}</li>
        </ul>
      </div>
      <div className={css.box_notice}>
        <div className={css.name}>
          <p className={css.text}>
            Name <br></br>
            <span className={css.text_span}>{notice.name}</span>
          </p>
        </div>
        <div className={css.name}>
          <p className={css.text}>
            Birthday <br></br>
            <span className={css.text_span}>{date}</span>
          </p>
        </div>
        <div className={css.name}>
          <p className={css.text}>
            Sex <br></br>
            <span className={css.text_span}>{notice.sex}</span>
          </p>
        </div>
        <div className={css.name}>
          <p className={css.text}>
            Species <br></br>
            <span className={css.text_span}>{notice.species}</span>
          </p>
        </div>
      </div>
      <div className={css.notice_comment}>
        <p className={css.comment}>{notice.comment}</p>
      </div>
      <div className={css.price}>
        <p className={css.text_price}>
          {" "}
          ${notice.price ? notice.price : "0.00"}
        </p>
        <div className={css.price_box_btn}>
          <div className={css.wrapper}>
            <button
              className={css.add_btn}
              type="button"
              onClick={() => toggleFavorite(notice)}
            >
              Add to
              <svg className={css.icon_heart} width={18} height={18}>
                <use href="/sprite.svg#icon-heart" />
              </svg>
            </button>
          </div>
          <a
            className={css.contact_button}
            href={`/profile/${notice.user}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            Contact
          </a>
        </div>
      </div>
    </div>
  );
}

export default ModalNotice;
