import { CSSProperties, useEffect, useState } from 'react';
import {
  Container,
  HWContainer,
} from './HomeWork.styled';

import styles from './HomeWorkNew.module.css';
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';
import HomeWorkModal from './HomeWorkModal/HomeWorkModal';
import { getGenericQueryResponse } from '../../api/admin';
import { GenericModal } from './HomeWorkModal/GenericModal';

type StatusValue = 'Pendiente' | 'Reprobada' | 'Aprobada' | 'Todos';

interface IHomework {
  homeworkId: number,
  homeworkTitle: string,
  userId: number,
  username: string,
  email: string,
  courseId: number,
  courseTitle: string,
  seasonId: number,
  seasonTitle: string,
  lessonId: number,
  lessonTitle: string,
  lessonTableTitle: string,
  points: number,
  date: string,
  link: string,
  status: StatusValue,
}

interface IWhereStatementParams {
  courseId: number;
  email: string;
  status: StatusValue;
}

interface ICourse { courseId: number, name: string };

const HOMEWORKS_PER_PAGE = 100;

export const NewHomeworks: React.FC = () => {

  const [showHomeworkModal, setShowHomeworkModal] = useState(false);
  const [showRetroDataModal, setShowRetroDataModal] = useState(false);
  const [showCopiedTextModal, setShowCopiedTextModal] = useState(false);
  const [selectedHomework, setSelectedHomework] = useState<IHomework | undefined>(undefined);
  const [maxPages, setMaxPages] = useState<number>(0);
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [coursesList, setCoursesList] = useState<ICourse[]>([]);

  const [email, setEmail] = useState('');
  const [courseId, setCourseId] = useState<number>(0);
  const [status, setStatus] = useState<StatusValue>('Todos');

  const [offset, setOffset] = useState(0);
  const [homeworks, setHomeworks] = useState<IHomework[]>([]);
  const [isLoadingHomeworks, setIsLoadingHomeworks] = useState(false);

  const [approved, setApproved] = useState(false);

  useEffect(() => {
    refreshHomeworks();
    getAllCourses();
  }, [offset, email, courseId, status]);

  const refreshHomeworks = async () => {
    try {
      setIsLoadingHomeworks(true);
      const maxPages = await getTotalHomeworksCount();
      const realMaxPage = Math.floor(maxPages / HOMEWORKS_PER_PAGE);
      setMaxPages(realMaxPage);
      if (pageIndex > realMaxPage) {
        setPageIndex(realMaxPage - 1);
        setOffset(0);
      } else {
        getHomeworks();
      }
    } catch (error) {
      console.error(error);
      setIsLoadingHomeworks(false);
    }
  }

  const getStatusWhereString = (status: StatusValue | undefined): string => {
    if (status === 'Todos') {
      return '';
    }

    if (status === 'Aprobada') {
      return `h.approved = 1 and h.status = 1`;
    }

    if (status === 'Reprobada') {
      return `h.approved = 0 and h.status = 1`;
    }
    return `h.approved = 0 and h.status = 0`;
  }

  const getWhereStatement = async (params: IWhereStatementParams): Promise<string> => {
    const { courseId, status, email } = params;
    try {
      const courseIdWhere = courseId > 0 ? `co.id = ${courseId}` : '';
      const emailWhere = email.length > 0 ? `u.email like '${email}%'` : '';
      const statusWhere = getStatusWhereString(status);
      const publishedWhere = `co.published = 1`;

      const whereStrings = [publishedWhere, courseIdWhere, emailWhere, statusWhere].filter(w => w.length > 0);

      if (whereStrings.some(ws => ws.length > 0)) {
        return `where ${whereStrings.join(' and ')}`;
      }
    } catch (error) {
      console.error(error);
    }
    return '';
  }

  const getHomeworks = async () => {
    interface IHomeworkResponse {
      homework_id: number,
      homework_title: string,
      user_id: number,
      username: string,
      email: string,
      general_title: string,
      created_at_seconds: number,
      image: string,
      status: string,
      lesson_id: number,
      lesson_title: string,
      season_id: number,
      season_title: string,
      course_id: number,
      course_title: string,
      points: number
    }

    setIsLoadingHomeworks(true);

    try {
      const whereString = await getWhereStatement({ courseId, status, email });
      const getHomeworksQuery = `select 
        h.id as homework_id,  
        lh.title as homework_title,
        u.id as user_id,
        u.name as username, 
        u.email, 
        concat('Lección "', le.title, '"', ' del curso "', co.title, '"') as general_title, 
        unix_timestamp(h.created_at) as created_at_seconds,
        h.image, 
        case when h.status = 1 and h.approved = 1 then 'Aprobada'
        when h.status = 1 and h.approved = 0 then 'Reprobada'
        else 'Pendiente' end as status,
        le.id as lesson_id,
        le.title as lesson_title,
        se.id as season_id,
        se.name as season_title,
        co.id as course_id,
        co.title as course_title,
        lh.points
        from homeworks as h 
        inner join lesson_homeworks as lh on lh.lessons_id = h.lesson_id
        inner join lessons as le on le.id = h.lesson_id
        inner join seasons as se on se.id = le.seasons_id
        inner join courses as co on co.id = h.courses_id
        inner join users as u on u.id = h.user_id
        ${whereString}
        order by h.created_at desc
        limit ${HOMEWORKS_PER_PAGE} offset ${offset};`;
      const response = await getGenericQueryResponse(getHomeworksQuery);
      const data = response.data.data as IHomeworkResponse[];

      const homeworks: IHomework[] = data.map(h => {
        return {
          homeworkId: h.homework_id,
          homeworkTitle: h.homework_title,
          userId: h.user_id,
          username: h.username,
          email: h.email,
          lessonTableTitle: h.general_title,
          date: new Date(h.created_at_seconds * 1000).toJSON().slice(0, 10),
          link: h.image,
          status: h.status as any,
          courseId: h.course_id,
          courseTitle: h.course_title,
          lessonId: h.lesson_id,
          lessonTitle: h.lesson_title,
          points: h.points,
          seasonId: h.season_id,
          seasonTitle: h.season_title
        }
      });
      setHomeworks(homeworks);
    } catch (error) {
      console.error(error);
      setIsLoadingHomeworks(false);
    }
    setIsLoadingHomeworks(false);
  }

  const getTotalHomeworksCount = async (): Promise<number> => {
    try {
      const whereString = await getWhereStatement({ courseId, status, email });
      const getCountOfHomeworkQuery = `select count(*) as count 
        from homeworks as h 
        inner join courses as co on co.id = h.courses_id
        inner join lessons as le on le.id = h.lesson_id
        inner join users as u on u.id = h.user_id
        ${whereString};`;
      const response = await getGenericQueryResponse(getCountOfHomeworkQuery);
      const totalOfHomeworks = response.data.data;
      const count = totalOfHomeworks[0]['count'] as number;
      return count;
    } catch (error) {
      console.error(error);
    }
    return 0;
  }

  const getAllCourses = async () => {

    interface ICourseResponse { course_id: number, course_name: string }

    try {
      const getAllCoursesQuery = `select distinct c.id as course_id, c.title as course_name
        from lesson_homeworks as lh
        inner join lessons as l on l.id = lh.lessons_id
        inner join seasons as s on s.id = l.seasons_id
        inner join courses as c on c.id = s.course_id
        where c.published = 1
        order by c.title;`;
      const response = await getGenericQueryResponse(getAllCoursesQuery);
      const data = response.data.data as ICourseResponse[];

      const courses: ICourse[] = data.map(c => {
        return {
          courseId: c.course_id,
          name: c.course_name
        }
      });
      setCoursesList(courses);
    } catch (error) {
      console.error(error);
      setCoursesList([]);
    }
  }

  const handleClickDownload = (link: string) => {
    window.open(link, '_blank');
  }

  const generateEmptyDataComponent = () => {
    return <div className={styles['empty-container']}>
      <p className={styles['empty-message']}>No existen tareas con dichos filtros</p>
    </div>
  }

  const getNextHomeWorks = (direction: string) => {
    if (direction === 'backward') {
      if (pageIndex !== 0) {
        setPageIndex(pageIndex - 1);
        setOffset((pageIndex - 1) * HOMEWORKS_PER_PAGE);
      }
    }
    if (direction === 'forward') {
      if (pageIndex !== maxPages - 1) {
        setPageIndex(pageIndex + 1);
        setOffset((pageIndex + 1) * HOMEWORKS_PER_PAGE);
      }
    }
    if (direction === 'first') {
      setPageIndex(0);
      setOffset(0);
    }
    if (direction === 'last') {
      setPageIndex(maxPages - 1);
      setOffset((maxPages - 1) * HOMEWORKS_PER_PAGE);
    }
  }

  const getStatusNumberValue = (status: StatusValue) => {
    if (status === 'Aprobada' || status === 'Reprobada') {
      return 1;
    }
    return 0;
  }

  const handleOnClickHomeworkRow = (homework: IHomework) => {
    setSelectedHomework(homework);
    setShowHomeworkModal(true);
  }

  const generateHomeworkModalContent = (approved: boolean) => {
    const stylesOfP: CSSProperties = {
      fontFamily: '\'Montserrat\', sans-serif',
      fontWeight: '500',
    }
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <p style={{
        ...stylesOfP,
        paddingBottom: '16px'
      }}>La usuaria con nombre "{selectedHomework?.username}" con
        correo "{selectedHomework?.email}" ha sido{' '}
        <span
          style={{
            color: approved ? 'green' : 'red',
            fontWeight: '600'
          }}
        >{approved ? 'aprobada' : 'reprobada'}</span>.
      </p>
      <p style={stylesOfP}>
        La tarea pertenece al curso "{selectedHomework?.courseTitle}" en la lección "{selectedHomework?.lessonTitle}".
      </p>
      <div>
      </div>
    </div>
  }

  const handleCloseFinalModal = () => {
    setShowRetroDataModal(false);
    refreshHomeworks();
  }

  return <div className={styles['admin-contain']}>
    <HWContainer>
      <Container>
        <div className={styles['title-contain']}>
          <div className={styles['main-container']}>
            <header className={styles['header']}>
              <h2 className={styles['title']}>Tareas</h2>
              <div className={styles['filters']}>
                <div className={styles['filter-container']}>
                  <label className={styles['label']} htmlFor="">Curso</label>
                  <select
                    id=""
                    className={styles['select']}
                    onChange={(e) => {
                      if (!isLoadingHomeworks) {
                        setCourseId(parseInt(e.target.value))
                      }
                    }}
                    value={courseId}
                  >
                    <option value="0">Todos los cursos</option>
                    {
                      coursesList.map((c, index) => {
                        return (
                          <option
                            value={`${c.courseId}`}
                            key={`course_${index}`}
                          >
                            {c.name}
                          </option>
                        )
                      })
                    }
                  </select>
                </div>
                <div className={styles['filter-container']}>
                  <label className={styles['label']} htmlFor="">Email de usuaria</label>
                  <input
                    className={styles['input-text']}
                    type="text"
                    name=""
                    id=""
                    placeholder='correo.electronico@dominio.com'
                    onKeyDown={(e) => {
                      const { key } = e;
                      const isNumber = '0123456789'.includes(key);
                      const isLetter = (key.codePointAt(0)! >= 65 && key.codePointAt(0)! <= 90) || (key.codePointAt(0)! >= 97 && key.codePointAt(0)! <= 122)
                      const isSpecial = '@_-'.includes(key);
                      if (!(isNumber || isLetter || isSpecial)) {
                        e.preventDefault();
                      }
                    }}
                    onChange={(e) => {
                      if (!isLoadingHomeworks) {
                        setEmail(e.target.value.trim());
                      }
                    }}
                    value={email}
                  />
                </div>
                <div className={styles['filter-container']}>
                  <label className={styles['label']} htmlFor="">Estatus</label>
                  <select
                    className={styles['select']}
                    id=""
                    onChange={(e) => {
                      if (!isLoadingHomeworks) {
                        setStatus(e.target.value as any);
                      }
                    }}
                    value={status}
                  >
                    <option value="Todos">Todos</option>
                    {
                      ['Pendiente', 'Reprobada', 'Aprobada'].map((status, index) => {
                        return (
                          <option
                            value={status}
                            key={`status_${index}`}
                          >
                            {status}
                          </option>
                        )
                      })
                    }
                  </select>
                </div>
              </div>
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
                      if (maxPages > 0) {
                        getNextHomeWorks('last');
                      }
                    }}
                  >
                    {maxPages > 0 ? maxPages : 1}
                  </p>
                  <AiFillCaretRight
                    className='arrows'
                    onClick={() => {
                      if ((pageIndex + 1) < maxPages) {
                        getNextHomeWorks('forward');
                      }
                    }}
                  />
                </div>
                <div className='max-pages'>
                  <p className='max-number'>Paginas: {maxPages}</p>
                </div>
              </div>
            </header>
            {
              (!isLoadingHomeworks && homeworks.length === 0) &&
              generateEmptyDataComponent()
            }
            {
              (!isLoadingHomeworks && homeworks.length > 0) &&
              <div className={styles['table-container']}>
                <table className={styles['table']}>
                  {/*-- username, email, course_season_lesson, date, homework_link, status */}
                  <thead>
                    <tr className={styles['table-header']}>
                      <th className={styles['table-header-column']}>Usuaria</th>
                      <th className={styles['table-header-column']}>Correo eléctronico</th>
                      <th className={styles['table-header-column']}>Lección y curso</th>
                      <th className={styles['table-header-column']}>Fecha</th>
                      <th className={styles['table-header-column']}>Enlace</th>
                      <th className={styles['table-header-column']}>Estatus</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      homeworks.map((homework) => {
                        const { username, email, userId, date, homeworkId, lessonTableTitle: lessonTitle, link, status } = homework;
                        const na = styles['table-status-column--not-approve'];
                        const a = styles['table-status-column--approve'];
                        const p = styles['table-status-column--not-checked'];

                        const statusStyle = status === 'Aprobada' ? a : status === 'Reprobada' ? na : p;

                        return <tr
                          className={styles['table-row']}
                          key={`homework_${homeworkId}`}
                        >
                          <td
                            className={styles['table-body-data']}
                            onClick={() => {
                              handleOnClickHomeworkRow(homework);
                            }}
                          >{username}</td>
                          <td
                            className={styles['table-body-data']}
                            onClick={async () => {
                              try {
                                await navigator.clipboard.writeText(homework.email);
                                setShowCopiedTextModal(true);
                              } catch (error) {
                                console.error(error);
                              }
                            }}
                          >{email}</td>
                          <td
                            className={styles['table-body-data']}
                            onClick={() => {
                              handleOnClickHomeworkRow(homework);
                            }}
                          >{lessonTitle}</td>
                          <td
                            className={`${styles['table-body-data']} ${styles['table-body-data--no-wrap']}`}
                            onClick={() => {
                              handleOnClickHomeworkRow(homework);
                            }}
                          >{date}</td>
                          <td className={styles['table-body-data']}>
                            <p
                              className={styles['table-link-column']}
                              onClick={() => {
                                handleClickDownload(link);
                              }}
                            >Descargar tarea</p>
                          </td>
                          <td
                            className={styles['table-body-data']}
                            onClick={() => {
                              handleOnClickHomeworkRow(homework);
                            }}
                          >
                            <div className={`${styles['table-status-column']} ${statusStyle}`}>
                              {status}
                            </div>
                          </td>
                        </tr>
                      })
                    }
                  </tbody>
                </table>
              </div>
            }
            {
              isLoadingHomeworks &&
              <div className={styles['background-loader']}>
                <div className={styles['loader-image']}>
                  <div className={styles['loader-contain']}></div>
                </div>
              </div>
            }
          </div>
          <HomeWorkModal
            setShow={setShowHomeworkModal}
            show={showHomeworkModal}
            homework={{
              id: selectedHomework?.homeworkId!,
              courseId: selectedHomework?.courseId!,
              courseTitle: selectedHomework?.courseTitle!,
              lessonId: selectedHomework?.lessonId!,
              lessonNumber: selectedHomework?.lessonId!,
              lessonPoints: selectedHomework?.points!,
              lessonTitle: selectedHomework?.lessonTitle!,
              seasonNumber: selectedHomework?.seasonId!,
              seasonTitle: selectedHomework?.courseTitle!,
              status: getStatusNumberValue(selectedHomework?.status! as any),
              userId: selectedHomework?.userId!,
              userName: selectedHomework?.username!,
            }}
            handleClick={(approved) => {
              setShowHomeworkModal(false);
              setApproved(approved);
              setShowRetroDataModal(true);
            }}
          />
          <GenericModal
            content={generateHomeworkModalContent(approved)}
            context='information'
            isOpen={showRetroDataModal}
            onClose={handleCloseFinalModal}
            title='Revisión con éxito'
          />
          <GenericModal
            content={<></>}
            context='success'
            isOpen={showCopiedTextModal}
            onClose={() => setShowCopiedTextModal(false)}
            title='¡Correo copiado correctamente!'
          />
        </div>
      </Container>
    </HWContainer>
  </div>
}

