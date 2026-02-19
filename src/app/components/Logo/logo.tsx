import css from "./Logo.module.css";
import { useNavigate } from "react-router-dom";
import { useLoaderStore } from "../../stores/loaderStore";

interface LogoProps {
  isHome: boolean;
}

function Logo({ isHome }: LogoProps) {
  const navigate = useNavigate();
  const start = useLoaderStore((s) => s.start);
  const finish = useLoaderStore((s) => s.finish);

  const handleClick = () => {
    start();
    navigate("/home");
    finish();
  };
  return (
    <div className={css.logo}>
      <button
        className={isHome ? css.logo_text_home : css.logo_text_other}
        onClick={handleClick}
      >
        petl
        <svg
          className={isHome ? css.logo_icon_home : css.logo_icon_other}
          width={14}
          height={12}
        >
          <use href="/sprite.svg#icon-heart" />
        </svg>
        ve
      </button>
    </div>
  );
}

export default Logo;
