

import { useEffect, useState } from "react";

import { Modal } from "react-bootstrap";

import { collection, query } from "firebase/firestore";

import { db } from "../../../../firebase/firebaseConfig";
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

const RoleEdit = ({ show, setShow, adminID, admin }: any) => {
  const usersCollectionRef = query(collection(db, "users"));
  const handleClose = () => setShow(false);

  const [generalChk, setGeneralChk] = useState<boolean>(false);
  const [payChk, setPayChk] = useState<boolean>(false);
  const [coursesChk, setCoursesChk] = useState<boolean>(false);
  const [landingChk, setLandinChk] = useState<boolean>(false);
  const [couponsChk, setCouponsChk] = useState<boolean>(false);
  const [usersChk, setUsersChk] = useState<boolean>(false);
  const [rewardsChk, setRewardsChk] = useState<boolean>(false);
  const [adminType, setAdminType] = useState<Array<string>>([]);

  const generalChange = () => {
    if (generalChk == true) {
      setGeneralChk(false);
    } else setGeneralChk(true);
  };
  const payChange = () => {
    if (payChk == true) {
      setPayChk(false);
    } else setPayChk(true);
  };
  const coursesChange = () => {
    if (coursesChk == true) {
      setCoursesChk(false);
    } else setCoursesChk(true);
  };
  const rewardsChange = () => {
    if (rewardsChk == true) {
      setRewardsChk(false);
    } else setRewardsChk(true);
  };
  const landingChange = () => {
    if (landingChk == true) {
      setLandinChk(false);
    } else setLandinChk(true);
  };
  const couponsChange = () => {
    if (couponsChk == true) {
      setCouponsChk(false);
    } else setCouponsChk(true);
  };
  const usersChange = () => {
    if (usersChk == true) {
      setUsersChk(false);
    } else setUsersChk(true);
  };

  useEffect(() => {
    const loadAdminType = async (): Promise<void> => {
      //if (admin.adminType.superAdmin == true) return;

      var newAdminType = [""];
      newAdminType = [...adminType];

      //admin.created_at = new Date(admin.created_at.seconds * 1000).toLocaleDateString("es-MX");
      // if (!value) return;
      // var newRole = ""
      // newRole = value
      // let adminData = { ...admin };
      // adminData.role = newRole;
      // if (value == admin.role) return;
      // updateRole(adminData, adminID).then(() => {
      //   alert("Rol actualizado correctamente")
      //   setIsVisible(false)
      // });
    }
    loadAdminType();
  }, [adminID]);

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
              <RowContain onClick={generalChange} >
                <li>General</li>
                <input type="checkbox" id="generalBox" checked={generalChk} />
              </RowContain>
              <RowContain onClick={payChange}>
                <li>Pagos</li>
                <input type="checkbox" checked={payChk} />
              </RowContain>
              <RowContain onClick={coursesChange}>
                <li>Cursos</li>
                <input type="checkbox" checked={coursesChk} />
              </RowContain>
              <RowContain onClick={rewardsChange} >
                <li>Recompensas</li>
                <input type="checkbox" checked={rewardsChk} />
              </RowContain>
              <RowContain onClick={landingChange} >
                <li>Landing</li>
                <input type="checkbox" checked={landingChk} />
              </RowContain>
              <RowContain onClick={couponsChange} >
                <li>Cupones</li>
                <input type="checkbox" checked={couponsChk} />
              </RowContain>
              <RowContain onClick={usersChange} >
                <li>Usuarios</li>
                <input type="checkbox" checked={usersChk} />
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