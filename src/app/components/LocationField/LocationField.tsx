import css from "./LocationField.module.css";
import { useState } from "react";

interface LocationFieldProps {
  value?: string;
  onSubmit: (value: string) => void;
  placeholder?: string;
}

function LocationField({
  value = "",
  onSubmit,
  placeholder = "Location",
}: LocationFieldProps) {
  const [query, setQuery] = useState(value);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(query.trim());
  };
  const handleClear = () => {
    setQuery("");
    onSubmit("");
  };
  return (
    <div className={css.location_field}>
      <form className={css.location} onSubmit={handleSubmit}>
        <input
          className={css.input_location}
          placeholder={placeholder}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className={css.box_icon}>
          {query && (
            <button
              className={css.form_btn}
              type="button"
              onClick={handleClear}
            >
              <svg width={18} height={18} className={css.icon_cross}>
                <use href="/sprite.svg#icon-cross"></use>
              </svg>
            </button>
          )}
          <button
            className={css.form_btn_search}
            type="submit"
            aria-label="Location"
          >
            <svg width={18} height={18} className={css.icon_search}>
              <use href="/sprite.svg#icon-search"></use>
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}

export default LocationField;
