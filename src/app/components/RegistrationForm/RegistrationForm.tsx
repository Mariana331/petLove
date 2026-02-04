import css from "./RegistrationForm.module.css";
import { useForm } from "react-hook-form";
import { useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import Title from "../Title/Title";

interface RegistrationFormData {
  name: string;
  email: string;
  password: string;
}

export const Schema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .matches(
      /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
      "Invalid email format",
    )
    .required("Enter a valid Email"),
  password: Yup.string()
    .min(7, "Minimum 7 characters")
    .required("Password is required"),
});

export function RegistrationForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    resolver: yupResolver(Schema),
    mode: "onChange",
  });

  const isEmail = watch("email");

  return (
    <div className={css.form_box}>
      <div className={css.form_info}>
        <div className={css.form_title}>
          <Title title="Registration" />
        </div>
        <p className={css.form_text}>
          Thank you for your interest in our platform.
        </p>
      </div>
      <form className={css.form}>
        <div className={css.form_wrapper}>
          <input
            {...register("name")}
            className={css.form_input}
            type="text"
            placeholder="Name"
          />
          <div className={css.email_wrapper}>
            {isEmail && (
              <button
                className={css.email_btn}
                type="button"
                onClick={() => setValue("email", "")}
              >
                {errors.email ? (
                  <svg width={18} height={18} className={css.email_icon_false}>
                    <use href="/sprite.svg#icon-cross"></use>
                  </svg>
                ) : (
                  <svg width={18} height={18} className={css.email_icon_true}>
                    <use href="/sprite.svg#icon-check"></use>
                  </svg>
                )}
              </button>
            )}
            <input
              {...register("email")}
              className={`${css.form_input} ${
                isEmail
                  ? errors.email
                    ? css.input_error
                    : css.input_valid
                  : ""
              }`}
              type="email"
              placeholder="Email"
            />
          </div>
          <div className={css.password_wrapper}>
            <button
              className={css.password_btn_eyes}
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <svg width={18} height={18} className={css.password_eye_icon}>
                  <use href="/sprite.svg#icon-eye1"></use>
                </svg>
              ) : (
                <svg
                  width={18}
                  height={18}
                  className={css.password_eye_icon_off}
                >
                  <use href="/sprite.svg#icon-eye-off"></use>
                </svg>
              )}
            </button>
            <input
              {...register("password")}
              className={css.form_input}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
            />
          </div>
          <div className={css.password_wrapper}>
            <button
              className={css.password_btn_eyes}
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            >
              {showConfirmPassword ? (
                <svg width={18} height={18} className={css.password_eye_icon}>
                  <use href="/sprite.svg#icon-eye1"></use>
                </svg>
              ) : (
                <svg
                  width={18}
                  height={18}
                  className={css.password_eye_icon_off}
                >
                  <use href="/sprite.svg#icon-eye-off"></use>
                </svg>
              )}
            </button>
            <input
              {...register("password")}
              className={css.form_input}
              type={showPassword ? "text" : "password"}
              placeholder="Confirm password"
            />
          </div>
        </div>
        <div className={css.form_box_btn}>
          <button className={css.form_btn} type="submit">
            Registration
          </button>
          <p className={css.form_link}>
            Already have an account?{" "}
            <Link className={css.form_link_text} to="/login">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default RegistrationForm;
