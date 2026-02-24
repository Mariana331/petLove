import Modal from "../components/Modal/Modal";
import ModalAttention from "../components/ModalAttention/ModalAttention";
import ModalNotice from "../components/ModalNotice/ModalNotice";
import ModalApproveAction from "../components/ModalApproveAction/ModalApproveAction";
import ModalEditUser from "../components/ModalEditUser/ModalEditUser";
import { useModalStore } from "../stores/modalStore";
import { GetUserFull } from "../services/users";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { SignOut } from "../services/users";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { deleteFavorite, addFavorite } from "../services/notices";
import type { Notice } from "../types/notices";
import type { User } from "../types/users";

function ModalRoot() {
  const navigate = useNavigate();
  const { logout, isAuth } = useAuthStore();
  const { isOpen, type, notice, closeModal, openModal } = useModalStore();
  const queryClient = useQueryClient();

  const { data: user } = useQuery<User>({
    queryKey: ["user"],
    queryFn: GetUserFull,
    enabled: isAuth,
  });

  const toggleFavorite = async (notice: Notice) => {
    if (!isAuth) {
      openModal("attention");
      return;
    }
    const isFavorite =
      user?.noticesFavorites.some((n) => n._id === notice._id) ?? false;
    if (isFavorite) {
      await deleteFavorite(notice._id);
    } else {
      await addFavorite(notice._id);
    }
    queryClient.invalidateQueries({ queryKey: ["user"] });
  };

  if (!isOpen) return null;

  const handleLogout = async () => {
    try {
      await SignOut();
    } catch (error) {
      console.error("Error during sign out:", error);
    } finally {
      logout();
      navigate("/home");
    }
  };

  return (
    <Modal onClose={closeModal}>
      {type === "attention" && <ModalAttention onClose={closeModal} />}
      {type === "result" && notice && (
        <ModalNotice
          notice={notice}
          onClose={closeModal}
          toggleFavorite={toggleFavorite}
          isFavorite={
            user?.noticesFavorites.some((n) => n._id === notice._id) ?? false
          }
        />
      )}
      {type === "approve" && (
        <ModalApproveAction onClose={closeModal} handleLogout={handleLogout} />
      )}
      {type === "editUser" && user && (
        <ModalEditUser onClose={closeModal} user={user} />
      )}
    </Modal>
  );
}

export default ModalRoot;
