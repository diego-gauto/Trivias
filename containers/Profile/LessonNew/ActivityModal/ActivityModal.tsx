import React from 'react'
import { Modal } from 'react-bootstrap';
import { ModalContainer } from './ActivityModal.styled';
import { IoMdClose } from 'react-icons/io';

interface IActivityModal {
  show: boolean;
  setShow: any;
  lesson: any;
}
const ActivityModal = (props: IActivityModal) => {
  const { show, setShow, lesson } = props;
  return (
    <Modal show={show} onHide={setShow} centered>
      <ModalContainer>
        <div className='title-container'>
          <p className='title'>
            !Esta lección cuenta con {lesson.homework === 1 && "tarea"}{lesson.quiz === 1 && "quiz"}!
          </p>
          <IoMdClose className='close-icon' onClick={setShow} />
        </div>
      </ModalContainer>
    </Modal>
  )
}
export default ActivityModal;