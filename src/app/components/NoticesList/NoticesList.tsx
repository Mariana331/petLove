import css from "./NoticesList.module.css";
import NoticeItem from "../NoticesItem/NoticesItem";
import type { Notice } from "../../types/notices";

interface NoticesListProps {
  results: Notice[];
  handleLearnMore: (notice: Notice) => void;
  toggleFavorite?: (notice: Notice) => void;
}

function NoticesList({
  results,
  handleLearnMore,
  toggleFavorite,
}: NoticesListProps) {
  return (
    <div className={css.notice_list}>
      {results.map((notice) => (
        <NoticeItem
          key={notice._id}
          notice={notice}
          handleLearnMore={handleLearnMore}
          toggleFavorite={toggleFavorite}
          showHeart={true}
        />
      ))}
    </div>
  );
}

export default NoticesList;
