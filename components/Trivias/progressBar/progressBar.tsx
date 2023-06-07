

import styles from "./progressBar.module.css";

const { progressBar } = styles;

const ProgressBar = ({ value }: any) => {
  return (
    <div
      className={progressBar}
      style={{
        borderRadius: "20px",
        height: "11px",
        width: `${value * 20}%`,
        backgroundColor: "#9B2FEB",
      }}
    ></div>
  );
};

export default ProgressBar;
