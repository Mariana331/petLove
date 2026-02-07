import css from "./FriendsList.module.css";
import FriendsItem from "../FriendsItem/FriendsItem";
import type { Friend } from "../../types/friends";

interface FriendsListProps {
  friends: Friend[];
}

function FriendsList({ friends }: FriendsListProps) {
  return (
    <div className={css.friends_list}>
      {friends.map((friend) => (
        <FriendsItem key={friend._id} friend={friend} />
      ))}
    </div>
  );
}

export default FriendsList;
