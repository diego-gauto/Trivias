import { Modal } from 'react-bootstrap';

import { deleteDoc, doc } from 'firebase/firestore';

import { db } from '../../../../../firebase/firebaseConfig';
import { CloseIcon } from '../../../Users/UserData/UsersCardData.styled';
import {
  ButtonContain,
  Container,
  Content,
  PurpleButton,
  Title,
  TitleContain,
  TransparentButton,
  Trash,
} from './Delete.styled';

export interface DeletePopUp {
  show: boolean;
  setShow: any;
  deleteMessage: number;
  seasonID?: any;
  courseID: any;
  setOpenSeason?: any;
  lessonID?: any;
  lessons?: any;
}

const Delete = ({
  show,
  setShow,
  deleteMessage,
  seasonID,
  courseID,
  setOpenSeason,
  lessonID,
  lessons,
}: DeletePopUp) => {
  const handleClose = () => setShow(false);
  const deleteSeason = () => {
    setOpenSeason(0);
    if (lessons.length > 0) {
      for (let i: number = 0; i < lessons.length; i++) {
        let tempLessonID: string = lessons[i].documentID;
        deleteDoc(
          doc(
            db,
            'courses',
            courseID,
            'seasons',
            seasonID,
            'lessons',
            tempLessonID,
          ),
        );
      }
    }
    return deleteDoc(doc(db, 'courses', courseID, 'seasons', seasonID));
  };
  const deleteLesson = () => {
    handleClose();

    deleteDoc(
      doc(db, 'courses', courseID, 'seasons', seasonID, 'lessons', lessonID),
    ).then(() => {
      window.location.href = `/admin/Edit?documentID=${courseID}`;
    });
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Container>
        <TitleContain>
          {deleteMessage == 1 && <Title>Eliminar Lección</Title>}
          {deleteMessage == 2 && <Title>Eliminar Temporada</Title>}
          <CloseIcon onClick={handleClose} />
        </TitleContain>
        <Content>
          ¿Estas seguro de eliminar la {deleteMessage == 1 && 'lección'}
          {deleteMessage == 2 && 'temporada'}? Esta acción es irreversible.
        </Content>
        <ButtonContain>
          <TransparentButton onClick={handleClose}>Cancelar</TransparentButton>
          {deleteMessage == 1 && (
            <PurpleButton onClick={deleteLesson}>
              Eliminar
              <Trash />
            </PurpleButton>
          )}
          {deleteMessage == 2 && (
            <PurpleButton onClick={deleteSeason}>
              Eliminar
              <Trash />
            </PurpleButton>
          )}
        </ButtonContain>
      </Container>
    </Modal>
  );
};
export default Delete;
