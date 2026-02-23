import css from "./LogOutBtn.module.css";
import { useLocation } from "react-router-dom";

interface LogOutBtnProps {
  openApproveModal: () => void;
}

function LogOutBtn({ openApproveModal }: LogOutBtnProps) {
  const location = useLocation();
  const isHome = location.pathname === "/home";
  return (
    <div>
      <button
        className={isHome ? css.btn_home : css.btn}
        type="button"
        onClick={openApproveModal}
      >
        Log out
      </button>
    </div>
  );
}

export default LogOutBtn;
