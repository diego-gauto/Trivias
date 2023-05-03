

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
  refresh: any,
  courses: any
};

const RoleEdit = ({ show, setShow, admin, adminID, role, refresh, courses }: RoleProps) => {
  const handleClose = () => setShow(false);
  const [roles, setRoles] = useState<any>([{ role: "Cursos", active: false, name: "course", tasks: [{ active: false, task: "Crear" }, { active: false, task: "Eliminar" }, { active: false, task: "Editar" }] },
  { role: "Cupones", active: false, name: "coupons", tasks: [{ active: false, task: "Crear" }, { active: false, task: "Eliminar" }, { active: false, task: "Editar" }] },
  { role: "Blogs", active: false, name: "blogs", tasks: [{ active: false, task: "Crear" }, { active: false, task: "Eliminar" }, { active: false, task: "Editar" }] },
  { role: "Recompensas", active: false, name: "rewards", tasks: [{ active: false, task: "Crear" }, { active: false, task: "Eliminar" }, { active: false, task: "Editar" }, { active: false, task: "Solicitudes" }] },
  { role: "Usuarios", active: false, name: "users", tasks: [{ active: false, task: "Editar" }, { active: false, task: "Generar Reporte" }] },
  { role: "Landing", active: false, name: "landing", tasks: [] },
  { role: "Pagos", active: false, name: "payments", tasks: [] },
  { role: "Tarea", active: false, name: "homeworks", tasks: [], courses: [] },
  { role: "Comentarios", active: false, name: "comments", tasks: [{ active: false, task: "Crear" }, { active: false, task: "Eliminar" }, { active: false, task: "Editar" }], courses: [] }]);
  const [loading, setLoading] = useState(true);
  const [values, setValues] = useState("");
  const [valuesComments, setValuesComments] = useState("");
  useEffect(() => {

    const temp = roles
    admin.adminTypes.forEach((element: any) => {
      temp.forEach((role: any) => {
        if (element.role === role.name) {
          role.active = changeValue(element.view);
          if (element.role !== 'homeworks' || element.role !== 'landing' || element.role !== 'payments') {
            role.tasks.forEach((task: any) => {
              if (task.task === "Crear") {
                task.active = changeValue(element.create)
              }
              if (task.task === "Editar") {
                task.active = changeValue(element.edit)
              }
              if (task.task === "Eliminar") {
                task.active = changeValue(element.delete)
              }
              if (task.task === "Solicitudes") {
                task.active = changeValue(element.request)
              }
              if (task.task === "Generar Reporte") {
                task.active = changeValue(element.report)
              }
            });
          }
          if (element.role === 'homeworks') {
            setValues(element.courses.split(","))
          }
        }
      });
    });
    setRoles(temp);
    setLoading(false)
  }, [])

  const changeValue = (value: any) => {
    if (value === 0) return false;
    if (value === 1) return true;
    else return
  }

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

  const handleMultiple = (e: any, role: string) => {
    let options = [...e.target.options];
    let temp: any = [];
    options.forEach((value: any) => {
      if (value.selected) {
        temp.push(value.value)
      }
    });
    if (role === "homeworks") {
      setValues(temp.toString());
    }
  }

  const updateAdminType = () => {
    admin.adminTypes.forEach((element: any) => {
      roles.forEach((role: any) => {
        if (element.role === role.name) {
          element.view = role.active
          if (element.role !== 'homeworks' || element.role !== 'landing' || element.role !== 'payments') {
            role.tasks.forEach((task: any) => {
              if (task.task === "Crear") {
                element.create = task.active
              }
              if (task.task === "Editar") {
                element.edit = task.active
              }
              if (task.task === "Eliminar") {
                element.delete = task.active
              }
              if (task.task === "Solicitudes") {
                element.request = task.active
              }
              if (task.task === "Generar Reporte") {
                element.report = task.active
              }
            });
          }
          if (element.role === 'homeworks') {
            element.courses = values;
          }
        }
      });
    });

    let user = {
      user_id: admin.user_id,
      roles: admin.adminTypes
    }
    updateAdminAccessApi(user).then(() => {
      setShow(false);
      refresh();
      alert("Accesos actualizados");
    })
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
              {!loading && roles.map((x: any, indexR: number) => {
                return (
                  <div className="role-row" key={"role" + indexR}>
                    <RowContain>
                      <li>{x.role}</li>
                      <input type="checkbox" name={x.name} defaultChecked={x.active} onChange={(e) => handleRole(e, indexR)} />
                    </RowContain>
                    {x.tasks.map((task: any, indexT: number) => {
                      return (
                        <div className="tasks" key={"role" + indexR + indexT}>
                          <input type="checkbox" name={task.task} defaultChecked={task.active} onChange={(e) => handleChange(e, indexR, indexT)} />
                          <li>{task.task}</li>
                        </div>
                      )
                    })}
                    {(courses.length > 0 && x.name === 'homeworks') && <select name="" defaultValue={values} multiple onChange={(e) => { handleMultiple(e, "homeworks") }}>
                      {courses.map((course: any) => {
                        return (
                          <option value={course.id}>{course.title}</option>
                        )
                      })}
                    </select>}
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