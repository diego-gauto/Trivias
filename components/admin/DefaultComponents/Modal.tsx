import styles from './Modal.module.css';
import { RxCross1 } from "react-icons/rx";

interface IModalProps {
  show: boolean,
  onClose?: () => void,
  child: JSX.Element,
  compactSize?: boolean,
}

export const Modal = ({ show, onClose = () => { }, compactSize = true, child }: IModalProps) => {
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
      <div
        className={`${styles['modal-content']} ${compactSize === false ? '' : styles['modal-content--compact-size']}`}
        style={{
          position: 'relative',
        }}
      >
        <div style={{
          position: 'absolute',
          top: '15px',
          right: '15px',
        }}
          onClick={(e) => {
            onClose();
          }}
        >
          <div className={styles['exit-button']}>
            <RxCross1
              size={25}
              color='#6310c8'
            />
          </div>
        </div>
        {
          child
        }
      </div>
    </div>
  );
};