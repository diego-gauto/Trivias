import { Modal } from "react-bootstrap";

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

const Delete = ({ show, setShow }: any) => {

  const handleClose = () => setShow(false);
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Container>
        <TitleContain>
          <Title>Eliminar Lección</Title>
          <CloseIcon onClick={handleClose} />
        </TitleContain>
        <Content>¿Estas seguro de eliminar la lección? Esta acción es irreversible.</Content>
        <ButtonContain>
          <TransparentButton onClick={handleClose}>Cancelar</TransparentButton>
          <PurpleButton>Eliminar<Trash /></PurpleButton>
        </ButtonContain>
      </Container>
    </Modal>
  )
}
export default Delete;