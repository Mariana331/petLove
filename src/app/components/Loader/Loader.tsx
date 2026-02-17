import { useEffect } from "react";
import css from "./Loader.module.css";
import { useLoaderStore } from "../../stores/loaderStore";

export default function Loader() {
  const { isLoading, progress, setProgress } = useLoaderStore();

  useEffect(() => {
    if (!isLoading) {
      setProgress(0);
      return;
    }

    let value = progress;
    const interval = setInterval(() => {
      value += Math.random() * 10;
      if (value >= 90) value = 90;
      setProgress(Math.floor(value));
    }, 200);

    return () => clearInterval(interval);
  }, [isLoading, setProgress, progress]);

  if (!isLoading) return null;

  return (
    <div className={css.overlay}>
      <div className={css.loaderBox}>
        <svg className={css.progress} viewBox="0 0 100 100">
          <circle className={css.bg} cx="50" cy="50" r="45" />
          <circle
            className={css.fg}
            cx="50"
            cy="50"
            r="45"
            style={{
              strokeDasharray: 283,
              strokeDashoffset: 283 - (283 * progress) / 100,
            }}
          />
        </svg>
        <span className={css.paw}>🐾</span>
      </div>
    </div>
  );
}
