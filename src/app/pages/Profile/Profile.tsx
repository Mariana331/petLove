import css from "./Profile.module.css";
import UserCard from "../../components/UserCard/UserCard";
import MyNotices from "../../components/MyNotices/MyNotices";

interface ProfileProps {
  userName: string;
  userEmail: string;
}

function Profile({ userName, userEmail }: ProfileProps) {
  return (
    <div className={css.profile}>
      <div className="container">
        <UserCard userName={userName} userEmail={userEmail} />
        <MyNotices />
      </div>
    </div>
  );
}

export default Profile;
