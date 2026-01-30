import css from "./Register.module.css";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";

function Register() {
  return (
    <div className={css.register}>
      <div className="container">
        <div className={css.register_box}>
          <div className={css.register_image}>
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
