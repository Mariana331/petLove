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
import { getNotices, getNoticeById } from "../../services/notices";
import ModalAttention from "../../components/ModalAttention/ModalAttention";
import Modal from "../../components/Modal/Modal";
import ModalNotice from "../../components/ModalNotice/ModalNotice";
import { useModalStore } from "../../stores/modalStore";
import { useLoaderStore } from "../../stores/loaderStore";
import { useEffect } from "react";

interface NoticesProps {
  isAuth: boolean;
  toggleFavorite: (notice: Notice) => void;
  isFavorite: string[];
}

function Notices({ isAuth, toggleFavorite, isFavorite }: NoticesProps) {
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [locationId, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [species, setSpecies] = useState("");
  const [sex, setSex] = useState("");
  const [byPopularity, setByPopularity] = useState<boolean | null>(null);
  const [byPrice, setByPrice] = useState<boolean | null>(null);
  const limit = 6;

  const { isOpen, type, notice, openModal, closeModal } = useModalStore();

  const { data, isLoading, isError } = useQuery<NoticeResponse>({
    queryKey: [
      "results",
      page,
      limit,
      keyword,
      category,
      species,
      sex,
      locationId,
      byPopularity,
      byPrice,
    ],
    queryFn: () =>
      getNotices({
        page,
        limit,
        keyword,
        category,
        species,
        sex,
        locationId,
        byPopularity,
        byPrice,
      }),
    placeholderData: keepPreviousData,
  });

  const start = useLoaderStore((s) => s.start);
  const finish = useLoaderStore((s) => s.finish);
  useEffect(() => {
    if (isLoading) start();
    else finish();
  }, [isLoading, start, finish]);

  const handleLearnMore = async (result: Notice) => {
    if (!isAuth) {
      openModal("attention");
      return;
    }
    try {
      const notice = await getNoticeById(result._id);
      openModal("result", notice);
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
            locationId={locationId}
            category={category}
            species={species}
            sex={sex}
            byPopularity={byPopularity}
            byPrice={byPrice}
            onSubmitKeyword={(value) => {
              setKeyword(value);
              setPage(1);
            }}
            onSubmitLocation={(value) => {
              setLocation(value);
              setPage(1);
            }}
            onSubmitCategory={(value) => {
              setCategory(value);
              setPage(1);
            }}
            onSubmitSpecies={(value) => {
              setSpecies(value);
              setPage(1);
            }}
            onSubmitSex={(value) => {
              setSex(value);
              setPage(1);
            }}
            onSubmitByPopularity={(value: boolean | null) => {
              setByPopularity(value);
              setPage(1);
            }}
            onSubmitByPrice={(value: boolean | null) => {
              setByPrice(value);
              setPage(1);
            }}
          />
          {data && (
            <NoticesList
              results={data.results}
              handleLearnMore={handleLearnMore}
              toggleFavorite={toggleFavorite}
              isFavorite={isFavorite}
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
                  isFavorite={isFavorite}
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
