import styles from './Modal.module.css';

interface IModalProps {
  show: boolean,
  onClose: () => void,
  child: JSX.Element,
  compactSize?: boolean,
}

export const Modal = ({ show, onClose, compactSize = true, child }: IModalProps) => {
  if (!show) return null;

  const handleBackdropClick = (e: any) => {
    const className = styles['modal-backdrop'];
    if (e.target.className === className) {
      onClose();
    }
  };
  // modal-content--compact-size
  return (
    <div
      className={styles['modal-backdrop']}
      onClick={handleBackdropClick}
    >
      <div className={`${styles['modal-content']} ${compactSize === false ? '' : styles['modal-content--compact-size']}`}>
        {
          child
        }
      </div>
    </div>
  );
};