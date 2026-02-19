import css from "./NoticesFilters.module.css";
import SearchField from "../SearchField/SearchField";
import LocationField from "../LocationField/LocationField";
import Select from "react-select";

interface NoticesFilterProps {
  keyword: string;
  category: string;
  locationId: string;
  species: string;
  sex: string;
  byPopularity: boolean | null;
  byPrice: boolean | null;
  onSubmitKeyword: (value: string) => void;
  onSubmitLocation: (value: string) => void;
  onSubmitCategory: (value: string) => void;
  onSubmitSpecies: (value: string) => void;
  onSubmitSex: (value: string) => void;
  onSubmitByPopularity: (value: boolean | null) => void;
  onSubmitByPrice: (value: boolean | null) => void;
}

function NoticesFilter({
  keyword,
  locationId,
  category,
  species,
  sex,
  byPopularity,
  byPrice,
  onSubmitKeyword,
  onSubmitLocation,
  onSubmitCategory,
  onSubmitSpecies,
  onSubmitSex,
  onSubmitByPopularity,
  onSubmitByPrice,
}: NoticesFilterProps) {
  const categoryOptions = [
    { value: "", label: "Show all" },
    { value: "sell", label: "Sell" },
    { value: "free", label: "Free" },
    { value: "lost", label: "Lost" },
    { value: "found", label: "Found" },
  ];

  const genderOptions = [
    { value: "", label: "Show all" },
    { value: "unknown", label: "Unknown" },
    { value: "female", label: "Female" },
    { value: "male", label: "Male" },
    { value: "multiple", label: "Multiple" },
  ];

  const typeOptions = [
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
  ];

  return (
    <div className={css.notices_filter}>
      <div className={css.forms}>
        <div className={css.search_form}>
          <SearchField value={keyword} onSubmit={onSubmitKeyword} />
        </div>

        <div className={css.second_box_form}>
          <div className={css.form_category}>
            <Select
              unstyled
              placeholder="Category"
              value={
                category
                  ? categoryOptions.find((opt) => opt.value === category)
                  : null
              }
              options={categoryOptions}
              onChange={(option) => onSubmitCategory(option?.value ?? "")}
              classNames={{
                control: () => css.control_category,
                valueContainer: () => css.valueContainer,
                singleValue: () => css.singleValue,
                indicatorsContainer: () => css.indicators,
                option: (state) =>
                  state.isSelected ? css.optionSelected : css.option,
                menu: () => css.menu,
                placeholder: () => css.placeholder,
              }}
            />
          </div>

          <div className={css.form_gender}>
            <Select
              unstyled
              placeholder="Gender"
              value={
                sex ? genderOptions.find((opt) => opt.value === sex) : null
              }
              options={genderOptions}
              onChange={(option) => onSubmitSex(option?.value ?? "")}
              classNames={{
                control: () => css.control_category,
                valueContainer: () => css.valueContainer,
                singleValue: () => css.singleValue,
                option: (state) =>
                  state.isSelected ? css.optionSelected : css.option,
                menu: () => css.menu,
                placeholder: () => css.placeholder,
              }}
            />
          </div>
        </div>

        <div className={css.form_type}>
          <Select
            unstyled
            placeholder="By type"
            value={
              species ? typeOptions.find((opt) => opt.value === species) : null
            }
            options={typeOptions}
            onChange={(option) => onSubmitSpecies(option?.value ?? "")}
            classNames={{
              control: () => css.control_category,
              valueContainer: () => css.valueContainer,
              singleValue: () => css.singleValue,
              option: (state) =>
                state.isSelected ? css.optionSelected : css.option,
              menu: () => css.menu,
              placeholder: () => css.placeholder,
            }}
          />
        </div>

        <div className={css.form_location}>
          <LocationField value={locationId} onSubmit={onSubmitLocation} />
        </div>
      </div>
      <div className={css.form_radio}>
        <label
          className={`${css.radio_btn} ${byPopularity === false ? css.checked : ""}`}
        >
          <input
            type="radio"
            name="type"
            value="popular"
            checked={byPopularity === false}
            onChange={() => onSubmitByPopularity(false)}
          />
          Popular
          {byPopularity !== null && (
            <button
              className={css.btn_close}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onSubmitByPopularity(null);
              }}
            >
              <svg
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
            </button>
          )}
        </label>

        <label
          className={`${css.radio_btn} ${byPopularity === true ? css.checked : ""}`}
        >
          <input
            type="radio"
            name="type"
            value="unpopular"
            checked={byPopularity === true}
            onChange={() => onSubmitByPopularity(true)}
          />
          Unpopular
          {byPopularity !== null && (
            <button
              className={css.btn_close}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onSubmitByPopularity(null);
              }}
            >
              <svg
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
            </button>
          )}
        </label>

        <label
          className={`${css.radio_btn} ${byPrice === true ? css.checked : ""}`}
        >
          <input
            type="radio"
            name="type"
            value="cheap"
            checked={byPrice === true}
            onChange={() => onSubmitByPrice(true)}
          />
          Cheap
          {byPrice !== null && (
            <button
              className={css.btn_close}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onSubmitByPrice(null);
              }}
            >
              <svg
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
            </button>
          )}
        </label>

        <label
          className={`${css.radio_btn} ${byPrice === false ? css.checked : ""}`}
        >
          <input
            type="radio"
            name="type"
            value="expensive"
            checked={byPrice === false}
            onChange={() => onSubmitByPrice(false)}
          />
          Expensive
          {byPrice !== null && (
            <button
              className={css.btn_close}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onSubmitByPrice(null);
              }}
            >
              <svg
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
            </button>
          )}
        </label>
      </div>
    </div>
  );
}

export default NoticesFilter;
