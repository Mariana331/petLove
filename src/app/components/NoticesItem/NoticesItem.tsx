import css from "./NoticesItem.module.css";
import type { Notice } from "../../types/notices";
import { useLocation } from "react-router-dom";

interface NoticeItemProps {
  notice: Notice;
  handleLearnMore?: (notice: Notice) => void;
  handleDeleteFavorite?: (notice: Notice) => void;
  toggleFavorite?: (notice: Notice) => void;
  showHeart?: boolean;
  showTrash?: boolean;
  isFavorite?: boolean;
}

function NoticeItem({
  notice,
  handleLearnMore,
  handleDeleteFavorite,
  toggleFavorite,
  isFavorite,
  showHeart = false,
  showTrash = false,
}: NoticeItemProps) {
  const date = new Date(notice.birthday).toLocaleDateString("uk-UA");

  const handleToggle = () => {
    toggleFavorite?.(notice);
  };
  const location = useLocation();
  const isProfile = location.pathname === "/profile";

  return (
    <div className={isProfile ? css.notice_item_profile : css.notice_item}>
      <div className={isProfile ? css.notice_image_profile : css.notice_image}>
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
          <p className={css.price}>${notice.price ? notice.price : "0.00"}</p>
          <div className={css.notice_btn}>
            <button
              className={css.more_btn}
              type="button"
              onClick={() => handleLearnMore?.(notice)}
            >
              Learn more
            </button>

            {showTrash && (
              <button
                type="button"
                className={css.heart_btn}
                onClick={() => handleDeleteFavorite?.(notice)}
              >
                <svg className={css.icon_trash} width={18} height={18}>
                  <use href="/sprite.svg#icon-trash" />
                </svg>
              </button>
            )}

            {showHeart && (
              <button
                type="button"
                className={css.heart_btn}
                onClick={handleToggle}
              >
                <svg
                  className={isFavorite ? css.active_heart : css.icon_heart}
                  width={18}
                  height={18}
                >
                  <use href="/sprite.svg#icon-heart" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoticeItem;
