import css from "./Login.module.css";
import LoginForm from "../../components/LoginForm/LoginForm";

function Login() {
  return (
    <div className={css.login}>
      <div className="container">
        <div className={css.login_box}>
          <div className={css.login_image}>
            <picture>
              <source
                srcSet="/login/dog.desktop.jpg"
                media="(min-width: 1280px)"
              />
              <source
                srcSet="/login/dog.tablet.jpg"
                media="(min-width: 768px)"
              />
              <img src="/login/dog.mobile.jpg" alt="Cat" />
            </picture>
          </div>
          <div className={css.login_form}>
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
