import css from "./NoticesFilters.module.css";
import SearchField from "../SearchField/SearchField";
import Select from "react-select";

interface NoticesFilterProps {
  value: string;
  onSubmit: (value: string) => void;
}

function NoticesFilter({ value, onSubmit }: NoticesFilterProps) {
  return (
    <div className={css.notices_filter}>
      <div className={css.forms}>
        <div className={css.search_form}>
          <SearchField value={value} onSubmit={onSubmit} />
        </div>
        <div className={css.second_box_form}>
          <div className={css.form_category}>
            <Select
              options={[
                { value: "", label: "Show all" },
                { value: "sell", label: "Sell" },
                { value: "free", label: "Free" },
                { value: "lost", label: "Lost" },
                { value: "found", label: "Found" },
              ]}
              onChange={(option) => onChange(option?.value ?? "")}
            />
          </div>
          <div className={css.form_gender}>
            <Select
              options={[
                { value: "", label: "Show all" },
                { value: "unknown", label: "Unknown" },
                { value: "female", label: "Female" },
                { value: "male", label: "Male" },
                { value: "multiple", label: "Multiple" },
              ]}
              onChange={(option) => onChange(option?.value ?? "")}
            />
          </div>
        </div>
        <div className={css.form_type}>
          <Select
            options={[
              { value: "", label: "Show all" },
              { value: "dog", label: "Dog" },
              { value: "cat", label: "Cat" },
              { value: "monkey", label: "Monkey" },
              { value: "bird", label: "Bird" },
              { value: "snake", label: "Snake" },
              { value: "turtle", label: "Turtle" },
              { value: "lizard", label: "Lizard" },
              { value: "frog", label: "Frog" },
              { value: "fish", label: "Fish" },
              { value: "ants", label: "Ants" },
              { value: "bees", label: "Bees" },
              { value: "butterfly", label: "Butterfly" },
              { value: "spider", label: "Spider" },
              { value: "scorpion", label: "Scorpion" },
            ]}
            onChange={(option) => onChange(option?.value ?? "")}
          />
        </div>
        <div className={css.form_location}>
          <Select />
        </div>
      </div>
      <div className={css.form_radio}>
        <label className={css.radio_btn}>
          <input
            type="radio"
            name="gender"
            value="popular"
            checked={value === "popular"}
            onChange={() => onChange("popular")}
          />
          Popular
          <svg
            onClick={(e) => {
              e.stopPropagation();
              onChange("");
            }}
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={css.close_icon}
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </label>

        <label className={css.radio_btn}>
          <input
            type="radio"
            name="gender"
            value="unpopular"
            checked={value === "unpopular"}
            onChange={() => onChange("unpopular")}
          />
          Unpopular
          <svg
            onClick={(e) => {
              e.stopPropagation();
              onChange("");
            }}
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={css.close_icon}
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </label>

        <label className={css.radio_btn}>
          <input
            type="radio"
            name="gender"
            value="female"
            checked={value === "cheap"}
            onChange={() => onChange("cheap")}
          />
          Cheap
          <svg
            onClick={(e) => {
              e.stopPropagation();
              onChange("");
            }}
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={css.close_icon}
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </label>
        <label className={css.radio_btn}>
          <input
            type="radio"
            name="gender"
            value="female"
            checked={value === "expensive"}
            onChange={() => onChange("expensive")}
          />
          Expensive
          <svg
            onClick={(e) => {
              e.stopPropagation();
              onChange("");
            }}
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={css.close_icon}
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </label>
      </div>
    </div>
  );
}

export default NoticesFilter;
