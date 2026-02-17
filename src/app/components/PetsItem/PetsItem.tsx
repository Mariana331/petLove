import css from "./PetsItem.module.css";
import type { Pet } from "../../types/users";

interface PetsItemProps {
  pet: Pet;
  onDelete: (id: string) => void;
}

function PetsItem({ pet, onDelete }: PetsItemProps) {
  const date = new Date(pet.birthday).toLocaleDateString("uk-UA");
  return (
    <div className={css.pets_item}>
      <button
        className={css.btn_trash}
        type="button"
        onClick={() => onDelete(pet._id)}
      >
        <svg className={css.icon_trash} width={16} height={16}>
          <use href="/sprite.svg#icon-trash" />
        </svg>
      </button>
      <div className={css.avatar}>
        <img className={css.image} src={pet.imgURL} alt="pet" />
      </div>
      <div className={css.pet_info}>
        <p className={css.title}>{pet.title}</p>
        <div className={css.pet_items}>
          <div>
            <p className={css.text}>
              Name <br></br>
              <span className={css.text_span}>{pet.name}</span>
            </p>
          </div>
          <div>
            <p className={css.text}>
              Birthday <br></br>
              <span className={css.text_span}>{date}</span>
            </p>
          </div>
          <div>
            <p className={css.text}>
              Sex <br></br>
              <span className={css.text_span}>{pet.sex}</span>
            </p>
          </div>
          <div>
            <p className={css.text}>
              Species <br></br>
              <span className={css.text_span}>{pet.species}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PetsItem;
