import css from "./Profile.module.css";
import UserCard from "../../components/UserCard/UserCard";
import MyNotices from "../../components/MyNotices/MyNotices";
import {
  useQuery,
  keepPreviousData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { GetUserFull, DeletePets } from "../../services/users";
import { useModalStore } from "../../stores/modalStore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLoaderStore } from "../../stores/useLoaderStore";
import { useEffect } from "react";

function Profile() {
  const { openModal } = useModalStore();

  const openEditUserModal = () => openModal("editUser");
  const openApproveModal = () => openModal("approve");

  const {
    data: user,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => GetUserFull(),
    placeholderData: keepPreviousData,
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: DeletePets,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["results"] });
      toast.success("Pet deleted");
    },
    onError: () => {
      toast.error("Failed to delete pet");
    },
  });

  const { start, finish } = useLoaderStore();
  useEffect(() => {
    if (isLoading) start();
    else finish();
  }, [isLoading, start, finish]);

  return (
    <div className={css.profile}>
      <div className="container">
        <div className={css.container_profile}>
          {!isLoading && user && (
            <UserCard
              user={user}
              openEditUserModal={openEditUserModal}
              openApproveModal={openApproveModal}
              onDelete={(id: string) => mutation.mutate(id)}
            />
          )}
          {isError && <ErrorMessage />}
          <MyNotices
            favoriteNotices={user?.noticesFavorites || []}
            viewedNotices={user?.noticesViewed || []}
          />
        </div>
      </div>
    </div>
  );
}

export default Profile;
