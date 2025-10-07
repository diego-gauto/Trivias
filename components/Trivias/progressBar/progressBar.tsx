import styles from './progressBar.module.css';

const { progressBar } = styles;

const ProgressBar = ({ value }: any) => {
  return (
    <div
      className={progressBar}
      data-value={value}
    ></div>
  );
};

export default ProgressBar;
