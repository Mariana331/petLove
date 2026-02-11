import css from "./UserCard.module.css";
import UserBlock from "../UserBlock/UserBlock";
import PetsBlock from "../PetsBlock/PetsBlock";

interface UserCardProps {
  userName: string;
  userEmail: string;
}

function UserCard({ userName, userEmail }: UserCardProps) {
  return (
    <div className={css.user_card}>
      <UserBlock userName={userName} userEmail={userEmail} />
      <PetsBlock />
    </div>
  );
}

export default UserCard;
