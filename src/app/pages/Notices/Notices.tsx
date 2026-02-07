import Title from "../../components/Title/Title";
import css from "./Notices.module.css";

function Notices() {
  return (
    <div className={css.notices}>
      <div className="container">
        <Title title="Find your favorite pet" />
      </div>
    </div>
  );
}

export default Notices;
