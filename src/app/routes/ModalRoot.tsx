import Modal from "../components/Modal/Modal";
import ModalAttention from "../components/ModalAttention/ModalAttention";
import ModalNotice from "../components/ModalNotice/ModalNotice";
import ModalApproveAction from "../components/ModalApproveAction/ModalApproveAction";
import ModalEditUser from "../components/ModalEditUser/ModalEditUser";
import { useModalStore } from "../stores/modalStore";
import { GetUserFull } from "../services/users";
import { useQuery } from "@tanstack/react-query";
import { SignOut } from "../services/users";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

function ModalRoot() {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: GetUserFull,
  });
  const { isOpen, type, notice, closeModal } = useModalStore();

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
        <ModalNotice notice={notice} onClose={closeModal} />
      )}
      {type === "approve" && (
        <ModalApproveAction onClose={closeModal} handleLogout={handleLogout} />
      )}
      {type === "editUser" && (
        <ModalEditUser onClose={closeModal} user={user} />
      )}
    </Modal>
  );
}

export default ModalRoot;
