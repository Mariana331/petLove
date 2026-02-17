import css from "./PetsBlock.module.css";
import { Link } from "react-router-dom";
import PetsList from "../PetsList/PetsList";
import type { User } from "../../types/users";

interface PetsBlockProps {
  user: User;
  onDelete: (id: string) => void;
}

function PetsBlock({ user, onDelete }: PetsBlockProps) {
  return (
    <div className={css.pets_block}>
      <div className={css.box_btn}>
        <p className={css.box_text}>My pets</p>
        <Link className={css.box_link} to="/add-pet">
          Add pet
          <svg className={css.icon_plus} width={18} height={18}>
            <use href="/sprite.svg#icon-plus" />
          </svg>
        </Link>
      </div>
      <PetsList user={user} onDelete={onDelete} />
    </div>
  );
}

export default PetsBlock;
