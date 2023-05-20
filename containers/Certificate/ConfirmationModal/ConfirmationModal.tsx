import React from 'react'
import { Modal } from 'react-bootstrap';
import { AiOutlineClose } from 'react-icons/ai';
import { ModalCertificate } from '../Certificate.styled';

interface IConfirmationModal {
  show: boolean;
  onHide: () => void;
  pdfDownload: () => void;
  imageDownload: (format: string) => void;
}
const ConfirmationModal = (props: IConfirmationModal) => {
  const { show, onHide, pdfDownload, imageDownload } = props;
  return (
    <Modal show={show} onHide={onHide}>
      <ModalCertificate>
        <AiOutlineClose className='close-icon' onClick={onHide} />
        <p>¿En qué formato lo quieres descargar?</p>
        <button className='png' onClick={() => imageDownload("png")}> Descargar en PNG</button>
        <button className='jpeg' onClick={() => imageDownload("jpeg")}> Descargar en JPEG</button>
        <button className='pdf' onClick={pdfDownload}> Descargar en PDF</button>
      </ModalCertificate>
    </Modal>
  )
}
export default ConfirmationModal;