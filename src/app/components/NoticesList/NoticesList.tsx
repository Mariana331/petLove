import css from "./NoticesList.module.css";
import NoticeItem from "../NoticesItem/NoticesItem";
import type { Notice } from "../../types/notices";

interface NoticesListProps {
  results: Notice[];
}

function NoticesList({ results }: NoticesListProps) {
  return (
    <div className={css.notice_list}>
      {results.map((notice) => (
        <NoticeItem key={notice._id} notice={notice} />
      ))}
    </div>
  );
}

export default NoticesList;
