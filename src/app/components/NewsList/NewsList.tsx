import css from "./NewsList.module.css";
import NewsItem from "../NewsItem/NewsItem";
import type { NewResult } from "../../types/news";

interface NewListProps {
  results: NewResult[];
}

function NewList({ results }: NewListProps) {
  return (
    <div className={css.news_list}>
      {results.map((result) => (
        <NewsItem key={result._id || result.id} result={result} />
      ))}
    </div>
  );
}

export default NewList;
