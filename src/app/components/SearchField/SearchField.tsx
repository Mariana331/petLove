import css from "./SearchField.module.css";

function SearchField() {
  return (
    <div className={css.search_field}>
      <form className={css.search_form}>
        <input className={css.input_form} placeholder="Search" type="text" />
        <button className={css.form_btn} type="submit">
          <svg width={18} height={18} className={css.icon_cross}>
            <use href="/sprite.svg#icon-cross"></use>
          </svg>
          <svg width={18} height={18} className={css.icon_search}>
            <use href="/sprite.svg#icon-search"></use>
          </svg>
        </button>
      </form>
    </div>
  );
}

export default SearchField;
