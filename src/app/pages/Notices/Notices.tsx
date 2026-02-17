import css from "./Notices.module.css";
import Title from "../../components/Title/Title";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import NoticesList from "../../components/NoticesList/NoticesList";
import NoticesFilter from "../../components/NoticesFilters/NoticesFilters";
import Pagination from "../../components/Pagination/Pagination";
import { useState } from "react";
import type { NoticeResponse } from "../../services/notices";
import type { Notice } from "../../types/notices";
import {
  getNotices,
  getNoticeById,
  addFavorite,
  deleteFavorite,
} from "../../services/notices";
import ModalAttention from "../../components/ModalAttention/ModalAttention";
import Modal from "../../components/Modal/Modal";
import ModalNotice from "../../components/ModalNotice/ModalNotice";
import { useModalStore } from "../../stores/modalStore";

interface NoticesProps {
  isAuth: boolean;
}

function Notices({ isAuth }: NoticesProps) {
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const limit = 6;

  const { isOpen, type, notice, openModal, closeModal } = useModalStore();
  const openAttentionModal = () => openModal("attention");

  const { data, isLoading, isError } = useQuery<NoticeResponse>({
    queryKey: ["results", page, limit, keyword, location],
    queryFn: () => getNotices({ page, limit, keyword, location }),
    placeholderData: keepPreviousData,
  });

  const handleLearnMore = async (result: Notice) => {
    if (!isAuth) {
      openAttentionModal();
      return;
    }
    try {
      const notice = await getNoticeById(result._id);
      openModal("result", notice);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleFavorite = async (result: Notice) => {
    if (!isAuth) {
      openAttentionModal();
      return;
    }

    try {
      if (result.favorites) {
        await deleteFavorite(result._id);
      } else {
        await addFavorite(result._id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={css.notices}>
      <div className="container">
        <div className={css.notices_container}>
          <Title title="Find your favorite pet" />
          <NoticesFilter
            keyword={keyword}
            location={location}
            onSubmitKeyword={(value) => {
              setKeyword(value);
              setPage(1);
            }}
            onSubmitLocation={(value) => {
              setLocation(value);
              setPage(1);
            }}
          />
          {data && (
            <NoticesList
              results={data.results}
              handleLearnMore={handleLearnMore}
              toggleFavorite={toggleFavorite}
            />
          )}
          {!isLoading && data && data.results.length === 0 && (
            <p>No pets found for this filter.</p>
          )}
          {isError && <ErrorMessage />}
          {data && data.totalPages > 1 && (
            <Pagination
              page={page}
              totalPages={data.totalPages}
              onChange={setPage}
            />
          )}
          {isOpen && (
            <Modal onClose={closeModal}>
              {type === "attention" && <ModalAttention onClose={closeModal} />}
              {type === "result" && notice && (
                <ModalNotice
                  notice={notice}
                  onClose={closeModal}
                  toggleFavorite={toggleFavorite}
                />
              )}
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
}

export default Notices;
