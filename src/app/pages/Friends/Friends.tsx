import css from "./Friends.module.css";
import Title from "../../components/Title/Title";
import FriendsList from "../../components/FriendsList/FriendsList";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getFriends } from "../../services/friends";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import type { Friend } from "../../types/friends";
import { useLoaderStore } from "../../stores/useLoaderStore";
import { useEffect } from "react";

function Friends() {
  const { data, isError, isLoading } = useQuery<Friend[]>({
    queryKey: ["friends"],
    queryFn: () => getFriends(),
    placeholderData: keepPreviousData,
  });

  const { start, finish } = useLoaderStore();

  useEffect(() => {
    if (isLoading) start();
    else finish();
  }, [isLoading, start, finish]);

  return (
    <div className={css.friends}>
      <div className="container">
        <div className={css.friends_container}>
          <Title title="Our friends" />
          {data && <FriendsList friends={data} />}
          {!isLoading && data && data.length === 0 && (
            <p>No friends found for this filter.</p>
          )}
          {isError && <ErrorMessage />}
        </div>
      </div>
    </div>
  );
}

export default Friends;
