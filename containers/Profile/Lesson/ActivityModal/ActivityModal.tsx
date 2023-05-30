import React from 'react'
import { Modal } from 'react-bootstrap';
import { ModalContainer } from './ActivityModal.styled';
import { IoMdClose } from 'react-icons/io';

interface IActivityModal {
  show: boolean;
  onHide: () => void;
  currentlesson: any;
}
const ActivityModal = (props: IActivityModal) => {
  const { show, onHide, currentlesson } = props;
  console.log(currentlesson)
  return (
    <Modal show={show} onHide={onHide} centered>
      <ModalContainer>
        <div className='title-container'>
          <p className='title'>
            !Esta lección cuenta con {currentlesson.homework === 1 && "tarea"}{currentlesson.quiz === 1 && "quiz"}!
          </p>
          <IoMdClose className='close-icon' onClick={onHide} />
        </div>
      </ModalContainer>
    </Modal>
  )
}
export default ActivityModal;