import css from "./UserCard.module.css";
import UserBlock from "../UserBlock/UserBlock";
import PetsBlock from "../PetsBlock/PetsBlock";
import LogOutBtn from "../LogOutBtn/LogOutBtn";
import type { User } from "../../types/users";

interface UserCardProps {
  user: User;
  openEditUserModal: () => void;
  openApproveModal: () => void;
  onDelete: (id: string) => void;
}

function UserCard({
  user,
  openEditUserModal,
  openApproveModal,
  onDelete,
}: UserCardProps) {
  return (
    <div className={css.user_card}>
      <UserBlock user={user} openEditUserModal={openEditUserModal} />
      <PetsBlock user={user} onDelete={onDelete} />
      <div className={css.btn_logout}>
        <LogOutBtn openApproveModal={openApproveModal} />
      </div>
    </div>
  );
}

export default UserCard;
