import css from "./ModalEditUser.module.css";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import type { ChangeEvent } from "react";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { EditUserCurrent } from "../../services/users";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { User } from "../../types/users";
import type { EditUserCurrentRequest } from "../../types/users";

interface ModalEditUserProps {
  onClose: () => void;
  user: User;
}

interface ApiError {
  message: string;
}

interface UserFormData {
  name?: string | undefined;
  email?: string | undefined;
  phone?: string | undefined;
  avatar?: string | undefined;
}

export const Schema = Yup.object({
  name: Yup.string(),
  email: Yup.string().matches(
    /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
    "Invalid email format",
  ),
  avatar: Yup.string().matches(
    /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp)$/,
    "Invalid avatar format",
  ),
  phone: Yup.string().matches(/^\+38\d{10}$/, "Invalid phone format"),
});

function ModalEditUser({ onClose, user }: ModalEditUserProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: yupResolver(Schema),
    defaultValues: {
      name: user.name ?? "",
      email: user.email ?? "",
      phone: user.phone ?? "",
      avatar: user.avatar ?? "",
    },
    mode: "onSubmit",
  });

  const [preview, setPreview] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
  };

  const mutation = useMutation<
    void,
    AxiosError<ApiError>,
    EditUserCurrentRequest
  >({
    mutationFn: (data) => EditUserCurrent(data),
    onSuccess: () => {
      toast.success("User updated successfully");
      queryClient.invalidateQueries({ queryKey: ["fullUser"] });
      onClose();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  });

  const onSubmit = (data: UserFormData) => {
    // очищаємо пусті рядки і undefined перед PATCH
    const payload: EditUserCurrentRequest = Object.fromEntries(
      Object.entries(data).filter(
        ([, value]) => value !== "" && value !== undefined,
      ),
    ) as EditUserCurrentRequest;

    mutation.mutate(payload);
  };

  return (
    <div className={css.modal_edit_user}>
      <button className={css.btn_close} type="button" onClick={onClose}>
        <svg width={24} height={24} className={css.icon_cross}>
          <use href="/sprite.svg#icon-cross"></use>
        </svg>
      </button>
      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <h3 className={css.title}>Edit information</h3>
        <div className={css.box_image}>
          {preview || user.avatar ? (
            <img
              className={css.image}
              src={preview || user.avatar}
              alt={user.name}
            />
          ) : (
            <div className={css.box_image_no}>
              <svg className={css.icon_user} width={35} height={35}>
                <use href="/sprite.svg#icon-user" />
              </svg>
            </div>
          )}
        </div>
        <div className={css.wrapper_url}>
          <input
            {...register("avatar")}
            type="url"
            className={css.wrapper_url_input}
            placeholder="https://example.com/avatar.jpg"
          />

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
        <div className={css.user_form}>
          <input {...register("name")} className={css.form_input} type="text" />
          {errors.name && (
            <p className={css.error_text}>{errors.name.message}</p>
          )}
          <input
            {...register("email")}
            className={css.form_input}
            type="email"
          />
          {errors.email && (
            <p className={css.error_text}>{errors.email.message}</p>
          )}
          <input
            {...register("phone")}
            className={css.form_input_tel}
            type="text"
            placeholder="+380"
          />
          {errors.phone && (
            <p className={css.error_text}>{errors.phone.message}</p>
          )}
        </div>
        <button className={css.form_btn} type="submit">
          Save
        </button>
      </form>
    </div>
  );
}

export default ModalEditUser;
