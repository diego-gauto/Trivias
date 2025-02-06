import styles from './Modal.module.css';

interface IModalProps {
  show: boolean,
  onClose: () => void,
  child: JSX.Element
}

export const Modal = ({ show, onClose, child }: IModalProps) => {
  if (!show) return null;

  const handleBackdropClick = (e: any) => {
    const className = styles['modal-backdrop'];
    if (e.target.className === className) {
      onClose();
    }
  };

  return (
    <div
      className={styles['modal-backdrop']}
      onClick={handleBackdropClick}
    >
      <div className={styles['modal-content']}>
        {
          child
        }
      </div>
    </div>
  );
};