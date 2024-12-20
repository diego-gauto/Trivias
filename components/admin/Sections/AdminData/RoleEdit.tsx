import { useEffect, useState } from 'react';

import { Modal } from 'react-bootstrap';

import _ from 'lodash';
import {
  ButtonRoleContain,
  CloseIcon,
  UpdateButton,
} from './AdminDataUpdate.styled';
import {
  Info,
  ModalContain,
  ModalCustom,
  OptionsContain,
  RowContain,
  SectionOptions,
  SelectedRoleContain,
  Title,
  TitleContain,
} from './RoleEdit.styled';
import {
  Admin,
  AdminType,
  getGenericQueryResponse,
  updateAdminAccessApi,
} from '../../../api/admin';
import { backendRoleEditMethod } from './Queries';

type CheckBoxValues = {
  name: string;
  checked: boolean;
};

type RoleProps = {
  admin: Admin;
  setShow: (open: boolean) => void;
  show: boolean;
  refresh: any;
  courses: { id: number; title: string; published: boolean }[];
  forms: { id: number; name: string; }[];
};

type TaskValue =
  | 'Crear'
  | 'Editar'
  | 'Eliminar'
  | 'Solicitudes'
  | 'Generar Reporte'
  | 'Descargar';

interface AdminRole {
  role: string;
  active: boolean;
  name: string;
  tasks: { active: boolean; task: TaskValue }[];
  courses?: string[];
  forms?: string[]
}

const RoleEdit = ({ show, setShow, admin, refresh, courses, forms }: RoleProps) => {
  const handleClose = () => setShow(false);
  const [roles, setRoles] = useState<AdminRole[]>([
    {
      role: 'Cursos',
      active: false,
      name: 'course',
      tasks: [
        { active: false, task: 'Crear' },
        { active: false, task: 'Eliminar' },
        { active: false, task: 'Editar' },
      ],
    },
    {
      role: 'Cupones',
      active: false,
      name: 'coupons',
      tasks: [
        { active: false, task: 'Crear' },
        { active: false, task: 'Eliminar' },
        { active: false, task: 'Editar' },
      ],
    },
    {
      role: 'Blogs',
      active: false,
      name: 'blogs',
      tasks: [
        { active: false, task: 'Crear' },
        { active: false, task: 'Eliminar' },
        { active: false, task: 'Editar' },
      ],
    },
    {
      role: 'Recompensas',
      active: false,
      name: 'rewards',
      tasks: [
        { active: false, task: 'Crear' },
        { active: false, task: 'Eliminar' },
        { active: false, task: 'Editar' },
        { active: false, task: 'Solicitudes' },
      ],
    },
    {
      role: 'Usuarios',
      active: false,
      name: 'users',
      tasks: [
        { active: false, task: 'Editar' },
        { active: false, task: 'Generar Reporte' },
      ],
    },
    { role: 'Landing', active: false, name: 'landing', tasks: [] },
    { role: 'Pagos', active: false, name: 'payments', tasks: [] },
    { role: 'Tarea', active: false, name: 'homeworks', tasks: [], courses: [] },
    {
      role: 'Comentarios',
      active: false,
      name: 'comments',
      tasks: [
        { active: false, task: 'Crear' },
        { active: false, task: 'Eliminar' },
        { active: false, task: 'Editar' },
      ],
      courses: [],
    },
    {
      role: 'Trivias',
      active: false,
      name: 'trivias',
      tasks: [
        { active: false, task: 'Crear' },
        { active: false, task: 'Editar' },
      ],
    },
    {
      role: 'Listado de Trivias',
      active: false,
      name: 'trivias_list',
      tasks: [{ active: false, task: 'Descargar' }],
    },
    {
      role: 'Formularios',
      active: false,
      name: 'forms',
      tasks: [
        { active: false, task: 'Crear' },
        { active: false, task: 'Editar' },
      ],
      forms: []
    },
    {
      role: 'Listado de Formularios',
      active: false,
      name: 'forms_list',
      tasks: [{ active: false, task: 'Descargar' }],
    },
    {
      role: 'Listado de Sorteos',
      active: false,
      name: 'tickets_list',
      tasks: [{ active: false, task: 'Descargar' }],
    },
    {
      role: 'Listado de Membresias',
      active: false,
      name: 'memberships_list',
      tasks: [{ active: false, task: 'Descargar' }],
    },
    {
      role: 'Distribuidoras',
      active: false,
      name: 'distributors',
      tasks: [
        { active: false, task: 'Crear' },
        { active: false, task: 'Editar' },
        { active: false, task: 'Eliminar' },
      ],
    },
  ]);
  const [loading, setLoading] = useState(true);
  const [homeworksCourseIds, setHomeworksCourseIds] = useState<number[]>([]);
  const [commentsCourseIds, setCommentsCourseIds] = useState<number[]>([]);
  const [formIds, setFormIds] = useState<number[]>([]);
  const [popUpComments, setPopUpComments] = useState<boolean>(false);
  const [popUpHomerworks, setPopUpHomerworks] = useState<boolean>(false);
  const [popUpForms, setPopUpForms] = useState<boolean>(false);

  useEffect(() => {
    const temp: AdminRole[] = [];
    admin.adminTypes.forEach((element) => {
      const role = roles.find((role) => role.name === element.role);
      if (role === undefined) {
        return;
      }

      role.active = changeValue(element.view ? 1 : 0);
      role.tasks.forEach((task) => {
        if (task.task === 'Crear') {
          // element.create = task.active ? 1 : 0;
          task.active = element.create === 1;
        } else if (task.task === 'Editar') {
          // element.edit = task.active ? 1 : 0;
          task.active = element.edit === 1;
        } else if (task.task === 'Eliminar') {
          // element.delete = task.active ? 1 : 0;
          task.active = element.delete === 1;
        } else if (task.task === 'Solicitudes') {
          // element.request = task.active ? 1 : 0;
          task.active = element.request === 1;
        } else if (task.task === 'Generar Reporte') {
          // element.report = task.active ? 1 : 0;
          task.active = element.report === 1;
        } else if (task.task === 'Descargar') {
          // element.download = task.active ? 1 : 0;
          task.active = element.download === 1;
        }
      });

      if (element.role === 'homeworks') {
        const newValue = element.courses
          ?.split(',')
          .map((courseId) => parseInt(courseId));
        setHomeworksCourseIds(newValue || []);
      } else if (element.role === 'comments') {
        const newValue = element.courses
          ?.split(',')
          .map((courseId) => parseInt(courseId));
        setCommentsCourseIds(newValue || []);
      } else if (element.role === 'forms') {
        const newValue = element.forms?.split(',').map((formId) => parseInt(formId));
        setFormIds(newValue || []);
      }
      temp.push(role);
    });
    setRoles(temp);
    setLoading(false);
  }, []);

  const changeValue = (value: number) => {
    return value === 1;
  };

  const handleRole = (e: { target: CheckBoxValues }, indexRole: number) => {
    const value = e.target.checked;
    roles[indexRole]!.active = value;
    setRoles(roles);
  };

  const handleChange = (
    e: { target: CheckBoxValues },
    indexRole: number,
    indexTask: number,
  ) => {
    const value = e.target.checked;
    roles[indexRole]!.tasks[indexTask]!.active = value;
    console.log({ roles });
    setRoles(roles);
  };

  const handleMultipleHomeworkIds = (courseId: number) => {
    let temp = [...homeworksCourseIds];
    if (homeworksCourseIds.includes(courseId)) {
      const index = homeworksCourseIds.indexOf(courseId);
      if (index > -1) {
        temp.splice(index, 1);
        setHomeworksCourseIds(temp);
      }
    } else {
      temp.push(courseId);
      setHomeworksCourseIds(temp);
    }
  };

  const handleMultipleCommentIds = (courseId: number) => {
    let temp = [...commentsCourseIds];
    if (commentsCourseIds.includes(courseId)) {
      const index = commentsCourseIds.indexOf(courseId);
      if (index > -1) {
        temp.splice(index, 1);
        setCommentsCourseIds(temp);
      }
    } else {
      temp.push(courseId);
      setCommentsCourseIds(temp);
    }
  };

  const handleMultipleFormsIds = (formId: number) => {
    let temp = [...formIds];
    if (formIds.includes(formId)) {
      const index = formIds.indexOf(formId);
      if (index > -1) {
        temp.splice(index, 1);
        setFormIds(temp);
      }
    } else {
      temp.push(formId);
      setFormIds(temp);
    }
  };

  const updateAdminType = async () => {
    // debugger;
    admin.adminTypes.forEach((element) => {
      const role = roles.find((role) => role.name === element.role);
      if (role === undefined) {
        return;
      }
      element.view = role.active ? 1 : 0;
      role.tasks.forEach((task) => {
        if (task.task === 'Crear') {
          element.create = task.active ? 1 : 0;
        } else if (task.task === 'Editar') {
          element.edit = task.active ? 1 : 0;
        } else if (task.task === 'Eliminar') {
          element.delete = task.active ? 1 : 0;
        } else if (task.task === 'Solicitudes') {
          element.request = task.active ? 1 : 0;
        } else if (task.task === 'Generar Reporte') {
          element.report = task.active ? 1 : 0;
        } else if (task.task === 'Descargar') {
          element.download = task.active ? 1 : 0;
        }
      });
      if (element.role === 'homeworks') {
        element.courses = homeworksCourseIds
          .filter((id) => !Number.isNaN(id))
          .join(', ');
      } else if (element.role === 'comments') {
        element.courses = commentsCourseIds
          .filter((id) => !Number.isNaN(id))
          .join(', ');
      } else if (element.role === 'forms') {
        element.forms = formIds
          .filter((id) => !Number.isNaN(id))
          .join(', ');
      }
    });

    let user = {
      user_id: admin.user_id,
      roles: admin.adminTypes,
    };

    console.log({ user });

    const queries = user.roles.map(role => {
      try {
        return backendRoleEditMethod(role);
      } catch (error) {
        return `Error con el role ${JSON.stringify(role)}`;
      }

    });
    console.log({ queries });
    // anterior
    try {
      await anterior(user);
    } catch (error) {
      console.error(error);
    }
  };

  const anterior = async (user: {
    user_id: number;
    roles: AdminType[];
  }) => {
    try {
      const res = await updateAdminAccessApi(user);
      setShow(false);
      refresh();
      alert('Accesos actualizados');
    } catch (error) {
      console.error(error);
      alert('Error al intentar actualizar los permisos');
    }
  }

  const selectAllFormChecks = () => {
    const result = forms.map(({ id }) => id);
    setFormIds(result);
    console.log({ result });
  }

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal
        show={popUpComments}
        onHide={() => {
          setPopUpComments(false);
        }}
        centered
      >
        <ModalCustom>
          <h2>Cursos</h2>
          {courses.map((course, index: number) => {
            return (
              <div className='flex' key={'courses' + index}>
                <p>{course.title}</p>
                <input
                  defaultChecked={commentsCourseIds.includes(course.id)}
                  type='checkbox'
                  onChange={(e) => {
                    handleMultipleCommentIds(course.id);
                  }}
                />
              </div>
            );
          })}
        </ModalCustom>
      </Modal>
      <Modal
        show={popUpHomerworks}
        onHide={() => {
          setPopUpHomerworks(false);
        }}
        centered
      >
        <ModalCustom>
          <h2>Cursos</h2>
          {courses.map((course, index: number) => {
            return (
              <div className='flex' key={'courses' + index}>
                <p>{course.title}</p>
                <input
                  defaultChecked={homeworksCourseIds.includes(course.id)}
                  type='checkbox'
                  onChange={(e) => {
                    handleMultipleHomeworkIds(course.id);
                  }}
                />
              </div>
            );
          })}
        </ModalCustom>
      </Modal>
      <Modal
        show={popUpForms}
        onHide={() => {
          setPopUpForms(false);
        }}
        centered
      >
        <ModalCustom>
          <h2>Formularios</h2>
          {forms.map((form, index: number) => {
            return (
              <div className='flex' key={'form' + index}>
                <p>{form.name}</p>
                <input
                  defaultChecked={formIds.includes(form.id)}
                  type='checkbox'
                  onChange={(e) => {
                    handleMultipleFormsIds(form.id);
                  }}
                />
              </div>
            );
          })}
          {
            // Continuar pronto
            false &&
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '10px',
                paddingBlock: '10px'
              }}
            >
              <UpdateButton onClick={selectAllFormChecks}>Agregar todos</UpdateButton>
              <UpdateButton onClick={updateAdminType}>Remover todos</UpdateButton>
            </div>
          }
        </ModalCustom>
      </Modal>
      <ModalContain>
        <TitleContain>
          <Title>Editar acceso</Title>
          <CloseIcon
            onClick={() => {
              setShow(false);
            }}
          />
        </TitleContain>
        <OptionsContain>
          <SectionOptions>
            <Info>Secciones a las que tiene acceso</Info>
            <SelectedRoleContain>
              {!loading &&
                roles.map((role, indexR) => {
                  return (
                    <div className='role-row' key={'role' + indexR}>
                      <RowContain>
                        <li>{role.role}</li>
                        <input
                          type='checkbox'
                          name={role.name}
                          defaultChecked={role.active}
                          onChange={(e) => handleRole(e, indexR)}
                        />
                      </RowContain>
                      {role.tasks.map((task, indexT) => {
                        return (
                          <div
                            className='tasks'
                            key={'role' + (indexR + indexT)}
                          >
                            <input
                              type='checkbox'
                              name={task.task}
                              defaultChecked={task.active}
                              onChange={(e) => handleChange(e, indexR, indexT)}
                            />
                            <li>{task.task}</li>
                          </div>
                        );
                      })}
                      {courses.length > 0 &&
                        ['homeworks', 'comments'].includes(role.name) && (
                          <p
                            className='open-courses'
                            onClick={() => {
                              if (role.name === 'homeworks') {
                                setPopUpHomerworks(true);
                              } else {
                                setPopUpComments(true);
                              }
                            }}
                          >
                            Ver cursos
                          </p>
                        )}
                      {
                        forms.length > 0 &&
                        ['forms'].includes(role.name) &&
                        (
                          <p
                            className='open-courses'
                            onClick={() => {
                              setPopUpForms(true);
                            }}
                          >
                            Ver formularios
                          </p>
                        )
                      }
                    </div>
                  );
                })}
            </SelectedRoleContain>
          </SectionOptions>
        </OptionsContain>
        <ButtonRoleContain>
          <UpdateButton onClick={updateAdminType}>Guardar cambios</UpdateButton>
        </ButtonRoleContain>
      </ModalContain>
    </Modal>
  );
};
export default RoleEdit;
