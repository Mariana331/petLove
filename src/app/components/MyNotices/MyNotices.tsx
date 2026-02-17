import css from "./MyNotices.module.css";
import type { Notice } from "../../types/notices";
import NoticeItem from "../NoticesItem/NoticesItem";
import { deleteFavorite } from "../../services/notices";
import { useModalStore } from "../../stores/modalStore";
import { useState } from "react";

type Tab = "favorites" | "viewed";

interface MyNoticesProps {
  favoriteNotices: Notice[];
  viewedNotices: Notice[];
  onRemoveFavorite?: (noticeId: string) => void;
}

function MyNotices({
  favoriteNotices,
  viewedNotices,
  onRemoveFavorite,
}: MyNoticesProps) {
  const [activeTab, setActiveTab] = useState<Tab>("favorites");

  const { openModal } = useModalStore();

  const handleDeleteFavorite = async (notice: Notice) => {
    await deleteFavorite(notice._id);
    if (onRemoveFavorite) onRemoveFavorite(notice._id);
  };

  const handleLearnMore = (notice: Notice) => {
    openModal("result", notice);
  };

  const noticesToRender =
    activeTab === "favorites" ? favoriteNotices : viewedNotices;

  return (
    <div className={css.my_notices}>
      <div className={css.tabs}>
        <button
          type="button"
          className={`${css.favorites} ${activeTab === "favorites" ? css.active : ""}`}
          onClick={() => setActiveTab("favorites")}
        >
          My favorite pets
        </button>
        <button
          className={`${css.viewed} ${activeTab === "viewed" ? css.active : ""}`}
          onClick={() => setActiveTab("viewed")}
        >
          Viewed
        </button>
      </div>

      <ul className={css.list}>
        {noticesToRender.map((notice) => (
          <NoticeItem
            key={notice._id}
            notice={notice}
            handleLearnMore={handleLearnMore}
            toggleFavorite={() => handleDeleteFavorite(notice)}
            showTrash={activeTab === "favorites"}
          />
        ))}
      </ul>

      {activeTab === "favorites" && favoriteNotices.length === 0 && (
        <div className={css.favorite_text}>
          <p className={css.text}>
            Oops,{" "}
            <span className={css.span}>
              looks like there aren't any furries
            </span>{" "}
            on our adorable page yet. Do not worry! View your pets on the "find
            your favorite pet" page and add them to your favorites.
          </p>
        </div>
      )}
    </div>
  );
}

export default MyNotices;
