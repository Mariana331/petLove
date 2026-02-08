import css from "./NoticesItem.module.css";
import type { Notice } from "../../types/notices";

interface NoticeItemProps {
  notice: Notice;
}

function NoticeItem({ notice }: NoticeItemProps) {
  const date = new Date(notice.birthday).toLocaleDateString("uk-UA");
  return (
    <div className={css.notice_item}>
      <div className={css.notice_image}>
        <img src={notice.imgURL} alt={notice.name} />
      </div>
      <div className={css.notice_info}>
        <div className={css.notice_title}>
          <h3 className={css.title}>{notice.title}</h3>
          <div className={css.pop}>
            <svg className={css.icon_star} width={16} height={16}>
              <use href="/sprite.svg#icon-star" />
            </svg>
            <p className={css.popularity}>{notice.popularity}</p>
          </div>
        </div>
        <div className={css.notice_second_box}>
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
          <div className={css.name}>
            <p className={css.text}>
              Category <br></br>
              <span className={css.text_span}>{notice.category}</span>
            </p>
          </div>
        </div>
        <div className={css.notice_comment}>
          <p className={css.comment}>{notice.comment}</p>
        </div>
        <div className={css.notice_price}>
          <p className={css.price}>
            ${notice.price ? notice.price : "no price"}
          </p>
          <div className={css.notice_btn}>
            <button className={css.more_btn} type="button">
              Learn more
            </button>
            <button className={css.heart_btn}>
              <svg className={css.icon_heart} width={18} height={18}>
                <use href="/sprite.svg#icon-heart" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoticeItem;
