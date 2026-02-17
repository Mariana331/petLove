import css from "./Profile.module.css";
import UserCard from "../../components/UserCard/UserCard";
import MyNotices from "../../components/MyNotices/MyNotices";
import ModalEditUser from "../../components/ModalEditUser/ModalEditUser";
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

interface ProfileProps {
  onLogOut: () => void;
}

function Profile({ onLogOut }: ProfileProps) {
  const { isOpen, type, openModal, closeModal } = useModalStore();

  const openEditUserModal = () => openModal("editUser");
  const openApproveModal = () => openModal("approve");

  const { data: user, isError } = useQuery({
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

  return (
    <div className={css.profile}>
      <div className="container">
        <div className={css.container_profile}>
          {user && (
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
            <Modal onClose={() => closeModal}>
              {type === "editUser" && (
                <ModalEditUser onClose={closeModal} user={user} />
              )}
              {type === "approve" && (
                <ModalApproveAction onClose={closeModal} onLogOut={onLogOut} />
              )}
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
