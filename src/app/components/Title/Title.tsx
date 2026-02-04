import css from "./Title.module.css";

interface TitleProps {
  title: string;
}

export function Title({ title }: TitleProps) {
  return (
    <div className={css.title}>
      <h2 className={css.title_text}>{title}</h2>
    </div>
  );
}

export default Title;
