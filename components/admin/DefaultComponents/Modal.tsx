import { ModalContainer } from './Modal.styled';

interface IModalProps {
  show: boolean,
  onClose: () => void,
  child: JSX.Element
}

export const Modal = ({ show, onClose, child }: IModalProps) => {
  if (!show) return null;

  const handleBackdropClick = (e: any) => {
    if (e.target.className === 'modal-backdrop-custom') {
      onClose();
    }
  };

  return (
    <ModalContainer className="modal-backdrop-custom" onClick={handleBackdropClick}>
      <div className="modal-content-custom">
        {
          /*
          <h2>Este es el Modal</h2>
        <p>Contenido del modal...</p>
        <button onClick={onClose}>Cerrar</button>
          */
        }
        {
          child
        }
      </div>
    </ModalContainer>
  );
};