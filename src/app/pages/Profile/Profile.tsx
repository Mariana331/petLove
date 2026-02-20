import css from "./Profile.module.css";
import UserCard from "../../components/UserCard/UserCard";
import MyNotices from "../../components/MyNotices/MyNotices";
import ModalEditUser from "../../components/ModalEditUser/ModalEditUser";
import ModalNotice from "../../components/ModalNotice/ModalNotice";
import Modal from "../../components/Modal/Modal";
import ModalApproveAction from "../../components/ModalApproveAction/ModalApproveAction";
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

interface ProfileProps {
  onLogOut: () => void;
}

function Profile({ onLogOut }: ProfileProps) {
  const { isOpen, type, openModal, closeModal } = useModalStore();

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
      toast.success("Pet deleted");
    },
    onError: () => {
      toast.error("Failed to delete pet");
    },
  });

  const start = useLoaderStore((s) => s.start);
  const finish = useLoaderStore((s) => s.finish);
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
          {isOpen && (
            <Modal onClose={closeModal}>
              {type === "editUser" && (
                <ModalEditUser onClose={closeModal} user={user} />
              )}
              {type === "approve" && (
                <ModalApproveAction onClose={closeModal} onLogOut={onLogOut} />
              )}
              {type === "result" && user && (
                <ModalNotice onClose={closeModal} notice={user.notice} />
              )}
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
