import Title from "../../components/Title/Title";
import css from "./Notices.module.css";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import NoticesList from "../../components/NoticesList/NoticesList";
import NoticesFilter from "../../components/NoticesFilters/NoticesFilters";
import Pagination from "../../components/Pagination/Pagination";
import { getNotices } from "../../services/notices";
import { useState } from "react";
import type { NoticeResponse } from "../../services/notices";

function Notices() {
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const limit = 6;

  const { data, isLoading, isError } = useQuery<NoticeResponse>({
    queryKey: ["results", page, limit, keyword, location],
    queryFn: () => getNotices({ page, limit, keyword, location }),
    placeholderData: keepPreviousData,
  });
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
          {data && <NoticesList results={data.results} />}
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
        </div>
      </div>
    </div>
  );
}

export default Notices;
