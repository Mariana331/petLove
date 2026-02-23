import css from "./Header.module.css";
import Logo from "../Logo/logo";
import MobileMenu from "../MobileMenu/MobileMenu";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { GetUserFull } from "../../services/users";
import LogOutBtn from "../LogOutBtn/LogOutBtn";
import { useModalStore } from "../../stores/modalStore";
import Modal from "../Modal/Modal";
import ModalApproveAction from "../ModalApproveAction/ModalApproveAction";

interface HeaderProps {
  isAuth: boolean;
  handleLogout: () => void;
}

function Header({ isAuth, handleLogout }: HeaderProps) {
  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState(false);
  const location = useLocation();

  const { isOpen, type, closeModal, openModal } = useModalStore();
  const openApproveModal = () => openModal("approve");

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: GetUserFull,
    placeholderData: keepPreviousData,
  });

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
                <div className={css.logout}>
                  {" "}
                  <LogOutBtn openApproveModal={openApproveModal} />
                </div>
                {user?.avatar ? (
                  <img
                    className={css.header_avatar}
                    src={user.avatar}
                    width={20}
                    height={20}
                  />
                ) : (
                  <Link to="/profile" className={css.header_user_menu}>
                    <svg
                      className={css.header_icon_user}
                      width={20}
                      height={20}
                    >
                      <use href="/sprite.svg#icon-user" />
                    </svg>
                  </Link>
                )}
                <Link
                  className={isHome ? css.user_text_home : css.user_text}
                  to="/profile"
                >
                  {user?.name}
                </Link>
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
            onLogOut={handleLogout}
          />
        </div>
      </div>
      {isOpen && (
        <Modal onClose={closeModal}>
          {type === "approve" && (
            <ModalApproveAction
              onClose={closeModal}
              handleLogout={handleLogout}
            />
          )}
        </Modal>
      )}
    </div>
  );
}

export default Header;
