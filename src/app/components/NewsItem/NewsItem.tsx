import css from "./NewsItem.module.css";
import type { NewResult } from "../../types/news";

interface NewsItemProps {
  result: NewResult;
}

function NewsItem({ result }: NewsItemProps) {
  const formattedDate = new Date(
    result.date.replace("+0000", "Z"),
  ).toLocaleDateString("uk-UA");

  return (
    <div className={css.news_item}>
      <div className={css.new_image}>
        <img src={result.imgUrl} alt="photo" />
      </div>
      <div className={css.new_info}>
        <h3 className={css.new_title}>{result.title}</h3>
        <p className={css.new_text}>{result.text}</p>
      </div>
      <div className={css.new_data}>
        {formattedDate}
        <div>
          <p className={css.data}></p>
        </div>
        <div>
          <a
            className={css.link}
            href={result.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Read more
          </a>
        </div>
      </div>
    </div>
  );
}

export default NewsItem;
