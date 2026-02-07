import css from "./PetsList.module.css";
import PetItem from "../PetsItem/PetsItem";

function PetList() {
  return (
    <div className={css.pet_list}>
      <PetItem />
    </div>
  );
}

export default PetList;
