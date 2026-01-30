import css from "./Login.module.css";
import LoginForm from "../../components/LoginForm/LoginForm";
import Title from "../../components/Title/Title";

function Login() {
  return (
    <div className={css.login}>
      <div className="container">
        <div className={css.login_box}>
          <div className={css.login_image}>
            <div className={css.login_title}>
              <Title
                name="Rich"
                birthday="21.09.2020"
                text="Rich would be the perfect addition to an active family that loves to play and go on walks. I bet he would love having a doggy playmate too!"
                src="/public/title/dog.jpg"
              />
            </div>
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
