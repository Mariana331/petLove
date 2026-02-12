import css from "./Header.module.css";
import Logo from "../Logo/logo";
import MobileMenu from "../MobileMenu/MobileMenu";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

interface HeaderProps {
  isAuth: boolean;
  userName: string;
  onLogOut: () => void;
}

function Header({ isAuth, userName, onLogOut }: HeaderProps) {
  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === "/home";
  return (
    <div className={isHome ? css.header_home : css.header}>
      <div className="container">
        <div className={isHome ? css.header_wrapper_home : css.header_wrapper}>
          <div className={css.header_logo}>
            <Logo isHome={isHome} />
          </div>
          <nav className={css.header_nav}>
            <ul className={css.nav_list}>
              <li className={isHome ? css.nav_item_home : css.nav_item}>
                <Link
                  className={isHome ? css.nav_link_home : css.nav_link}
                  to="/news"
                >
                  News
                </Link>
              </li>
              <li className={isHome ? css.nav_item_home : css.nav_item}>
                <Link
                  className={isHome ? css.nav_link_home : css.nav_link}
                  to="/notices"
                >
                  Find pet
                </Link>
              </li>
              <li className={isHome ? css.nav_item_home : css.nav_item}>
                <Link
                  className={isHome ? css.nav_link_home : css.nav_link}
                  to="/friends"
                >
                  Our friends
                </Link>
              </li>
            </ul>
          </nav>
          <div className={css.header_left}>
            {!isAuth ? (
              <>
                <Link className={css.header_login} to="/login">
                  Log In
                </Link>
                <Link className={css.header_registration} to="/register">
                  Registration
                </Link>
              </>
            ) : (
              <>
                <button
                  className={css.header_logout}
                  type="button"
                  onClick={onLogOut}
                >
                  Log out
                </button>
                <div className={css.header_user_menu}>
                  <svg className={css.header_icon_user} width={20} height={20}>
                    <use href="/sprite.svg#icon-user" />
                  </svg>
                </div>
                <p className={isHome ? css.user_text_home : css.user_text}>
                  {userName}
                  <Link to="/profile"></Link>
                </p>
              </>
            )}
            <button
              className={css.header_menu_btn_home}
              type="button"
              onClick={() => setIsOpenMobileMenu(true)}
            >
              <svg
                className={
                  isHome ? css.header_icon_btn_home : css.header_icon_btn
                }
                width={32}
                height={32}
              >
                <use href="/sprite.svg#icon-menu" />
              </svg>
            </button>
          </div>
          <MobileMenu
            isOpenMobileMenu={isOpenMobileMenu}
            onClose={() => setIsOpenMobileMenu(false)}
            isHome={isHome}
            isAuth={isAuth}
            onLogOut={onLogOut}
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
