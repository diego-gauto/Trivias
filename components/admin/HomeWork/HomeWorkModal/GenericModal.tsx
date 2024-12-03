import styles from './HomeWorkModalNew.module.css';

interface IGenericModalProps {
  title: string;
  isOpen: boolean;
  content: JSX.Element;
  onClose: () => void;
  context: ContextType;
}

type ContextType = "error" | "success" | "information";

export const GenericModal = ({
  content,
  context,
  isOpen,
  onClose,
  title
}: IGenericModalProps) => {

  const getButtonBackgroundColor = (context: ContextType) => {
    if (context === "error") {
      return "button--red";
    }
    if (context === "success") {
      return "button--green";
    }

    return "";
  };

  return <>
    {isOpen && (
      <div className={styles['generic-modal-overlay']} onClick={onClose}>
        <div
          className={styles['generic-modal-content']}
          onClick={(e) => e.stopPropagation()}
        >
          <h2
            className={`${styles['title']} ${context === 'success' ? styles['title--succes'] :
              context === 'error' ? styles['title--error'] :
                styles['title--information']
              }`}
          >
            {title}
          </h2>
          {content}
          <div className={styles['buttons-container']}>
            <button
              className={`${styles['button']} ${getButtonBackgroundColor(
                context
              )}`}
              onClick={onClose}
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    )}
  </>
}