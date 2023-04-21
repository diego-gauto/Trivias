

import { useEffect, useState } from "react";

import { Modal } from "react-bootstrap";

import _ from "lodash";
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
import { updateAdminAccessApi } from "../../../api/admin";

type CheckBoxNames = {
  general: boolean;
  pay: boolean;
  courses: boolean;
  rewards: boolean;
  landing: boolean;
  coupons: boolean;
  blogs: boolean;
  assignments: boolean;
  users: boolean;
  superAdmin: boolean;
};

type CheckBoxValues = {
  name: string;
  checked: boolean
};

type RoleProps = {
  admin: any;
  setShow: (open: boolean) => void;
  adminID: any;
  role: any;
  show: boolean;
  refresh: any
};

const RoleEdit = ({ show, setShow, admin, adminID, role, refresh }: RoleProps) => {
  const handleClose = () => setShow(false);
  const [roles, setRoles] = useState<any>([{ role: "Cursos", active: false, name: "course", tasks: [{ active: false, task: "Crear" }, { active: false, task: "Eliminar" }, { active: false, task: "Editar" }] },
  { role: "Cupones", active: false, name: "coupons", tasks: [{ active: false, task: "Crear" }, { active: false, task: "Eliminar" }, { active: false, task: "Editar" }] },
  { role: "Blogs", active: false, name: "blogs", tasks: [{ active: false, task: "Crear" }, { active: false, task: "Eliminar" }, { active: false, task: "Editar" }] },
  { role: "Recompensas", active: false, name: "rewards", tasks: [{ active: false, task: "Crear" }, { active: false, task: "Eliminar" }, { active: false, task: "Editar" }, { active: false, task: "Solicitudes" }] },
  { role: "Usuarios", active: false, name: "users", tasks: [{ active: false, task: "Editar" }, { active: false, task: "Generar Reporte" }] },
  { role: "Landing", active: false, name: "landing", tasks: [] },
  { role: "Pagos", active: false, name: "payments", tasks: [] },
  { role: "Tarea", active: false, name: "homeworks", tasks: [], courses: [] }]);


  const handleRole = (e: { target: CheckBoxValues }, indexRole: number) => {
    const value = e.target.checked;
    roles[indexRole].active = value;
    setRoles(roles);
  };

  const handleChange = (e: { target: CheckBoxValues }, indexRole: number, indexTask: number) => {
    const value = e.target.checked;
    roles[indexRole].tasks[indexTask].active = value;
    setRoles(roles);
  };

  const updateAdminType = () => {
    console.log(roles);

    let user = {
      user_id: admin.user_id,
      // role: state
    }
    // updateAdminAccessApi(user).then(() => {
    //   setShow(false);
    //   refresh();
    //   alert("Accesos actualizados");
    // })
  };

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
              {roles.map((x: any, indexR: number) => {
                return (
                  <div className="role-row">
                    <RowContain>
                      <li>{x.role}</li>
                      <input type="checkbox" name={x.name} defaultChecked={x.active} onChange={(e) => handleRole(e, indexR)} />
                    </RowContain>
                    {x.tasks.map((task: any, indexT: number) => {
                      return (
                        <div className="tasks">
                          <input type="chechkbox" name={task.task} defaultChecked={task.active} onChange={(e) => handleChange(e, indexR, indexT)} />
                          <li>{task.task}</li>
                        </div>
                      )
                    })}
                  </div>
                )
              })}
            </SelectedRoleContain>
          </SectionOptions>
        </OptionsContain>
        <ButtonRoleContain>
          <UpdateButton onClick={updateAdminType}>Guardar cambios</UpdateButton>
        </ButtonRoleContain>
      </ModalContain>
    </Modal>
  )
}
export default RoleEdit;