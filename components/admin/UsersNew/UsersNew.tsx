import React, { useEffect, useState } from 'react';
import { MainContainer } from './UsersNew.styled';
import { getGenericQueryResponse } from '../../api/admin';
import { fontWeight } from 'html2canvas/dist/types/css/property-descriptors/font-weight';
import { useRouter } from 'next/router';

type MainMenuOptionId = 'Subscription' | 'Payments' | 'Courses' | 'Rewards';
type RewardsCenterMenuOptionId = 'Rewards' | 'Benefits' | 'Certificates';

const MONTHS_SPANISH = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

interface IMainMenuOption {
  id: MainMenuOptionId,
  label: string
}

interface IRewardsCenterMenuOption {
  id: RewardsCenterMenuOptionId,
  label: string
}

interface IUserMainProperties {
  username: string,
  email: string,
  phone: string,
  createdAt: string,
  points: number,
  photo: string
}

interface IUserPaymentHistory {
  orderNumber: number
  amount: number
  paidAt: string
  product: string
}

interface IUserCoursesResume {
  courseId: number;
  courseName: string;
  lastSingIn: string;
  finishDate: string;
  statePercent: number;
}

interface IUserHomeworkHistory {
  homeworkId: number,
  courseId: number,
  seasonId: number,
  lessonId: number,
  lessonTitle: string,
  status: number,
  approved: number,
  homeworkStatus: string,
  comment: string,
  createdAt: string
}

// const [userCoursesResume, setUserCoursesResume] = useState<IUserCoursesResume>({} as IUserCoursesResume);

const MAIN_SECTIONS: IMainMenuOption[] = [
  {
    label: 'Suscripción',
    id: 'Subscription'
  },
  {
    label: 'Historial de pago',
    id: 'Payments'
  },
  {
    label: 'Cursos Realizados',
    id: 'Courses'
  },
  {
    label: 'Centro de recompensas',
    id: 'Rewards'
  }];

const REWARDS_SECTIONS: IRewardsCenterMenuOption[] = [{
  label: 'Recompensas',
  id: 'Rewards'
}, {
  label: 'Beneficios',
  id: 'Benefits'
}, {
  label: 'Certificados',
  id: 'Certificates'
}
];

const getFormatedDate = (date: Date) => {
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

const getPrettyFormatedDate = (paidAt: string | number) => {
  const date = new Date(typeof paidAt === 'number' ? paidAt * 1000 : paidAt);
  const monthIndex = date.getMonth();
  const day = date.getDate();
  const year = date.getFullYear();
  const formatedDate = `${MONTHS_SPANISH[monthIndex]} ${day}, ${year}`;
  return formatedDate;
}

const UsersDetails = () => {
  const router = useRouter();
  const [userId, setUserId] = useState(0);
  const [selectedMainMenuOption, setSelectedMainMenuOption] = useState<MainMenuOptionId>('Payments');
  const [selectedRewardsCenterMenuOption, setSelectedRewardsCenterMenuOption] = useState<RewardsCenterMenuOptionId>('Rewards');
  const [viewHomeworks, setViewHomeworks] = useState<boolean>(false);
  const [rewardsMenuOption, setRewardsMenuOption] = useState();
  const [userMainProperties, setUserMainProperties] = useState<IUserMainProperties>({} as IUserMainProperties);
  const [userPaymentHistory, setUserPaymentHistory] = useState<IUserPaymentHistory[]>([]);

  const [userCoursesResume, setUserCoursesResume] = useState<IUserCoursesResume[]>([]);
  const [userHomeworkHistory, setUserHomeworkHistory] = useState<IUserHomeworkHistory[]>([]);

  const [userFilteredHomeworkHistory, setUserFilteredHomeworkHistory] = useState<IUserHomeworkHistory[]>([]);

  const changeMainMenuOptionHandler = (newOption: MainMenuOptionId) => {
    setSelectedMainMenuOption(newOption);
  }

  /*
  En el div cuya clase es "sections-container", hay que agregar la clase "section-title--active"
  para aclarar en cual sección esta el usuario
  */

  useEffect(() => {
    const selectedUserId = localStorage.getItem('selected-user-id');
    if (selectedUserId !== null) {
      setUserId(parseInt(selectedUserId));
    }
  }, []);

  useEffect(() => {
    if (userId !== 0) {
      getUserMainProperties();
      getUserPaymentHistory();
      getUserCoursesResume();
      getUserHomeworksHistory();
    }
  }, [userId]);

  const getUserMainProperties = async () => {
    const userMainPropertiesQuery = `select concat(name, ' ', last_name) as username, email, phone_number, photo, score, created_at
      from users 
      where id = ${userId};`

    interface IUserMainPropertiesResponse {
      username: string
      email: string
      phone_number: string
      photo: string
      score: number
      created_at: string
    }

    const response = await getGenericQueryResponse(userMainPropertiesQuery);
    const userProperties: IUserMainPropertiesResponse = response.data.data[0];

    const { username, created_at, email, phone_number, photo, score } = userProperties;

    setUserMainProperties({
      username,
      createdAt: created_at,
      email,
      phone: phone_number,
      points: score,
      photo
    });
  }

  const getUserPaymentHistory = async () => {
    const query = `select id as order_number, amount, paid_at, product 
    from invoices 
    where user_id = ${userId};`;

    interface IUserPaymentHistoryResponse {
      order_number: number;
      amount: number;
      paid_at: string;
      product: string;
    }

    const response = await getGenericQueryResponse(query);
    const userPaymentHistory: IUserPaymentHistoryResponse[] = response.data.data;

    const result: IUserPaymentHistory[] = [];
    userPaymentHistory.forEach(({ amount, order_number, paid_at, product }) => {
      result.push({
        amount,
        orderNumber: order_number,
        paidAt: paid_at,
        product
      });
    });

    setUserPaymentHistory(result);
  }

  const getUserCoursesResume = async () => {
    const userResumeQuery = `SELECT approve_lessons_by_user.course_id,
            title,
            last_seen_time,
            CASE  
            	WHEN Round(( finish_lessons_count / lessons_count ) * 100) = 100 and finish_course_seconds IS NULL THEN last_seen_time
            	WHEN Round(( finish_lessons_count / lessons_count ) * 100) = 100 and finish_course_seconds IS NOT NULL THEN finish_course_seconds
            	ELSE NULL  
            END AS finish_course_time,
            Round(( finish_lessons_count / lessons_count ) * 100) AS percent,
            published
      FROM   (SELECT c.id AS course_id, Count(DISTINCT l.id) AS finish_lessons_count
              FROM progress AS p
              INNER JOIN lessons AS l ON l.id = p.lessons_id
              INNER JOIN seasons AS s ON s.id = l.seasons_id
              INNER JOIN courses AS c ON c.id = s.course_id
              WHERE  user_id = ${userId}
              GROUP  BY c.id) AS approve_lessons_by_user
      INNER JOIN (SELECT c.id AS course_id,
                  c.title,
                  c.published,
                  Count(l.id) AS lessons_count
                  FROM lessons AS l
                  INNER JOIN seasons AS s ON s.id = l.seasons_id
                  INNER JOIN courses AS c ON c.id = s.course_id
                  GROUP  BY c.id, c.title, c.published) AS courses_all_lessons 
                  ON approve_lessons_by_user.course_id = courses_all_lessons.course_id
      INNER JOIN (SELECT DISTINCT h.course_id, Unix_timestamp(h.last_seen) AS last_seen_time
                  FROM history AS h WHERE  user_id = ${userId}) AS last_seen_courses 
                  ON last_seen_courses.course_id = approve_lessons_by_user.course_id
      LEFT JOIN (SELECT course_id,
                        Unix_timestamp(created_at) AS finish_course_seconds
                        FROM   user_certificates
                        WHERE  user_id = ${userId}) AS finish_courses 
                        ON finish_courses.course_id = approve_lessons_by_user.course_id;`;

    interface IUserResume {
      course_id: number;
      title: string;
      last_seen_time: string;
      finish_course_time: string;
      percent: number;
      published: number; // booleano
    }

    const userResumeResponse = await getGenericQueryResponse(userResumeQuery);
    const userResume: IUserResume[] = userResumeResponse.data.data;

    const result: IUserCoursesResume[] = [];
    userResume.forEach(({ course_id, title, finish_course_time, last_seen_time, percent, published }) => {
      const lastDate = finish_course_time !== null ? getPrettyFormatedDate(parseInt(finish_course_time)) : '- - -';
      result.push({
        courseId: course_id,
        courseName: title,
        finishDate: lastDate,
        lastSingIn: getPrettyFormatedDate(parseInt(last_seen_time)),
        statePercent: percent
      });
    });

    setUserCoursesResume(result);
  }

  const getUserHomeworksHistory = async () => {
    const query = `select h.id as homework_id, 
            h.courses_id,
            h.season_id,
            h.lesson_id,
            h.title,
            h.status,
            h.approved,
            case when status = 1 and approved = 1 then 'Aprobada'
            when status = 1 and approved = 0 then 'Reprobada'
            else 'Sin revisar' end as homework_status,
            h.comment,
            unix_timestamp(created_at) as created_at_seconds
      from homeworks as h 
      inner join (
      select distinct h.courses_id, h.lesson_id, max(h.id) as last_try_id
      from homeworks as h 
      where h.user_id = ${userId}
      group by h.courses_id, h.lesson_id
      ) as h2 on h2.last_try_id = h.id;`;

    interface IUserHomework {
      homework_id: number,
      courses_id: number,
      season_id: number,
      lesson_id: number,
      title: string,
      status: number,
      approved: number,
      homework_status: string,
      comment: string,
      created_at_seconds: string
    }

    const userHomeworkResumeResponse = await getGenericQueryResponse(query);
    const userHomeworkResume: IUserHomework[] = userHomeworkResumeResponse.data.data;

    const result: IUserHomeworkHistory[] = [];
    userHomeworkResume.forEach(({ homework_id, courses_id, season_id, lesson_id, title, comment, created_at_seconds, homework_status, approved, status }) => {
      const lastDate = created_at_seconds !== null ? getPrettyFormatedDate(parseInt(created_at_seconds)) : '- - -';
      result.push({
        courseId: courses_id,
        homeworkId: homework_id,
        approved,
        comment,
        homeworkStatus: homework_status,
        createdAt: lastDate,
        lessonId: lesson_id,
        lessonTitle: title,
        seasonId: season_id,
        status
      });
    });

    setUserHomeworkHistory(result);
  }

  return (
    <MainContainer>
      <div
        className="top-header"
        onClick={() => {
          localStorage.removeItem('selected-user-id');
          router.push({
            pathname: '/admin/Users'
          });
        }}
      >
        {/*<i>🔙</i>*/}
        <img className="go-back__arrow" src="/images/back-arrow.png" alt="back-arrow" />
        <p style={{ margin: '0' }}>Atrás</p>
      </div>
      <div className="data-container">
        <div className="user-main-header">
          <div className="user-profile">
            <div className="user-image">
              <img src={`${userMainProperties.photo}`} alt="user profile photo" />
            </div>
            <div className="user-name">
              {userMainProperties.username}
            </div>
          </div>
          <div className="user-properties">
            <div className="user-property">
              <div className="user-property-header">Correo electrónico</div>
              <div className="user-property-value">{userMainProperties.email}</div>
            </div>
            <div className="user-property">
              <div className="user-property-header">Teléfono</div>
              <div className="user-property-value">{userMainProperties.phone}</div>
            </div>
            <div className="user-property">
              <div className="user-property-header">Fecha de creación</div>
              <div className="user-property-value">{getFormatedDate(new Date(userMainProperties.createdAt))}</div>
            </div>
            <div className="user-property">
              <div className="user-property-header">Puntos</div>
              <div className="user-property-value">{userMainProperties.points}</div>
            </div>
          </div>
        </div>
        <div className="sections-container">
          {
            MAIN_SECTIONS.map(({ id, label }) => {
              const extraCSSClass = selectedMainMenuOption === id ? 'section-title--active' : '';
              return (
                <div
                  key={`${id}`}
                  className={`section-title ${extraCSSClass}`}
                  onClick={(e) => {
                    setSelectedMainMenuOption(id)
                  }}
                >
                  {label}
                </div>
              )
            })
          }
        </div>
        {
          selectedMainMenuOption === 'Subscription' &&
          <div className="content-section">
            {
              <div className='subscription-container'>
                <div className='subscription-info-container'>
                  <div className='subscription-item'>
                    <div className='subscription-item__header'>
                      <p className='subscription-item__title'>Estado de suscripción</p>
                    </div>
                    <div className='subscription-item__content'>
                      <p className='subscription-item__content-text'>Activo</p>
                    </div>
                  </div>
                  <div className='subscription-item'>
                    <div className='subscription-item__header'>
                      <p className='subscription-item__title'>Tipo de la suscripción</p>
                    </div>
                    <div className='subscription-item__content'>
                      <p className='subscription-item__content-text'>Mensual</p>
                    </div>
                  </div>
                  <div className='subscription-item'>
                    <div className='subscription-item__header'>
                      <p className='subscription-item__title'>Método de la suscripción</p>
                    </div>
                    <div className='subscription-item__content'>
                      <p className='subscription-item__content-text'>Tarjeta de Credito / Debito (Conekta)</p>
                    </div>
                  </div>
                  <div className='subscription-item'>
                    <div className='subscription-item__header'>
                      <p className='subscription-item__title'>Fechas</p>
                    </div>
                    <div className='subscription-item__content'>
                      <p className='subscription-item__content-text'>
                        Inicio:
                        <span className='subscription-item__content-text--normal-weight'>
                          {' '}25 May 2025
                        </span>
                      </p>
                      <p className='subscription-item__content-text'>
                        Termino:
                        <span className='subscription-item__content-text--normal-weight'>
                          {' '}25 Jun 2025
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className='subscription-actions-container'>
                  <div>

                  </div>
                </div>
              </div>
            }
          </div>
        }
        {
          selectedMainMenuOption === 'Payments' &&
          <div className="content-section">
            {
              userPaymentHistory.length > 0 ?
                <div className="table-content">
                  <table className="gonvar-table">
                    <thead className="gonvar-table__thead">
                      <tr className="gonvar-table__row">
                        <th className="gonvar-table__th">Numero de orden</th>
                        <th className="gonvar-table__th">Fecha de pago</th>
                        <th className="gonvar-table__th">Producto</th>
                        <th className="gonvar-table__th">Monto</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        userPaymentHistory.map(({ amount, orderNumber, paidAt, product }) => {
                          /*
                          const date = new Date(paidAt);
                          const monthIndex = date.getMonth();
                          const day = date.getDate();
                          const year = date.getFullYear();
                          const formatedDate = `${MONTHS_SPANISH[monthIndex]} ${day}, ${year}`;
                          */
                          return (
                            <tr className="gonvar-table__row" key={orderNumber}>
                              <td className="gonvar-table__data">#{orderNumber}</td>
                              <td className="gonvar-table__data">{getPrettyFormatedDate(paidAt)}</td>
                              <td className="gonvar-table__data">{product}</td>
                              <td className="gonvar-table__data">{amount / 100}</td>
                            </tr>
                          );
                        })
                      }
                    </tbody>
                  </table>
                </div>
                : <div className='empty-container'>
                  <div className='empty-content'>
                    <p className='empty-content-text'>No existen registros de pagos para este usuario</p>
                  </div>
                </div>
            }

          </div>
        }
        {
          (selectedMainMenuOption === 'Courses' && !viewHomeworks) &&
          <div className="content-section">
            {
              userCoursesResume.length > 0 ?
                <div className="table-content">
                  <table className="gonvar-table">
                    <thead className="gonvar-table__thead">
                      <tr className="gonvar-table__row">
                        <th className="gonvar-table__th">Nombre de curso</th>
                        <th className="gonvar-table__th">Último ingreso</th>
                        <th className="gonvar-table__th">Fecha de finalización</th>
                        <th className="gonvar-table__th">Estado</th>
                        <th className="gonvar-table__th">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        // TODO: Encontrar los registros de los cursos realizados
                        userCoursesResume.map(({ courseName, lastSingIn, finishDate, statePercent, courseId }) => {
                          return (
                            <tr className="gonvar-table__row" key={courseId}>
                              <td className="gonvar-table__data">{courseName}</td>
                              <td className="gonvar-table__data">{lastSingIn}</td>
                              <td className="gonvar-table__data">{finishDate}</td>
                              <td className="gonvar-table__data">{statePercent}%</td>
                              <td className="gonvar-table__data">
                                <button
                                  type="button"
                                  className="gonvar-table__button"
                                  onClick={(e) => {
                                    setViewHomeworks(true);
                                    console.log({ courseId });
                                    const newList = userHomeworkHistory.filter((h) => h.courseId === courseId);
                                    setUserFilteredHomeworkHistory(newList);
                                  }}>
                                  Ver tareas
                                </button>
                              </td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>
                </div>
                :
                <div className='empty-container' style={{ order: '2' }}>
                  <div className='empty-content'>
                    <p className='empty-content-text'>No existen registros de cursos para este usuario</p>
                  </div>
                </div>
            }
          </div>
        }

        {
          (selectedMainMenuOption === 'Courses' && viewHomeworks) &&
          <div className="content-section content-section--with-go-back">
            {
              userFilteredHomeworkHistory.length > 0 &&
              <div className="table-content">
                <table className="gonvar-table">
                  <thead className="gonvar-table__thead">
                    <tr className="gonvar-table__row">
                      <th className="gonvar-table__th">Lección</th>
                      <th className="gonvar-table__th">Estado de tarea</th>
                      <th className="gonvar-table__th">Link de tarea</th>
                      <th className="gonvar-table__th">Retro alimentación</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      userFilteredHomeworkHistory.map(({ homeworkId, lessonTitle, homeworkStatus, comment }, index) => {
                        const a = 'gonvar-table__approved-text';
                        const na = 'gonvar-table__not-approved-text';
                        const p = 'gonvar-table__not-checking-text';
                        const textStyle = homeworkStatus === 'Aprobada' ? a : homeworkStatus === 'Reprobada' ? na : p;

                        const newTitle = lessonTitle.replace('Actividad: ', '');
                        return (<tr
                          className="gonvar-table__row"
                          key={homeworkId}
                        >
                          <td className="gonvar-table__data">{newTitle === '' ? lessonTitle : newTitle}</td>
                          <td className="gonvar-table__data">
                            <div className={`${textStyle}`}>
                              {homeworkStatus}
                            </div>
                          </td>
                          <td className="gonvar-table__data">
                            <button type="button" className="gonvar-table__button">
                              Ir a tarea
                            </button>
                          </td>
                          <td className="gonvar-table__data gonvar-table__data--large-text">
                            {comment}
                          </td>
                        </tr>)
                      })
                    }
                  </tbody>
                </table>
              </div>
            }
            <div
              className="go-back"
              onClick={(e) => {
                setViewHomeworks(false);
              }}
            >
              <img
                className="go-back__arrow"
                src="/images/back-arrow.png"
                alt="back-arrow" />
              <p style={{ margin: '0' }}>Regresar</p>
            </div>
            {
              userFilteredHomeworkHistory.length === 0 &&
              <div className='empty-container' style={{ order: '2' }}>
                <div className='empty-content'>
                  <p className='empty-content-text'>No existen tareas registradas para este curso</p>
                </div>
              </div>
            }
          </div>
        }
        {
          (selectedMainMenuOption === 'Rewards') &&
          <div className="content-section">
            <div className="rewards-sections">
              {
                REWARDS_SECTIONS.map(({ id, label }) => {
                  const extraCSSClass = selectedRewardsCenterMenuOption === id ? 'rewards-sections__option--active' : '';
                  return (
                    <div
                      className={`rewards-sections__option ${extraCSSClass}`}
                      id={id}
                      key={id}
                      onClick={(e) => {
                        setSelectedRewardsCenterMenuOption(id)
                      }}
                    >
                      {label}
                    </div>
                  )
                })
              }
            </div>
            {
              (selectedRewardsCenterMenuOption === 'Rewards') &&
              <div className="rewards-details">
                <div className="accumulated-rewards">
                  <p>Recompensas acumuladas</p>
                  <div className="rewards__grid-container">
                    <div className="rewards__grid-item">
                      <div className="reward-card">
                        <p className="reward-card__title">Titulo de recompensa</p>
                        <p className="reward-card__subtitle">Pequeña descripción de la recompensa</p>
                        <div className="reward-card__image-container">
                          <img className="reward-card__image" src="/images/Rewards/reward1.png"
                            alt="Recompensa de usuario iniciante" />
                        </div>
                        <p className="reward-card__bottom-text">Texto inferior de la carta de la recompensa
                        </p>
                      </div>
                    </div>
                    <div className="rewards__grid-item">
                      <div className="reward-card">
                        <p className="reward-card__title">Titulo de recompensa</p>
                        <p className="reward-card__subtitle">Pequeña descripción de la recompensa</p>
                        <div className="reward-card__image-container">
                          <img className="reward-card__image" src="/images/Rewards/reward1.png"
                            alt="Recompensa de usuario iniciante" />
                        </div>
                        <p className="reward-card__bottom-text">Texto inferior de la carta de la recompensa
                        </p>
                      </div>
                    </div>
                    <div className="rewards__grid-item">
                      <div className="reward-card">
                        <p className="reward-card__title">Titulo de recompensa</p>
                        <p className="reward-card__subtitle">Pequeña descripción de la recompensa</p>
                        <div className="reward-card__image-container">
                          <img className="reward-card__image" src="/images/Rewards/reward1.png"
                            alt="Recompensa de usuario iniciante" />
                        </div>
                        <p className="reward-card__bottom-text">Texto inferior de la carta de la recompensa
                        </p>
                      </div>
                    </div>
                    <div className="rewards__grid-item">
                      <div className="reward-card">
                        <p className="reward-card__title">Titulo de recompensa</p>
                        <p className="reward-card__subtitle">Pequeña descripción de la recompensa</p>
                        <div className="reward-card__image-container">
                          <img className="reward-card__image" src="/images/Rewards/reward1.png"
                            alt="Recompensa de usuario iniciante" />
                        </div>
                        <p className="reward-card__bottom-text">Texto inferior de la carta de la recompensa
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="locked-rewards">
                  <p>Recompensas por desbloquear</p>
                  <div className="empty-content-area">
                    No se encuentran recompensas por desbloquear
                  </div>
                </div>
              </div>
            }
            {
              (selectedRewardsCenterMenuOption === 'Benefits') &&
              <div className="rewards-details">
                <div className="accumulated-rewards">
                  <p>Beneficios acumuladas</p>
                  <div className="rewards__grid-container">
                    <div className="rewards__grid-item">
                      <div className="reward-card">
                        <p className="reward-card__title">Titulo de recompensa</p>
                        <p className="reward-card__subtitle">Pequeña descripción de la recompensa</p>
                        <div className="reward-card__image-container">
                          <img className="reward-card__image" src="/images/Rewards/reward1.png"
                            alt="Recompensa de usuario iniciante" />
                        </div>
                        <p className="reward-card__bottom-text">Texto inferior de la carta de la recompensa
                        </p>
                      </div>
                    </div>
                    <div className="rewards__grid-item">
                      <div className="reward-card">
                        <p className="reward-card__title">Titulo de recompensa</p>
                        <p className="reward-card__subtitle">Pequeña descripción de la recompensa</p>
                        <div className="reward-card__image-container">
                          <img className="reward-card__image" src="/images/Rewards/reward1.png"
                            alt="Recompensa de usuario iniciante" />
                        </div>
                        <p className="reward-card__bottom-text">Texto inferior de la carta de la recompensa
                        </p>
                      </div>
                    </div>
                    <div className="rewards__grid-item">
                      <div className="reward-card">
                        <p className="reward-card__title">Titulo de recompensa</p>
                        <p className="reward-card__subtitle">Pequeña descripción de la recompensa</p>
                        <div className="reward-card__image-container">
                          <img className="reward-card__image" src="/images/Rewards/reward1.png"
                            alt="Recompensa de usuario iniciante" />
                        </div>
                        <p className="reward-card__bottom-text">Texto inferior de la carta de la recompensa
                        </p>
                      </div>
                    </div>
                    <div className="rewards__grid-item">
                      <div className="reward-card">
                        <p className="reward-card__title">Titulo de recompensa</p>
                        <p className="reward-card__subtitle">Pequeña descripción de la recompensa</p>
                        <div className="reward-card__image-container">
                          <img className="reward-card__image" src="/images/Rewards/reward1.png"
                            alt="Recompensa de usuario iniciante" />
                        </div>
                        <p className="reward-card__bottom-text">Texto inferior de la carta de la recompensa
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="locked-rewards">
                  <p>Beneficios por desbloquear</p>
                  <div className="empty-content-area">
                    No se encuentran recompensas por desbloquear
                  </div>
                </div>
              </div>
            }
            {
              selectedRewardsCenterMenuOption === 'Certificates' &&
              <div className="rewards-details">
                <div className="accumulated-rewards">
                  <p>Certificados acumuladas</p>
                  <div className="rewards__grid-container">
                    <div className="rewards__grid-item">
                      <div className="certificate-card">
                        <div className="certificate-card__image-container">
                          <img className="certificate-card__image" src="/images/admin/course-banner-01 - copia.png"
                            alt='Banner de curso de curso de uñas de "Diseños navideños"' />
                        </div>
                        <p className="certificate-card__course-title">Diseños navideños</p>
                        <p className="reward-card__instructor-name">Arita gonvar</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="locked-rewards">
                  <p>Certificados por desbloquear</p>
                  <div className="empty-content-area">
                    No se encuentran certificados por desbloquear
                  </div>
                </div>
              </div>
            }
          </div>
        }
      </div>
    </MainContainer>
  )
}

export default UsersDetails;