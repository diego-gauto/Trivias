import { Modal } from "react-bootstrap";

import { deleteDoc, doc } from "firebase/firestore";

import { db } from "../../../../../firebase/firebaseConfig";
import { CloseIcon } from "../../../Users/UserData/UsersCardData.styled";
import {
  ButtonContain,
  Container,
  Content,
  PurpleButton,
  Title,
  TitleContain,
  TransparentButton,
  Trash,
} from "./Delete.styled";

export interface DeletePopUp {
  show: boolean,
  setShow: any,
  deleteMessage: number,
  seasonDocId: string,
  courseID: any,
  setOpenSeason?: any,
  lessonID?: any,
}

const Delete = ({ show, setShow, deleteMessage, seasonDocId, courseID, setOpenSeason, lessonID }: DeletePopUp) => {

  const handleClose = () => setShow(false);

  const deleteSeason = () => {
    handleClose();
    setOpenSeason(0);
    return deleteDoc(doc(db, "courses", courseID, "seasons", seasonDocId));
  }
  const deleteLesson = () => {
    handleClose();
    return console.log("THIS WILL BE DELETED:", courseID)
  }

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Container>
        <TitleContain>
          {deleteMessage == 1 && <Title>Eliminar Lección</Title>}
          {deleteMessage == 2 && <Title>Eliminar Temporada</Title>}
          <CloseIcon onClick={handleClose} />
        </TitleContain>
        {deleteMessage == 1 &&
          <Content>¿Estas seguro de eliminar la lección? Esta acción es irreversible.</Content>
        }
        {deleteMessage == 2 &&
          <Content>¿Estas seguro de eliminar la temporada? Esta acción es irreversible.</Content>
        }
        <ButtonContain>
          <TransparentButton onClick={handleClose}>Cancelar</TransparentButton>
          {deleteMessage == 1 &&
            <PurpleButton onClick={deleteLesson}>Eliminar<Trash /></PurpleButton>
          }
          {deleteMessage == 2 &&
            <PurpleButton onClick={deleteSeason}>Eliminar<Trash /></PurpleButton>
          }
        </ButtonContain>
      </Container>
    </Modal>
  )
}
export default Delete;