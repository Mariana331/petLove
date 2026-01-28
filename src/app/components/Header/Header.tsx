import css from "./Header.module.css";
import Logo from "../Logo/logo";
import MobileMenu from "../MobileMenu/MobileMenu";
import { Link } from "react-router-dom";
import { useState } from "react";

function Header() {
  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState(false);
  return (
    <div className={css.header}>
      <div className={css.header_wrapper}>
        <div className={css.header_logo}>
          <Logo />
        </div>
        <nav className={css.header_nav}>
          <ul className={css.nav_list}>
            <li className={css.nav_item_home}>
              <Link className={css.nav_link_home} to="/news">
                News
              </Link>
            </li>
            <li className={css.nav_item_home}>
              <Link className={css.nav_link_home} to="/findPet">
                Find pet
              </Link>
            </li>
            <li className={css.nav_item_home}>
              <Link className={css.nav_link_home} to="/ourFriend">
                Our friends
              </Link>
            </li>
          </ul>
        </nav>
        <div className={css.header_left}>
          <button className={css.header_login} type="button">
            Log In
          </button>
          <button className={css.header_registration} type="button">
            Registration
          </button>
          <button className={css.header_logout} type="button">
            Log out
          </button>
          <div className={css.header_user_menu}>
            <svg className={css.header_icon_user} width={20} height={20}>
              <use href="/sprite.svg#icon-user" />
            </svg>
          </div>
          <button
            className={css.header_menu_btn_home}
            type="button"
            onClick={() => setIsOpenMobileMenu(true)}
          >
            <svg className={css.header_icon_btn_home} width={32} height={32}>
              <use href="/sprite.svg#icon-menu" />
            </svg>
          </button>
        </div>
        <MobileMenu
          isOpenMobileMenu={isOpenMobileMenu}
          onClose={() => setIsOpenMobileMenu(false)}
        />
      </div>
    </div>
  );
}

export default Header;
