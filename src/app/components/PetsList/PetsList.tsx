import css from "./PetsList.module.css";
import PetsItem from "../PetsItem/PetsItem";
import type { User } from "../../types/users";

interface PetsListProps {
  user: User;
  onDelete: (id: string) => void;
}

function PetsList({ user, onDelete }: PetsListProps) {
  return (
    <div className={css.pets_list}>
      {user.pets?.map((pet, index) => (
        <PetsItem key={index} pet={pet} onDelete={onDelete} />
      ))}
    </div>
  );
}

export default PetsList;
