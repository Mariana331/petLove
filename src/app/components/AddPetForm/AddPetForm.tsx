import css from "./AddPetForm.module.css";

export function AddPetForm() {
  return (
    <form className={css.pet_form}>
      <h2 className={css.form_title}>
        Add my pet / <span className={css.form_span}>Personal details</span>
      </h2>
      <fieldset className={css.form_box_radios}>
        <legend className={css.visually_hidden}>Pet gender</legend>

        <label className={css.form_radio_first}>
          <input type="radio" name="gender" value="female" />
          <svg width={20} height={20} className={css.radio_icon_first}>
            <use href="/sprite.svg#icon-female" />
          </svg>
        </label>

        <label className={css.form_radio_second}>
          <input type="radio" name="gender" value="male" />
          <svg width={20} height={20} className={css.radio_icon_second}>
            <use href="/sprite.svg#icon-male" />
          </svg>
        </label>

        <label className={css.form_radio_third}>
          <input type="radio" name="gender" value="reproductive" />
          <svg width={20} height={20} className={css.radio_icon_third}>
            <use href="/sprite.svg#icon-reproductive" />
          </svg>
        </label>
      </fieldset>
      <div className={css.form_image}>
        <svg width={34} height={34} className={css.image_icon}>
          <use href="/sprite.svg#icon-cat-footprint" />
        </svg>
      </div>
      <div className={css.wrapper_url}>
        <input
          type="url"
          placeholder="Enter URL"
          className={css.wrapper_url_input}
        />
        <label className={css.wrapper_label}>
          Upload photo
          <input type="file" accept="image/*" hidden />
          <svg width={18} height={18} className={css.wrapper_url_icon}>
            <use href="/sprite.svg#icon-cloud" />
          </svg>
        </label>
      </div>
      <div className={css.wrapper_form}>
        <input
          type="text"
          placeholder="Title"
          className={css.wrapper_form_input}
        />
        <input
          type="name"
          placeholder="Pet’s Name"
          className={css.wrapper_form_input}
        />
      </div>
      <div className={css.wrapper_data_type}>
        <label className={css.wrapper_data_label}>
          00.00.0000
          <input type="date" hidden />
          <svg width={15} height={15} className={css.wrapper_data_icon}>
            <use href="/sprite.svg#icon-calendar" />
          </svg>
        </label>
        <label className={css.wrapper_data_label}>
          <select
            className={css.wrapper_select}
            name="TypeOfPet"
            defaultValue=""
          >
            <option value="" disabled hidden>
              Type of pet
            </option>
            <option value="">Dog</option>
            <option value="">Cat</option>
            <option value="">Monkey</option>
          </select>
          <svg width={18} height={18} className={css.select_icon}>
            <use href="/sprite.svg#icon-chevron" />
          </svg>
        </label>
      </div>
      <div className={css.form_btns}>
        <button className={css.btn_submit} type="submit">
          Submit
        </button>
        <button className={css.btn_back} type="button">
          Back
        </button>
      </div>
    </form>
  );
}

export default AddPetForm;
