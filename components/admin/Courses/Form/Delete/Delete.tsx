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
  courseID: string,
  setOpenSeason?: any,
  lessonId?: string,
}

const Delete = (props: DeletePopUp) => {
  const { show } = props;
  const { setShow } = props;
  const { deleteMessage } = props;
  const { seasonDocId } = props;
  const { courseID } = props;
  const { setOpenSeason } = props;
  const { lessonId } = props;

  const handleClose = () => setShow(false);

  const deleteSeason = () => {
    handleClose();
    setOpenSeason(0);
    return deleteDoc(doc(db, "courses", courseID, "seasons", seasonDocId));
  }
  const deleteLesson = () => {
    handleClose();
    const getID = db.collection("courses").doc("8y7tv733Um2nWDv8GKQn").collection("seasons").doc("17Kk33mvZrxPiaT6fiRL").collection("lessons").doc(lessonId);
    return console.log("  THIS WILL BW DELETED:", getID.id)
    // const getLessonID = db.collection("courses").doc(courseID).collection("seasons").doc(seasonDocId).collection("lessons");
    // return console.log("This will be deleted: ", getLessonID)
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