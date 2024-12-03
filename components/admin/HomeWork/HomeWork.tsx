import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { getCoursesApi } from '../../api/courses';
import { getHomeworksApi } from '../../api/homeworks';
import { getUserApi } from '../../api/users';
import { CaretD2, Label2 } from '../Courses/Form/Select/SelectStyles.styled';
import {
  Option,
  OptionContain,
  SelectContain,
  Selected,
} from '../Pay/Select/Select.styled';
import { AdminContain } from '../SideBar.styled';
import {
  Button,
  Container,
  Download,
  HWContainer,
  Table,
  TitleContain,
} from './HomeWork.styled';
import HomeWorkModal from './HomeWorkModal/HomeWorkModal';
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';
import { SearchInput } from '../Users/UsersList.styled';

export class CsvData {
  public id: any;
  public properties: any[] = [];
}

const HomeWork = () => {
  const [show, setShow] = useState(false);
  const [homeWorks, setHomeWorks] = useState<any>([]);
  const [data, setData] = useState<any>([]);
  const [id, setId] = useState(0);
  const [course, setCourse] = useState<any>([]);
  const [courseSelect, setCourseSelect] = useState(false);
  const [courseFilter, setCourseFilter] = useState<any>('');
  const [coursesId, setCoursesId] = useState<any>([]);
  const [filterForCourse, setFilterForCourse] = useState<boolean>(false);
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [courseIdForFilter, setCourseIdForFilter] = useState(0);
  const [filterForStatus, setFilterForStatus] = useState<boolean>(false);
  const [allHomeWorks, setAllHomeWorks] = useState<any>([]);
  const [filterForValue, setfilterForValue] = useState<boolean>(false);
  const [textFilter, setTextFilter] = useState('');
  const [maxPages, setMaxPages] = useState<number>(0);
  const [currentStatus, setCurrentStatus] = useState({
    status: 0,
    approved: 0,
  });
  const [userData, setUserData] = useState<any>(null);

  const openCourseSelect = () => {
    setCourseSelect(!courseSelect);
  };

  const getHomeworks = async () => {
    let user: any;
    if (localStorage.getItem('email'))
      user = await getUserApi(localStorage.getItem('email'));
    getHomeworksApi().then(async (res: any) => {
      let tempHomeworks = res.data.data;
      setAllHomeWorks(tempHomeworks);
      if (user.role === 'admin') {
        let array = user.roles[7].courses.split(',');
        let temp: any = [];
        await Promise.all(
          array.map((x: any) => {
            temp.push(+x);
          }),
        );
        getCoursesForAdmin(temp);
        setCoursesId(temp);
        tempHomeworks = res.data.data.filter((x: any) =>
          temp.includes(x.courseId),
        );
      }
      if (user.role === 'superAdmin') {
        let temp: any = [];
        await Promise.all(
          tempHomeworks.map((x: any) => {
            temp.push(+x.courseId);
          }),
        );
        getCoursesForAdmin(temp);
        setCoursesId(temp);
      }
      pagePerHomeworks(tempHomeworks);
    });
  };
  const getCoursesForAdmin = (courses_id: any) => {
    setPageIndex(0);
    getCoursesApi().then((res) => {
      let availableCourses: any = [];
      res.map((course: any) => {
        if (courses_id.includes(course.id)) {
          availableCourses.push(course);
        }
      });
      setCourse(availableCourses);
    });
  };
  const FilterHomeWorks = (course_id: number) => {
    setPageIndex(0);
    setCourseIdForFilter(course_id);
    let tempHomeworks = allHomeWorks;
    let query = textFilter.toLocaleLowerCase();
    if (filterForStatus) {
      tempHomeworks = allHomeWorks.filter(
        (x: any) =>
          x.status === currentStatus.status &&
          x.approved === currentStatus.approved,
      );
      tempHomeworks = tempHomeworks.filter(
        (x: any) => x.courseId === course_id,
      );
    } else {
      tempHomeworks = allHomeWorks.filter((x: any) => x.courseId === course_id);
    }
    if (filterForValue) {
      tempHomeworks = tempHomeworks.filter((item: any) => {
        return (
          item.userName.toLowerCase().includes(query) ||
          item.userEmail.includes(query)
        );
      });
    }
    pagePerHomeworks(tempHomeworks);
    setFilterForCourse(true);
  };
  const AllHomeWorks = () => {
    let tempHomeworks = allHomeWorks;
    let query = textFilter.toLocaleLowerCase();
    if (filterForValue) {
      tempHomeworks = tempHomeworks.filter((item: any) => {
        return (
          item.userName.toLowerCase().includes(query) ||
          item.userEmail.includes(query)
        );
      });
    }
    if (filterForStatus) {
      tempHomeworks = allHomeWorks.filter(
        (x: any) =>
          x.status === currentStatus.status &&
          x.approved === currentStatus.approved,
      );
      tempHomeworks = tempHomeworks.filter((x: any) =>
        coursesId.includes(x.courseId),
      );
    } else {
      tempHomeworks = allHomeWorks.filter((x: any) =>
        coursesId.includes(x.courseId),
      );
    }
    if (filterForValue) {
      tempHomeworks = tempHomeworks.filter((item: any) => {
        return (
          item.userName.toLowerCase().includes(query) ||
          item.userEmail.includes(query)
        );
      });
    }
    pagePerHomeworks(tempHomeworks);
    setFilterForCourse(false);
  };
  const formatDate = (created_at: any) => {
    const date = new Date(created_at);
    const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    return formattedDate;
  };
  const filterByStatus = (type: string) => {
    let tempHomeworks = allHomeWorks;
    let query = textFilter.toLocaleLowerCase();
    if (filterForCourse) {
      if (filterForValue) {
        tempHomeworks = tempHomeworks.filter((item: any) => {
          return (
            item.userName.toLowerCase().includes(query) ||
            item.userEmail.includes(query)
          );
        });
      }
      tempHomeworks = tempHomeworks.filter(
        (x: any) => x.courseId === courseIdForFilter,
      );
      if (type === 'all') {
        tempHomeworks = tempHomeworks;
        setFilterForStatus(false);
      } else {
        setPageIndex(0);
        setFilterForStatus(true);
      }
      if (type === 'pending') {
        tempHomeworks = tempHomeworks.filter((x: any) => x.status === 0);
        setCurrentStatus({
          status: 0,
          approved: 0,
        });
      }
      if (type === 'approved') {
        tempHomeworks = tempHomeworks.filter(
          (x: any) => x.status === 1 && x.approved === 1,
        );
        setCurrentStatus({
          status: 1,
          approved: 1,
        });
      }
      if (type === 'rejected') {
        tempHomeworks = tempHomeworks.filter(
          (x: any) => x.status === 1 && x.approved === 0,
        );
        setCurrentStatus({
          status: 1,
          approved: 0,
        });
      }
    } else {
      tempHomeworks = tempHomeworks.filter((item: any) => {
        return (
          item.userName.toLowerCase().includes(query) ||
          item.userEmail.includes(query)
        );
      });
      if (type === 'all') {
        tempHomeworks = tempHomeworks;
        setFilterForStatus(false);
      } else {
        setPageIndex(0);
        setFilterForStatus(true);
      }
      if (type === 'pending') {
        tempHomeworks = tempHomeworks.filter((x: any) => x.status === 0);
        setCurrentStatus({
          status: 0,
          approved: 0,
        });
      }
      if (type === 'approved') {
        tempHomeworks = tempHomeworks.filter(
          (x: any) => x.status === 1 && x.approved === 1,
        );
        setCurrentStatus({
          status: 1,
          approved: 1,
        });
      }
      if (type === 'rejected') {
        tempHomeworks = tempHomeworks.filter(
          (x: any) => x.status === 1 && x.approved === 0,
        );
        setCurrentStatus({
          status: 1,
          approved: 0,
        });
      }
    }
    pagePerHomeworks(tempHomeworks);
  };
  const filterhwkByValue = (value: string): void => {
    if (value === '') {
      setfilterForValue(false);
    } else {
      setfilterForValue(true);
    }
    setTextFilter(value);
    let tempAllHwk = allHomeWorks;
    let query = value.toLocaleLowerCase();
    let filteredHwk = tempAllHwk.filter((item: any) => {
      return (
        item.userName.toLowerCase().includes(query) ||
        item.userEmail.includes(query)
      );
    });
    if (filterForStatus) {
      filteredHwk = filteredHwk.filter(
        (x: any) =>
          x.status === currentStatus.status &&
          x.approved === currentStatus.approved,
      );
      pagePerHomeworks(filteredHwk);
    }
    if (filterForCourse) {
      filteredHwk = filteredHwk.filter(
        (x: any) => x.courseId === courseIdForFilter,
      );
    }
    pagePerHomeworks(filteredHwk);
  };
  const pagePerHomeworks = (homework: any) => {
    setPageIndex(0);
    let usersPerPage: number = 100;
    let pages: number = Math.ceil(homework.length / usersPerPage);
    let tempHomeWork: any = [];
    for (let i = 0; i < pages; i++) {
      tempHomeWork.push([]);
      for (let j = 0; j < usersPerPage; j++) {
        if (homework[j + usersPerPage * i]) {
          tempHomeWork[i].push(homework[j + usersPerPage * i]);
        }
      }
    }
    setMaxPages(pages);
    setHomeWorks(tempHomeWork);
  };
  const getNextHomeWorks = (direction: string) => {
    if (direction === 'backward') {
      if (pageIndex !== 0) {
        setPageIndex(pageIndex - 1);
      }
    }
    if (direction === 'forward') {
      if (pageIndex !== maxPages - 1) {
        setPageIndex(pageIndex + 1);
      }
    }
    if (direction === 'first') {
      setPageIndex(0);
    }
    if (direction === 'last') {
      setPageIndex(maxPages - 1);
    }
  };
  const handleClick = (approved: any) => {
    homeWorks[pageIndex][id].status = 1;
    homeWorks[pageIndex][id].approved = approved;
    alert('Tarea revisada con éxito!');
    if (filterForStatus === true) {
      filterByStatus('pending');
    }
    setShow(false);
  };
  useEffect(() => {
    getHomeworks();
  }, []);

  return (
    <AdminContain>
      <HWContainer>
        <Container>
          <TitleContain>
            <p>Tareas</p>
            <div
              style={{
                display: 'flex',
                gap: 10,
                flexWrap: 'wrap',
                justifyContent: 'end',
              }}
            >
              <SelectContain key={2}>
                <Selected onClick={openCourseSelect}>
                  {courseFilter ? courseFilter.title : 'Seleccione un curso'}
                  <CaretD2 style={{ top: '18%' }} />
                </Selected>
                {courseSelect == true && (
                  <OptionContain>
                    <Option
                      onClick={() => {
                        setCourseFilter('');
                        setCourseSelect(false);
                        AllHomeWorks();
                      }}
                    >
                      <input
                        type='radio'
                        id='professor'
                        name='professor'
                        value=''
                      />
                      <Label2>Ver Todas</Label2>
                    </Option>
                    {course.map((val: any, index: any) => {
                      return (
                        <Option
                          key={'Professor ' + index}
                          onClick={() => {
                            FilterHomeWorks(val.id);
                            setCourseFilter(val);
                            setCourseSelect(false);
                          }}
                        >
                          <input
                            type='radio'
                            id='professor'
                            name='professor'
                            value='professor'
                          />
                          <Label2>{val.title}</Label2>
                        </Option>
                      );
                    })}
                  </OptionContain>
                )}
              </SelectContain>
              <select
                onChange={(e: any) => {
                  filterByStatus(e.target.value);
                }}
              >
                <option value='all'>Ver todas</option>
                <option value='pending'>Pendientes</option>
                <option value='approved'>Aprobadas</option>
                <option value='rejected'>Rechazadas</option>
              </select>
              <SearchInput
                style={{
                  paddingInline: 20,
                  paddingBlock: 8,
                  borderRadius: 100,
                }}
                placeholder='Buscar una tarea'
                type={'text'}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  filterhwkByValue(e.target.value)
                }
              />
            </div>
          </TitleContain>
          <div className='pages'>
            <div className='index'>
              <AiFillCaretLeft
                className='arrows'
                onClick={() => {
                  getNextHomeWorks('backward');
                }}
              />
              <p
                className='default-number'
                onClick={() => {
                  getNextHomeWorks('first');
                }}
              >
                1
              </p>
              <p className='current-number'>{pageIndex + 1}</p>
              <p
                className='default-number'
                onClick={() => {
                  getNextHomeWorks('last');
                }}
              >
                {maxPages}
              </p>
              <AiFillCaretRight
                className='arrows'
                onClick={() => {
                  getNextHomeWorks('forward');
                }}
              />
            </div>
            <div className='max-pages'>
              <p className='max-number'>Paginas: {maxPages}</p>
            </div>
          </div>
          <Table id='Pay'>
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
              {homeWorks.length > 0 &&
                homeWorks[pageIndex].map((task: any, index: any) => {
                  return (
                    <tr
                      key={'HomeWorks ' + index}
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        setShow(true);
                        setData(task);
                        setId(index);
                      }}
                    >
                      <td>{task.userName}</td>
                      <td>{task.userEmail}</td>
                      <td>
                        {task.courseTitle} ({task.seasonTitle},{' '}
                        {task.lessonTitle}){' '}
                      </td>
                      <td style={{ whiteSpace: 'nowrap' }}>
                        {formatDate(task.homeworkCreatedAt)}
                      </td>
                      <td
                        style={{ padding: '0' }}
                        onClick={(e: any) => {
                          e.stopPropagation();
                          setShow(false);
                        }}
                      >
                        <Link href={task.homeworkImage}>
                          <a target='_blank' style={{ textDecoration: 'none' }}>
                            <Download>Descargar Tarea</Download>
                          </a>
                        </Link>
                      </td>
                      <td style={{ padding: '0' }}>
                        {task.status === 0 ? (
                          <Button status={task.status} approved={task.approved}>
                            Pendiente
                          </Button>
                        ) : (
                          <>
                            {task.approved === 1 ? (
                              <Button
                                status={task.status}
                                approved={task.approved}
                              >
                                {' '}
                                Aprobada
                              </Button>
                            ) : (
                              <Button
                                status={task.status}
                                approved={task.approved}
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
                })}
            </tbody>
          </Table>
          <HomeWorkModal
            setShow={setShow}
            show={show}
            homework={data}
            handleClick={handleClick}
          />
        </Container>
      </HWContainer>
    </AdminContain>
  );
};
export default HomeWork;
