import React, { useContext, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { ModalContainer } from './ActivityModal.styled';
import { IoMdClose } from 'react-icons/io';
import { IUserHomework } from '../../../../interfaces/IUserHomeworks';
import { ILesson } from '../../../../interfaces/ICourseNew';
import { IReducedHomework } from '../../../../interfaces/IHomeworkByUser';
import { HomeworksContext } from '../../../../hooks/useHomeworks';

interface IActivityModal {
  show: boolean;
  setShow: any;
  lesson: ILesson;
  changeValue: (val: number) => void;
}
const ActivityModal = (props: IActivityModal) => {
  const { show, setShow, lesson, changeValue } = props;
  const { homeworks } = useContext(HomeworksContext);
  const [homework, setHomework] = useState<IReducedHomework | null>(null);

  useEffect(() => {
    setHomework(findTheCurrentHomework());
  }, [homeworks]);

  const findTheCurrentHomework = () => {
    if (homeworks === null) {
      return null;
    }
    if (homeworks.length === 0) {
      return null;
    }
    const lessonHomeworks = homeworks.filter((h) => h.lesson_id === lesson.id);
    if (lessonHomeworks.length === 0) {
      return null;
    }
    // lessonHomeworks.sort((h1, h2) => (new Date(h2.created_at)).getTime() - (new Date(h1.created_at)).getTime());
    const currentHomework = lessonHomeworks[0];
    return currentHomework as IReducedHomework;
  };

  const getTitleByHomework = (): JSX.Element => {
    /*  .title--not-approve {color: #d72424;}
        .title--default {color: #d244d1;}
        .title--in-review {color: #7f21cf;}   */
    // Si no se ha entregado una tarea
    if (homework === null) {
      return (
        <p className='title title--default'>¡Esta lección cuenta con tarea!</p>
      );
    }
    // Si la tarea fue rechazada
    if (homework.status === 1 && homework.approved === 0) {
      return (
        <p className='title title--not-approve'>¡Tú tarea ha sido rechazada!</p>
      );
    }
    // El otro caso es que la tarea se encuentra en revisión
    return <p className='title title--in-review'>¡Se ha entregado tu tarea!</p>;
  };

  const getCardTextElement = (): JSX.Element => {
    if (homework === null) {
      return (
        <p className='card-p'>
          Dirígete a la solapa de <strong>Evaluación</strong>. En ella
          encontrarás las indicaciones para entregar correctamente tu tarea.
        </p>
      );
    }
    // Si la tarea fue rechazada
    if (homework.status === 1 && homework.approved === 0) {
      return (
        <p className='card-p'>
          Vuelve al apartado de <strong>Evaluación</strong> y haz otro intento.
        </p>
      );
    }
    // El otro caso es que la tarea se encuentra en revisión
    return (
      <p className='card-p'>
        En las próximas 24 horas un instructor corregirá tu tarea y obtendrás
        una retroalimentación.
      </p>
    );
  };

  const focusToUploadButton = () => {
    changeValue(3);
    setTimeout(() => {
      document
        .getElementById('btn-homework-upload')
        ?.scrollIntoView({ behavior: 'smooth' });
    }, 500);
  };

  return (
    <Modal show={show} onHide={setShow} centered>
      <ModalContainer>
        <div className='title-container'>
          <div
            className=''
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {lesson.quiz === 1 && lesson.homework === 0 && (
              <p className='title'>¡Esta lección cuenta con quiz!</p>
            )}
            {lesson.quiz === 0 && lesson.homework === 1 && getTitleByHomework()}
            {lesson.quiz === 0 && lesson.homework === 1 && getCardTextElement()}
            <a
              className='btn btn-aceppt'
              type='button'
              onClick={() => {
                setShow();
                if (homework === null) {
                  focusToUploadButton();
                } else if (homework.status === 1 && homework.approved === 0) {
                  focusToUploadButton();
                }
              }}
            >
              Aceptar
            </a>
          </div>
          <IoMdClose className='close-icon' onClick={setShow} />
        </div>
      </ModalContainer>
    </Modal>
  );
};
export default ActivityModal;
