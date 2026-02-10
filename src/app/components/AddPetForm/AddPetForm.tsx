import css from "./AddPetForm.module.css";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { useState } from "react";

interface AddPetFormData {
  title: string;
  name: string;
  imgUrl: string;
  species: string;
  birthday: string;
  sex: string;
}

export const Schema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  name: Yup.string().required("Name is required"),
  imgUrl: Yup.string()
    .url("Invalid URL")
    .matches(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)
    .required("Image URL is required"),
  species: Yup.string().required(),
  birthday: Yup.string()
    .matches(/^\d{4}-\d{2}-\d{2}$/)
    .required(),
  sex: Yup.string().required(),
});

export function AddPetForm() {
  const [species, setSpecies] = useState("");

  const { register } = useForm<AddPetFormData>({
    resolver: yupResolver(Schema),
  });

  const speciesOptions = [
    { value: "dog", label: "Dog" },
    { value: "cat", label: "Cat" },
    { value: "monkey", label: "Monkey" },
    { value: "bird", label: "Bird" },
    { value: "snake", label: "Snake" },
    { value: "turtle", label: "Turtle" },
    { value: "lizard", label: "Lizard" },
    { value: "frog", label: "Frog" },
    { value: "fish", label: "Fish" },
    { value: "Ants", label: "Ants" },
    { value: "bees", label: "Bees" },
    { value: "butterfly", label: "Butterfly" },
    { value: "spider", label: "Spider" },
    { value: "Scorpion", label: "Scorpion" },
  ];

  return (
    <div className={css.form_container}>
      <form className={css.pet_form}>
        <h2 className={css.form_title}>
          Add my pet / <span className={css.form_span}>Personal details</span>
        </h2>
        <fieldset className={css.form_box_radios}>
          <legend className={css.visually_hidden}>Pet gender</legend>

          <label className={css.form_radio_first}>
            <input {...register("sex")} type="radio" value="female" />

            <svg width={20} height={20} className={css.radio_icon_first}>
              <use href="/sprite.svg#icon-female" />
            </svg>
          </label>

          <label className={css.form_radio_second}>
            <input {...register("sex")} type="radio" value="male" />
            <svg width={20} height={20} className={css.radio_icon_second}>
              <use href="/sprite.svg#icon-male" />
            </svg>
          </label>

          <label className={css.form_radio_third}>
            <input {...register("sex")} type="radio" value="reproductive" />
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
            {...register("imgUrl")}
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
            {...register("title")}
            type="text"
            placeholder="Title"
            className={css.wrapper_form_input}
          />
          <input
            {...register("name")}
            type="name"
            placeholder="Pet’s Name"
            className={css.wrapper_form_input}
          />
        </div>
        <div className={css.wrapper_data_type}>
          <label className={css.wrapper_data_label}>
            00.00.0000
            <input type="date" hidden {...register("birthday")} />
            <svg width={15} height={15} className={css.wrapper_data_icon}>
              <use href="/sprite.svg#icon-calendar" />
            </svg>
          </label>
          <div className={css.form_pet}>
            <Select
              unstyled
              placeholder="Type of pet"
              value={
                species
                  ? speciesOptions.find((opt) => opt.value === species)
                  : null
              }
              options={speciesOptions}
              onChange={(option) => setSpecies(option?.value ?? "")}
              classNames={{
                control: () => css.control_pet,
                valueContainer: () => css.valueContainer,
                singleValue: () => css.singleValue,
                indicatorsContainer: () => css.indicators,
                option: (state) =>
                  state.isSelected ? css.optionSelected : css.option,
                menu: () => css.menu,
                menuList: () => css.menuList,
                placeholder: () => css.placeholder,
              }}
            />
          </div>
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
    </div>
  );
}

export default AddPetForm;
