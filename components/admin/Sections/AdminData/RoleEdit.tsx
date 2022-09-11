

import { useEffect, useState } from "react";

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

type CheckBoxNames = {
  general: boolean;
  pay: boolean;
  courses: boolean;
  rewards: boolean;
  landing: boolean;
  coupons: boolean;
  users: boolean;
  superAdmin?: boolean;
};

type CheckBoxValues = {
  name: string;
  checked: boolean
};

const RoleEdit = ({ show, setShow, admin, adminType, role }: any) => {
  const handleClose = () => setShow(false);

  const [state, setState] = useState<any>({ ...role });

  const handleChange = (e: { target: CheckBoxValues }) => {
    const value = e.target.checked;
    setState({
      ...state,
      [e.target.name]: value
    });
  };
  useEffect(() => {
    if (role == undefined) return;
    console.log("mounted adminType1", role.coupons);
    setState(role);
    //console.log("mounted adminType2", state);
  }, [admin]);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <ModalContain>
        <TitleContain>
          <Title>Editar acceso</Title>
          <CloseIcon onClick={() => { setShow(false) }} />
        </TitleContain>
        <OptionsContain>
          <SectionOptions>
            <Info>Secciones a las que tiene acceso</Info>
            <SelectedRoleContain>
              <RowContain >
                <li>General</li>
                <input type="checkbox" name="general" checked={state.general} onChange={handleChange} />
              </RowContain>
              <RowContain>
                <li>Pagos</li>
                <input type="checkbox" name="pay" checked={state.pay} onChange={handleChange} />
              </RowContain>
              <RowContain>
                <li>Cursos</li>
                <input type="checkbox" name="courses" checked={state.courses} onChange={handleChange} />
              </RowContain>
              <RowContain>
                <li>Recompensas</li>
                <input type="checkbox" name="rewards" checked={state.rewards} onChange={handleChange} />
              </RowContain>
              <RowContain>
                <li>Landing</li>
                <input type="checkbox" name="landing" checked={state.landing} onChange={handleChange} />
              </RowContain>
              <RowContain>
                <li>Cupones</li>
                <input type="checkbox" name="coupons" checked={state.coupons} onChange={handleChange} />
              </RowContain>
              <RowContain>
                <li>Usuarios</li>
                <input type="checkbox" name="users" checked={state.users} onChange={handleChange} />
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