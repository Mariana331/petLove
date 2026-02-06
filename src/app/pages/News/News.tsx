import Title from "../../components/Title/Title";
import SearchField from "../../components/SearchField/SearchField";
import Pagination from "../../components/Pagination/Pagination";
import type { NewsResponse } from "../../services/news";
import css from "./News.module.css";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useState } from "react";
import { getNews } from "../../services/news";
import NewList from "../../components/NewsList/NewsList";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

function News() {
  const [page, setPage] = useState(1);
  const limit = 6;
  const keyword = "";

  const { data, isLoading, isError } = useQuery<NewsResponse>({
    queryKey: ["results", page, limit, keyword],
    queryFn: () => getNews({ page, limit, keyword }),
    placeholderData: keepPreviousData,
  });
  return (
    <div className={css.news}>
      <div className="container">
        <div className={css.box_top}>
          <Title title="News" />
          <SearchField />
        </div>
        {data && <NewList results={data.results} />}
        {!isLoading && data && data.results.length === 0 && (
          <p>No news found for this filter.</p>
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
  );
}

export default News;
