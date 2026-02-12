import css from "./AddPetForm.module.css";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Select from "react-select";
import { AddPets } from "../../services/users";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
import type { ChangeEvent } from "react";
import { useState } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { useForm, Controller } from "react-hook-form";

interface AddPetFormData {
  title: string;
  name: string;
  imgURL: string;
  species: string;
  birthday: string;
  sex: string;
}

export const Schema = Yup.object({
  title: Yup.string().required("Title is required"),
  name: Yup.string().required("Name is required"),
  imgURL: Yup.string()
    .matches(
      /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp)$/,
      "Invalid image URL",
    )
    .required("Image URL is required"),
  species: Yup.string().required("Species is required"),
  birthday: Yup.string()
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format")
    .required("Birthday is required"),
  sex: Yup.string().required("Sex is required"),
});

export function AddPetForm() {
  const navigate = useNavigate();

  const {
    register,
    reset,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AddPetFormData>({
    resolver: yupResolver(Schema),
    mode: "onSubmit",
    defaultValues: {
      imgURL: "",
    },
  });

  const [preview, setPreview] = useState<string | null>(null);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
    setValue("imgURL", imageUrl, { shouldValidate: true });
  };

  const onSubmit = async (data: AddPetFormData) => {
    try {
      await AddPets(data);

      toast.success("AddPet successfully!");
      reset();
      navigate("/profile");
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: { message: string } }>;
      toast.error(err.response?.data.error.message || "Something went wrong");
    }
  };

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
      <form className={css.pet_form} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={css.form_title}>
          Add my pet / <span className={css.form_span}>Personal details</span>
        </h2>
        <fieldset className={css.form_box_radios}>
          <legend className={css.visually_hidden}>Pet gender</legend>

          <label className={css.form_radio_first}>
            <input {...register("sex")} type="radio" value="female" />
            {errors.sex && (
              <p className={css.error_text_sex}>{errors.sex.message}</p>
            )}

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
        {preview ? (
          <img src={preview} alt="Preview" className={css.img_url} />
        ) : (
          <div className={css.form_image}>
            <svg width={34} height={34} className={css.image_icon}>
              <use href="/sprite.svg#icon-cat-footprint" />
            </svg>
          </div>
        )}
        <div className={css.wrapper_url}>
          <input
            {...register("imgURL")}
            type="url"
            placeholder="Enter URL"
            className={css.wrapper_url_input}
            defaultValue=""
          />
          {errors.imgURL && (
            <p className={css.error_text}>{errors.imgURL.message}</p>
          )}
          <label className={css.wrapper_label}>
            Upload photo
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleChange}
            />
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
            defaultValue=""
          />
        </div>
        <div className={css.wrapper_data_type}>
          <Controller
            name="birthday"
            control={control}
            render={({ field }) => (
              <Flatpickr
                {...field}
                options={{ dateFormat: "d.m.Y" }}
                className={css.inputDate}
                placeholder="00.00.0000"
              />
            )}
          />
          <div className={css.form_pet}>
            <Controller
              name="species"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  unstyled
                  placeholder="Type of pet"
                  options={speciesOptions}
                  value={
                    speciesOptions.find((opt) => opt.value === field.value) ||
                    null
                  }
                  onChange={(selected) => field.onChange(selected?.value)}
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
              )}
            />
          </div>
        </div>
        <div className={css.form_btns}>
          <button className={css.btn_submit} type="submit">
            Submit
          </button>
          <Link to="/profile" className={css.btn_back} type="button">
            Back
          </Link>
        </div>
      </form>
    </div>
  );
}

export default AddPetForm;
