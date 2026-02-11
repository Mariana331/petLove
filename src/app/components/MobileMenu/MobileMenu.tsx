import css from "./Mobile.menu.module.css";
import { Link } from "react-router-dom";

interface MobileMenuProps {
  isOpenMobileMenu: boolean;
  onClose: () => void;
  onLogOut: () => void;
  isHome: boolean;
  isAuth: boolean;
}

function MobileMenu({
  isOpenMobileMenu,
  onClose,
  isHome,
  isAuth,
  onLogOut,
}: MobileMenuProps) {
  if (!isOpenMobileMenu) return null;
  return (
    <div className={isHome ? css.mobile_menu : css.mobile_menu_orange}>
      <button className={css.mobile_btn_close} type="button" onClick={onClose}>
        <svg
          width={19}
          height={19}
          className={
            isHome ? css.mobile_close_icon : css.mobile_close_icon_orange
          }
        >
          <use href="/sprite.svg#icon-cross" />
        </svg>
      </button>

      <nav className={css.mobile_nav}>
        <ul className={css.mobile_nav_list}>
          <li>
            <Link
              to="/news"
              className={isHome ? css.nav_btn : css.nav_btn_orange}
              onClick={onClose}
            >
              News
            </Link>
          </li>
          <li>
            <Link
              to="/notices"
              className={isHome ? css.nav_btn : css.nav_btn_orange}
              onClick={onClose}
            >
              Find pet
            </Link>
          </li>
          <li>
            <Link
              to="/friends"
              className={isHome ? css.nav_btn : css.nav_btn_orange}
              onClick={onClose}
            >
              Our friends
            </Link>
          </li>
        </ul>
      </nav>

      <div className={css.mobile_actions}>
        {!isAuth ? (
          <>
            <Link
              to="/login"
              className={isHome ? css.action_login : css.action_login_orange}
              onClick={onClose}
            >
              LOG IN
            </Link>

            <Link
              to="/register"
              className={css.action_register}
              onClick={onClose}
            >
              REGISTRATION
            </Link>
          </>
        ) : (
          <button
            className={isHome ? css.logout : css.logout_orange}
            type="button"
            onClick={onLogOut}
          >
            LOG OUT
          </button>
        )}
      </div>
    </div>
  );
}
export default MobileMenu;
