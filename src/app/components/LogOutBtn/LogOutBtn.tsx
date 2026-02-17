import css from "./LogOutBtn.module.css";

interface LogOutBtnProps {
  openApproveModal: () => void;
}

function LogOutBtn({ openApproveModal }: LogOutBtnProps) {
  return (
    <div>
      <button className={css.btn} type="button" onClick={openApproveModal}>
        Log out
      </button>
    </div>
  );
}

export default LogOutBtn;
