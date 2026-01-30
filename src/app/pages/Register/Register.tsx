import css from "./Register.module.css";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import Title from "../../components/Title/Title";

function Register() {
  return (
    <div className={css.register}>
      <div className="container">
        <div className={css.register_box}>
          <div className={css.register_image}>
            <div className={css.register_title}>
              <Title
                name="Jack"
                birthday="18.10.2021"
                text="Jack is a gray Persian cat with green eyes. He loves to be pampered
            and groomed, and enjoys playing with toys."
                src="/public/title/cat.jpg"
              />
            </div>
            <picture>
              <source
                srcSet="/register/cat.desktop.jpg"
                media="(min-width: 1280px)"
              />
              <source
                srcSet="/register/cat.tablet.jpg"
                media="(min-width: 768px)"
              />
              <img src="/register/cat.mobile.jpg" alt="Cat" />
            </picture>
          </div>
          <div className={css.register_form}>
            <RegistrationForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
