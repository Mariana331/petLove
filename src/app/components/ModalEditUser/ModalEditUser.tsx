import css from "./ModalEditUser.module.css";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import type { ChangeEvent } from "react";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { EditUserCurrent } from "../../services/users";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { User } from "../../types/users";
import type { EditUserCurrentRequest } from "../../types/users";
import { useForm, Controller } from "react-hook-form";

interface ModalEditUserProps {
  onClose: () => void;
  user: User;
}

interface ApiError {
  message: string;
}

interface UserFormData {
  name?: string;
  email?: string;
  phone?: string;
  avatar?: string;
}

export const Schema: Yup.ObjectSchema<UserFormData> = Yup.object({
  name: Yup.string().optional(),
  email: Yup.string()
    .matches(
      /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
      "Invalid email format",
    )
    .optional(),
  phone: Yup.string()
    .matches(/^\+38\d{10}$/, "Invalid phone format")
    .optional(),
  avatar: Yup.string()
    .matches(
      /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp)$/,
      "Invalid avatar format",
    )
    .optional(),
}).required();

const CLOUDI_NAME = import.meta.env.VITE_CLOUDI_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET;

function ModalEditUser({ onClose, user }: ModalEditUserProps) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: yupResolver(Schema),
    mode: "onSubmit",
    defaultValues: {
      name: user.name,
      email: user.email,
      phone: user.phone,
      avatar: user.avatar || "",
    },
  });

  const queryClient = useQueryClient();
  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDI_NAME}/upload`,
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await res.json();
      setPreview(data.secure_url);
      setValue("avatar", data.secure_url, { shouldValidate: true });
      toast.success("Image uploaded successfully!");
    } catch {
      toast.error("Failed to upload image");
    }
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
    const payload: EditUserCurrentRequest = {
      name: data.name ?? user.name,
      email: data.email ?? user.email,
      phone: data.phone ?? user.phone,
      avatar: data.avatar ?? user.avatar ?? "",
    };

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
          {preview ? (
            <img className={css.image} src={preview} alt={user.name} />
          ) : (
            <div className={css.box_image_no}>
              <svg className={css.icon_user} width={40} height={40}>
                <use href="/sprite.svg#icon-user" />
              </svg>
            </div>
          )}
        </div>
        <div className={css.wrapper_url}>
          <Controller
            name="avatar"
            control={control}
            render={({ field }) => (
              <input
                type="url"
                placeholder="Enter URL"
                className={css.wrapper_url_input}
                value={field.value || preview || ""}
                onChange={(e) => {
                  field.onChange(e.target.value);
                  setPreview(e.target.value);
                }}
              />
            )}
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
          <input
            {...register("name")}
            className={css.form_input}
            type="text"
            defaultValue={user.name}
          />
          {errors.name && (
            <p className={css.error_text}>{errors.name.message}</p>
          )}
          <input
            {...register("email")}
            className={css.form_input}
            type="email"
            defaultValue={user.email}
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
