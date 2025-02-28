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
  getGenericQueryResponse,
  postGenericQueryResponse,
  updateAdminAccessApi,
} from '../../../api/admin';
import { AdminType } from './Constants';
import { backendRoleEditMethod } from './Queries';
import { getDistributorsAdminAccess } from '../Queries';

type CheckBoxValues = {
  name: string;
  checked: boolean;
};

type RoleProps = {
  admin: Admin;
  setShow: (open: boolean) => void;
  show: boolean;
  refresh: () => void;
  courses: { id: number; title: string; published: boolean }[];
  forms: { id: number; name: string; }[];
};

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
        { active: false, task: 'Descargar' },
        { active: false, task: 'ABM Vendedores' },
        { active: false, task: 'ABM Productos' },
        { active: false, task: 'Generar factura de accesos' },
        { active: false, task: 'Generar factura de productos' },
      ],
    },
    {
      role: 'Subscripciones',
      active: false,
      name: 'subscriptions',
      tasks: [],
    },
    {
      role: 'Miembros activos',
      active: false,
      name: 'active_memberships',
      tasks: [
        { active: false, task: 'Descargar' },
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
    console.log({ adminTypes: admin.adminTypes });

    const result: AdminRole[] = roles.map((role, index) => {
      const adminType = admin.adminTypes.find((adminType) => {
        return adminType.role === role.name;
      });

      if (adminType === undefined) {
        return role;
      }

      const mapFunction = (task: {
        active: boolean;
        task: TaskValue;
      }) => {
        let active = false;
        if (task.task === 'Crear') {
          active = adminType.create == 1;
        } else if (task.task === 'Editar') {
          active = adminType.edit == 1;
        } else if (task.task === 'Eliminar') {
          active = adminType.delete == 1;
        } else if (task.task === 'Solicitudes') {
          active = adminType.request == 1;
        } else if (task.task === 'Generar Reporte') {
          active = adminType.report == 1;
        } else if (task.task === 'Descargar') {
          active = adminType.download == 1;
        } else if (task.task === 'ABM Productos') {
          active = adminType.abm_products == 1;
        } else if (task.task === 'ABM Vendedores') {
          active = adminType.abm_sellers == 1;
        } else if (task.task === 'Generar factura de accesos') {
          active = adminType.create_access_invoices == 1;
        } else if (task.task === 'Generar factura de productos') {
          active = adminType.create_products_invoices == 1;
        }
        const result = {
          task: task.task,
          active
        }
        return result;
      }

      const tasks = role.tasks.map(mapFunction);
      const active = adminType.view == 1 ? true : false;
      let homeworkCourseIds: number[] = [];
      let commentsCourseIds: number[] = [];
      let formsIds: number[] = [];

      if (adminType.role === 'homeworks') {
        const coursesIdList = adminType.courses || '';
        homeworkCourseIds = coursesIdList
          .split(',')
          .map((courseId) => parseInt(courseId))
          .filter(formId => !isNaN(formId));
        setHomeworksCourseIds(homeworkCourseIds || []);
      } else if (adminType.role === 'comments') {
        const coursesIdList = adminType.courses || '';
        commentsCourseIds = coursesIdList
          .split(',')
          .map((courseId) => parseInt(courseId))
          .filter(formId => !isNaN(formId));
        setCommentsCourseIds(commentsCourseIds || []);
      } else if (adminType.role === 'forms') {
        const formsIdList = adminType.forms || '';
        formsIds = formsIdList
          .split(',')
          .map((formId) => parseInt(formId))
          .filter(formId => !isNaN(formId));
        setFormIds(formsIds || []);
      }

      const { name, role: roleName } = role;

      let finalResult: AdminRole = {
        active,
        name,
        role: roleName,
        tasks
      }

      if (homeworkCourseIds !== undefined || commentsCourseIds !== undefined) {
        if (homeworkCourseIds !== undefined) {
          finalResult = {
            ...finalResult,
            courses: homeworkCourseIds
          }
        }
        if (commentsCourseIds !== undefined) {
          finalResult = {
            ...finalResult,
            courses: commentsCourseIds
          }
        }
      }

      if (formsIds !== undefined) {
        finalResult = {
          ...finalResult,
          forms: formsIds
        }
      }

      return finalResult;
    });
    setRoles(result);
    setLoading(false);
  }, []);

  const handleRole = (e: { target: CheckBoxValues }, indexRole: number) => {
    const value = e.target.checked;
    const newRoles = roles.map((role, index) => {
      if (index !== indexRole) {
        return role;
      }
      return {
        ...role,
        active: value,
      }
    });
    setRoles(newRoles);
  };

  const handleChange = (
    e: { target: CheckBoxValues },
    indexRole: number,
    indexTask: number,
  ) => {
    const value = e.target.checked;
    const result = roles.map((role, index) => {
      if (index !== indexRole) {
        return role;
      }
      const newTasks = role.tasks.map((task, index) => {
        if (index !== indexTask) {
          return task;
        }
        return {
          ...task,
          active: value
        }
      });
      return {
        ...role,
        tasks: newTasks
      }
    });

    setRoles(result);
  };

  const handleMultipleIds = (id: number, array: number[], setState: (array: number[]) => void) => {
    let result = [...array];
    console.log({});
    if (array.includes(id)) {
      const index = array.indexOf(id);
      if (index > -1) {
        result.splice(index, 1);
        setState(result);
      }
    } else {
      result.push(id);
      console.log({
        newIds: result
      });
      setState(result);
    }
  }

  const updateAdminType = async () => {
    const getSourceTable = (roleName: string) => {
      if (roleName === 'course') {
        return `admin_courses`;
      }
      return `admin_${roleName}`;
    }

    console.log({ rolesToUpdate: roles });

    const newRoles: BackendRoleStructure[] = roles.map(({ name, active, tasks, forms, courses }) => {
      return {
        id: 0, // no es necesario el id
        role: name,
        source_table: getSourceTable(name),
        user_id: admin.user_id,
        view: active === true ? 1 : 0,
        create: tasks.find(t => t.task === 'Crear')?.active === true ? 1 : 0,
        edit: tasks.find(t => t.task === 'Editar')?.active === true ? 1 : 0,
        delete: tasks.find(t => t.task === 'Eliminar')?.active === true ? 1 : 0,
        report: tasks.find(t => t.task === 'Generar Reporte')?.active === true ? 1 : 0,
        download: tasks.find(t => t.task === 'Descargar')?.active === true ? 1 : 0,
        courses: courses?.join(','),
        forms: formIds.join(','),
        request: tasks.find(t => t.task === 'Solicitudes')?.active === true ? 1 : 0,
        abm_products: tasks.find(t => t.task === 'ABM Productos')?.active === true ? 1 : 0,
        abm_sellers: tasks.find(t => t.task === 'ABM Vendedores')?.active === true ? 1 : 0,
        create_access_invoices: tasks.find(t => t.task === 'Generar factura de accesos')?.active === true ? 1 : 0,
        create_products_invoices: tasks.find(t => t.task === 'Generar factura de productos')?.active === true ? 1 : 0,
      }
    });

    const finalRoles = newRoles.map((r) => {
      if (r.role === 'forms') {
        return {
          ...r,
          forms: formIds.join(',')
        }
      } else if (r.role === 'homeworks') {
        return {
          ...r,
          courses: homeworksCourseIds.join(',')
        }
      } else if (r.role === 'comments') {
        return {
          ...r,
          courses: commentsCourseIds.join(',')
        }
      }
      return r;
    })

    const queries = finalRoles.map(role => {
      try {
        return backendRoleEditMethod(role);
      } catch (error) {
        return `Error con el role ${JSON.stringify(role)}`;
      }
    });

    try {
      const results: string[] = [];
      const promises = queries.map(async (query) => {
        try {
          const response = await postGenericQueryResponse(query);
          results.push(JSON.stringify(response, null, 2));
        } catch (error) {
          console.error(error);
          if (error instanceof Error) {
            results.push(JSON.stringify(error, null, 2));
          }
        }
      });
      await Promise.all(promises);
      console.log({ results });
    } catch (error) {
      console.error(error);
    }
    refresh();
  };

  const selectAllFormChecks = () => {
    const result = forms.map(({ id }) => id);
    setFormIds(result);
    console.log({ result });
  }

  if (!loading) {
    console.log({ roles });
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
                  checked={commentsCourseIds.includes(course.id)}
                  type='checkbox'
                  onChange={(e) => {
                    handleMultipleIds(course.id, commentsCourseIds, setCommentsCourseIds);
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
                  checked={homeworksCourseIds.includes(course.id)}
                  type='checkbox'
                  onChange={(e) => {
                    handleMultipleIds(course.id, homeworksCourseIds, setHomeworksCourseIds);
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
                  checked={formIds.includes(form.id)}
                  type='checkbox'
                  onChange={(e) => {
                    console.log({
                      id: form.id,
                      formIds
                    });
                    handleMultipleIds(form.id, formIds, setFormIds);
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
                roles.map((role, indexR, roles) => {
                  return (
                    <div className='role-row' key={'role' + indexR}>
                      <RowContain>
                        <li>{role.role}</li>
                        <input
                          type='checkbox'
                          name={role.name}
                          checked={role.active}
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
                              checked={task.active}
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
