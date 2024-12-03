import React, { useState } from 'react';
import { AdminContain } from '../SideBar.styled';
import {
  AdminTable,
  DefaultColumn,
  DefaultContainer,
  DefaultFilterContain,
  DefaultRow,
  DefaultSearchContainer,
} from '../DefaultComponents/DefaultComponents.styled';
import { useAdmin } from '../../../hooks/AdminContext';
import Pagination from '../../Pagination/Pagination';
import { IAdminAssignments } from '../../../interfaces/IAdmin';
import { formatDate } from '../../../utils/functions';
import HomeWorkModal from '../HomeWork/HomeWorkModal/HomeWorkModal';
import Link from 'next/link';
import { Button } from '../HomeWork/HomeWork.styled';
const Assignments = () => {
  let adminContext = useAdmin();
  const {
    assignLoader,
    userFilters,
    totalAssignments,
    setUserFilters,
    courses,
    assignments,
  } = adminContext;
  const [currentAssignment, setCurrentAssignment] =
    useState<IAdminAssignments | null>(null);
  const [show, setShow] = useState<boolean>(false);

  const changePage = (page: number) => {
    setUserFilters({
      ...userFilters,
      offset: page * 100,
    });
  };
  const changeData = (key: string, data: string | number) => {
    let filters = userFilters;
    filters[key] = data;
    setUserFilters({ ...filters, offset: 0 });
  };
  const openAssignment = async (assignment: IAdminAssignments) => {
    setCurrentAssignment(assignment);
    setShow(true);
  };
  return (
    <AdminContain>
      <DefaultContainer>
        <div className='top-data'>
          <div className='header'>
            <DefaultColumn gap={5}>
              <div className='top-title'>
                <h2 className='title'>Tareas: {totalAssignments}</h2>
              </div>
              <DefaultSearchContainer>
                <div className='search-icon' />
                <input
                  className='search-input'
                  placeholder='Buscar un Usuario'
                  onChange={(e) => {
                    changeData('name', e.target.value);
                  }}
                  type={'text'}
                />
              </DefaultSearchContainer>
            </DefaultColumn>
            <Pagination
              changePage={changePage}
              currentPage={userFilters.offset / 100}
              totalPage={Math.ceil(totalAssignments / 100)}
            />
          </div>
          <DefaultColumn gap={10}>
            <h2 className='title-filter'>Filtros</h2>
            <DefaultRow gap={20}>
              <DefaultFilterContain>
                <p className='title-filter'>Por cursos</p>
                <select
                  defaultValue='todos'
                  onChange={(e) => {
                    changeData('courses', parseInt(e.target.value));
                  }}
                >
                  <option value={0}>Todos</option>
                  {courses.map((val: any, index: number) => {
                    return (
                      <option value={val.id} key={'cursos' + index}>
                        {val.title}
                      </option>
                    );
                  })}
                </select>
              </DefaultFilterContain>
              <DefaultFilterContain>
                <p className='title-filter'>Estado de tarea</p>
                <select
                  defaultValue='todos'
                  onChange={(e) => {
                    changeData('membership', e.target.value);
                  }}
                >
                  <option value='todos'>Ver todas</option>
                  <option value='pending'>Pendientes</option>
                  <option value='approve'>Aprobadas</option>
                  <option value='reject'>Rechazadas</option>
                </select>
              </DefaultFilterContain>
            </DefaultRow>
          </DefaultColumn>
        </div>
        <div className='table-contain'>
          <AdminTable id='Users'>
            <tbody style={{ display: 'inline-table', width: '100%' }}>
              <tr>
                <th>Usuario</th>
                <th>Correo Electrónico</th>
                <th>Curso (temporada, lección)</th>
                <th>Fecha</th>
                <th>Descargar Tarea</th>
                <th>Estatus</th>
              </tr>
              {/* TABLAS */}
              {
                <>
                  {!assignLoader && (
                    <>
                      {assignments.length > 0 &&
                        assignments.map(
                          (assignment: IAdminAssignments, index: number) => {
                            return (
                              <tr
                                key={'HomeWorks ' + index}
                                style={{ cursor: 'pointer' }}
                                onClick={() => openAssignment(assignment)}
                              >
                                <td>{assignment.user_name}</td>
                                <td>{assignment.user_email}</td>
                                <td>
                                  {assignment.course_title} (
                                  {assignment.season_title},{' '}
                                  {assignment.lesson_title}){' '}
                                </td>
                                <td>{formatDate(assignment.created_at)}</td>
                                <td
                                  style={{ padding: '0' }}
                                  onClick={(e: any) => {
                                    e.stopPropagation();
                                    setShow(false);
                                  }}
                                >
                                  <Link href={assignment.image}>
                                    <a
                                      target='_blank'
                                      style={{ textDecoration: 'none' }}
                                    >
                                      Descargar Tarea
                                    </a>
                                  </Link>
                                </td>
                                <td style={{ padding: '0' }}>
                                  {assignment.status === 0 ? (
                                    <Button
                                      status={assignment.status}
                                      approved={assignment.approved}
                                    >
                                      Pendiente
                                    </Button>
                                  ) : (
                                    <>
                                      {assignment.approved === 1 ? (
                                        <Button
                                          status={assignment.status}
                                          approved={assignment.approved}
                                        >
                                          {' '}
                                          Aprobada
                                        </Button>
                                      ) : (
                                        <Button
                                          status={assignment.status}
                                          approved={assignment.approved}
                                        >
                                          {' '}
                                          Rechazada
                                        </Button>
                                      )}
                                    </>
                                  )}
                                </td>
                              </tr>
                            );
                          },
                        )}
                    </>
                  )}
                </>
              }
            </tbody>
          </AdminTable>
        </div>
      </DefaultContainer>
      <HomeWorkModal
        setShow={setShow}
        show={show}
        homework={currentAssignment as any} // Esto ya no funciona
        handleClick={() => { }}
      />
    </AdminContain>
  );
};
export default Assignments;
