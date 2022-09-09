

import { Modal } from "react-bootstrap";

import { ButtonRoleContain, CloseIcon, UpdateButton } from "./AdminDataUpdate.styled";
import {
  Info,
  ModalContain,
  OptionsContain,
  RowContain,
  SectionOptions,
  SelectedRoleContain,
  Title,
  TitleContain,
} from "./RoleEdit.styled";

const RoleEdit = ({ show, setShow }: any) => {
  const handleClose = () => setShow(false);
  const generalChk = true;
  const pagosChk = false;
  const cursosChk = true;
  const recompensasChk = false;
  const landingChk = true;
  const cuponesChk = true;
  const usuariosChk = true;

  return (
    <Modal show={show} onHide={handleClose} centered>
      <ModalContain>
        <TitleContain>
          <Title>Editar acceso</Title>
          <CloseIcon onClick={() => { setShow(false) }} />
        </TitleContain>
        <OptionsContain>
          <SectionOptions>
            <Info>Secciones</Info>
            <SelectedRoleContain>
              <RowContain>
                <li>General</li>
                <input type="checkbox" id="generalBox" checked={generalChk} />
              </RowContain>
              <RowContain>
                <li>Pagos</li>
                <input type="checkbox" checked={pagosChk} />
              </RowContain>
              <RowContain>
                <li>Cursos</li>
                <input type="checkbox" checked={cursosChk} />
              </RowContain>
              <RowContain>
                <li>Recompensas</li>
                <input type="checkbox" checked={recompensasChk} />
              </RowContain>
              <RowContain>
                <li>Landing</li>
                <input type="checkbox" checked={landingChk} />
              </RowContain>
              <RowContain>
                <li>Cupones</li>
                <input type="checkbox" checked={cuponesChk} />
              </RowContain>
              <RowContain>
                <li>Usuarios</li>
                <input type="checkbox" checked={usuariosChk} />
              </RowContain>
            </SelectedRoleContain>
          </SectionOptions>
        </OptionsContain>
        <ButtonRoleContain>
          <UpdateButton>Guardar cambios</UpdateButton>
        </ButtonRoleContain>
      </ModalContain>
    </Modal>
  )
}
export default RoleEdit;