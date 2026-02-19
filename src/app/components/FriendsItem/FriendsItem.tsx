import css from "./FriendsItem.module.css";
import type { Friend } from "../../types/friends";

interface FriendsItemProps {
  friend: Friend;
}

function FriendsItem({ friend }: FriendsItemProps) {
  return (
    <div className={css.friends_item}>
      <div className={css.time}>
        {(() => {
          const openDay = friend.workDays?.find((day) => day.isOpen);

          return openDay ? (
            <p className={css.text_time}>
              {openDay.from} - {openDay.to}
            </p>
          ) : (
            <p className={css.text_time}>Day and night</p>
          );
        })()}
      </div>

      <div className={css.image}>
        <img src={friend.imageUrl} alt={friend.title} />
      </div>

      <div className={css.friends_info}>
        <h3 className={css.friends_title}>{friend.title}</h3>

        <ul className={css.friends_data}>
          <li className={css.friend_item}>
            Email:{" "}
            <span className={css.span_text}>
              <a
                href={
                  friend.email ? `mailto:${friend.email}` : friend.addressUrl
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                {friend.email ? friend.email : "website only"}
              </a>
            </span>
          </li>

          <li className={css.friend_item}>
            Address:{" "}
            <span className={css.span_text}>
              <a
                href={friend.address ? friend.addressUrl : "#"}
                target="_blank"
                rel="noopener noreferrer"
              >
                {friend.address ? friend.address : "website only"}
              </a>
            </span>
          </li>

          <li className={css.friend_item}>
            Phone:{" "}
            <span className={css.span_text}>
              <a
                href={friend.phone ? `tel:${friend.phone}` : friend.addressUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {friend.phone ? friend.phone : "website only"}
              </a>
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default FriendsItem;
