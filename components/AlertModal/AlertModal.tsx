import React from 'react'
import { Modal } from 'react-bootstrap';
import { AlertModalContain } from './AlertModal.styled';
import { IoClose } from 'react-icons/io5';
interface IModal {
  show: boolean;
  message: string;
  onHide: () => void;
}
const AlertModal = (props: IModal) => {
  const { show, onHide, message } = props;
  return (
    <Modal show={show} onHide={onHide} centered >
      <AlertModalContain>
        <p>
          {message}
        </p>
        <IoClose className='close-icon' onClick={onHide} />
      </AlertModalContain>
    </Modal>
  )
}
export default AlertModal;