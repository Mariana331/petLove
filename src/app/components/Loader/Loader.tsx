import css from "./Loader.module.css";
import { Watch } from "react-loader-spinner";
import { useLoaderStore } from "../../stores/loaderStore";

function Loader() {
  const isLoading = useLoaderStore((s) => s.isLoading);

  if (!isLoading) return null;

  return (
    <div className={css.wrapper}>
      <Watch
        visible
        height="150"
        width="150"
        radius="48"
        color=" #262626"
        ariaLabel="watch-loading"
      />
    </div>
  );
}

export default Loader;
