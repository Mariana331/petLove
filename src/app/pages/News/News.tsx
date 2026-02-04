import Title from "../../components/Title/Title";
import SearchField from "../../components/SearchField/SearchField";
import css from "./News.module.css";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getNews } from "../../services/news";
import NewList from "../../components/NewsList/NewsList";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

function News() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["results"],
    queryFn: () => getNews(),
    placeholderData: keepPreviousData,
  });
  return (
    <div className={css.news}>
      <div className="container">
        <div className={css.box_top}>
          <Title title="News" />
          <SearchField />
        </div>
        {data && <NewList results={data} />}
        {!isLoading && data && data.length === 0 && (
          <p>No news found for this filter.</p>
        )}
        {isError && <ErrorMessage />}
      </div>
    </div>
  );
}

export default News;
