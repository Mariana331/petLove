import css from "./MainLayout.module.css";
import Logo from "../../components/Logo/logo";

function MainLayout() {
  return (
    <div className={css.layout_wrapper}>
      <Logo />
    </div>
  );
}

export default MainLayout;
