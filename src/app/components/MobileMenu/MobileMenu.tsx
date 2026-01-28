import css from "./Mobile.menu.module.css";
import { Link } from "react-router-dom";

interface MobileMenuProps {
  isOpenMobileMenu: boolean;
  onClose: () => void;
}

function MobileMenu({ isOpenMobileMenu, onClose }: MobileMenuProps) {
  if (!isOpenMobileMenu) return null;
  return (
    <div className={css.mobile_menu}>
      <div className={css.mobile_mop}>
        <button
          className={css.mobile_btn_close}
          type="button"
          onClick={onClose}
        >
          <svg width={16} height={16} className={css.mobile_close_icon}>
            <use href="/sprite.svg#icon-cross"></use>
          </svg>
        </button>
        <nav className={css.mobile_nav}>
          <ul className={css.mobile_list}>
            <li className={css.mobile_item}>
              <Link className={css.mobile_link} to="/news" onClick={onClose}>
                News
              </Link>
            </li>
            <li className={css.mobile_item}>
              <Link className={css.mobile_link} to="/notices" onClick={onClose}>
                Find pet
              </Link>
            </li>
            <li className={css.mobile_item}>
              <Link className={css.mobile_link} to="/friends" onClick={onClose}>
                Our friends
              </Link>
            </li>
          </ul>
        </nav>
        <div className={css.mobile_btns}>
          <button className={css.mobile_login} type="button">
            Log In
          </button>
          <button className={css.mobile_registration} type="button">
            Registration
          </button>
          <button className={css.mobile_logout} type="button">
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}
export default MobileMenu;
