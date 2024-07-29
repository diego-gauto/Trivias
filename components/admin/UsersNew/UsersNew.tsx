import React, { useEffect, useState } from 'react';
import { MainContainer } from './UsersNew.styled';
import { getGenericQueryResponse } from '../../api/admin';
import { fontWeight } from 'html2canvas/dist/types/css/property-descriptors/font-weight';
import { useRouter } from 'next/router';
import { EmptyContentComponent } from './EmptyContentComponent';
import Link from 'next/link';
import { textAlign } from 'html2canvas/dist/types/css/property-descriptors/text-align';

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
  image: string,
  approved: number,
  homeworkStatus: string,
  comment: string,
  createdAt: string
}

interface IUserCoursesHomeworkHistory {
  courseId: number,
  courseTitle: string,
  lessonId: number,
  title: string
}

type SubscriptionState = 'Activo' | 'Inactiva' | 'Cancelada' | 'En prueba' | 'Sin suscripción';

type PaymentMethod = 'Tarjeta (Conekta)' | 'Paypal' | 'Oxxo (Conekta)' | 'Transferencia (Conekta)' | 'Stripe' | 'Por administración';

type SubscriptionType = 'Mensual' | 'Cuatrimestral' | 'Anual' | 'Ninguno';

interface IUserSubscriptionState {
  state: SubscriptionState,
  type: SubscriptionType,
  method: PaymentMethod,
  startDate: string,
  finalDate: string,
  level: number
}

interface IUserData {
  userId: number,
  method: string,
  startDate: number,
  finalDate: number,
  level: number
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

const TOLERANCE_DAYS_COUNT = 10;
const RECURRING_PAYMENT_LEVELS = [1, 4, 7];
const NO_RECURRING_PAYMENT_LEVELS = [0, 5, 6, 8];

const UsersDetails = () => {
  const router = useRouter();
  const [userId, setUserId] = useState(0);
  const [selectedMainMenuOption, setSelectedMainMenuOption] = useState<MainMenuOptionId>('Payments');

  const [subscription, setSubscription] = useState<IUserSubscriptionState>({} as IUserSubscriptionState);
  const [user, setUser] = useState<IUserData>({} as IUserData);

  const [selectedRewardsCenterMenuOption, setSelectedRewardsCenterMenuOption] = useState<RewardsCenterMenuOptionId>('Rewards');
  const [viewHomeworks, setViewHomeworks] = useState<boolean>(false);

  const [userHomeworksCourseTitle, setUserHomeworksCourseTitle] = useState<string>('');

  const [rewardsMenuOption, setRewardsMenuOption] = useState();
  const [userMainProperties, setUserMainProperties] = useState<IUserMainProperties>({} as IUserMainProperties);
  const [userPaymentHistory, setUserPaymentHistory] = useState<IUserPaymentHistory[]>([]);

  const [userCoursesResume, setUserCoursesResume] = useState<IUserCoursesResume[]>([]);
  const [userHomeworkHistory, setUserHomeworkHistory] = useState<IUserHomeworkHistory[]>([]);
  const [userCoursesHomeworkHistory, setUserCoursesHomeworkHistory] = useState<IUserCoursesHomeworkHistory[]>([]);
  const [userFilteredCoursesHomeworkHistory, setUserFilteredCoursesHomeworkHistory] = useState<IUserCoursesHomeworkHistory[]>([]);
  const [userFilteredHomeworkHistory, setUserFilteredHomeworkHistory] = useState<IUserHomeworkHistory[]>([]);

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
      // Aquí faltan los registros de las tareas que faltan...
      getHomeworksHistoryOfCourses();
      getUserSubscriptionInfo();
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
            	-- WHEN Round(( finish_lessons_count / lessons_count ) * 100) = 100 and finish_course_seconds IS NULL THEN last_seen_time
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
            h.image,
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
      image: string,
      comment: string,
      created_at_seconds: string
    }

    const userHomeworkResumeResponse = await getGenericQueryResponse(query);
    const userHomeworkResume: IUserHomework[] = userHomeworkResumeResponse.data.data;

    const result: IUserHomeworkHistory[] = [];
    userHomeworkResume.forEach(({ homework_id, courses_id, season_id, lesson_id, title, comment, created_at_seconds, homework_status, approved, status, image }) => {
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
        status,
        image
      });
    });

    setUserHomeworkHistory(result);
  }

  const getHomeworksHistoryOfCourses = async () => {
    const query = `select c.id as course_id, c.title as course_title, l.id as lesson_id, lh.id as lesson_h_id, lh.title as homework_title
      from lessons as l
      inner join seasons as s on s.id = l.seasons_id 
      inner join courses as c on c.id = s.course_id
      inner join lesson_homeworks as lh on l.id = lh.lessons_id 
      where l.homework = 1 and c.id in (
        select distinct c.id as course_id 
        from progress as p 
        inner join lessons as l on l.id = p.lessons_id
        inner join seasons as s on s.id = l.seasons_id
        inner join courses as c on c.id = s.course_id
        where p.user_id = ${userId}
      ) order by course_id, s.id, l.number;`;

    interface ILessonWithHomework {
      course_id: number,
      course_title: string,
      lesson_id: number,
      homework_title: string,
    }

    try {
      const userLessonsWithHomeworkResponse = await getGenericQueryResponse(query);
      const userLessonsWithHomeworkResume: ILessonWithHomework[] = userLessonsWithHomeworkResponse.data.data;

      const result: IUserCoursesHomeworkHistory[] = userLessonsWithHomeworkResume.map(({ course_id, course_title, homework_title, lesson_id }) => {
        return {
          courseId: course_id,
          lessonId: lesson_id,
          title: homework_title,
          courseTitle: course_title
        }
      })

      setUserCoursesHomeworkHistory(result);
    } catch (error) {
      console.error(error);
    }
  }

  const getUserSubscriptionInfo = async () => {
    const query = `select level, method, admin_update_id, start_date, final_date, subscription, role
      from users as u 
      inner join memberships as m on u.id = m.user_id
      where u.id = ${userId};`;
    interface IUserSub {
      level: number,
      method: string,
      admin_update_id: number,
      start_date: number,
      final_date: number,
      subscription: number,
      role: string
    }

    const userSubscriptionResponse = await getGenericQueryResponse(query);
    const userSubscriptionValues: IUserSub[] = userSubscriptionResponse.data.data;

    const userSubscription: IUserSub = userSubscriptionValues[0] as any;

    const method = getMethodNameByDBValue(userSubscription.method);

    const startDate = getPrettyFormatedDate(userSubscription.start_date);
    const finalDate = getPrettyFormatedDate(userSubscription.final_date);

    const { level, final_date } = userSubscription;

    const state = getStateOfSubscription(level, final_date);

    const type = getSubscriptionTypeByLevel(userSubscription.level);

    setUser({
      finalDate: userSubscription.final_date,
      level: userSubscription.level,
      method: userSubscription.method,
      startDate: userSubscription.start_date,
      userId
    });

    setSubscription({
      method,
      startDate,
      finalDate,
      type,
      state,
      level: userSubscription.level
    });
  }

  const getMethodNameByDBValue = (value: string): PaymentMethod => {
    /*
    admin
    conekta
    stripe

    paypal
    oxxo
    0
    spei
    conketa
    */
    if (value === 'Conekta') {
      return 'Tarjeta (Conekta)';
    }
    if (value === 'paypal') {
      return 'Paypal';
    }
    if (value === 'oxxo') {
      return 'Oxxo (Conekta)';
    }
    if (value === 'spei') {
      return 'Transferencia (Conekta)';
    }
    if (value === 'stripe') {
      return 'Stripe'
    }
    if (value === 'admin') {
      return 'Por administración';
    }
    return 'Por administración';
  }

  const getStateOfSubscription = (userLevel: number, finalDate: number): SubscriptionState => {
    const now = Math.floor((new Date()).getTime() / 1000);
    const isActiveResult = isActive(userLevel, finalDate);

    if (userLevel === 0 && finalDate > now) {
      return 'En prueba';
    }

    if ((userLevel === 10) || (userLevel === 0 && finalDate < now)) {
      // TODO: Hacer un mensaje personalizado para usuarios lvl 10, con el mensaje
      // "Comunicarse con soporte"
      return 'Sin suscripción';
    }

    if (isActiveResult) {
      return 'Activo';
    }
    // TODO: Hacer aviso unico para usuarios superAdmin

    // TODO: Revisar el caso de los usaurios "cancelados"

    return 'Inactiva';
  }

  const getSubscriptionTypeByLevel = (level: number): SubscriptionType => {
    if ([1, 6].includes(level)) {
      return 'Mensual';
    }
    if ([7, 8].includes(level)) {
      return 'Cuatrimestral';
    }
    if ([4, 5].includes(level)) {
      return 'Anual';
    }

    return 'Ninguno';
  }

  const isActive = (
    userLevel: number,
    finalDate: number,
  ) => {
    const today = new Date().getTime();
    const finalDate2 = new Date(finalDate * 1000);
    if (
      // NO_RECURRING_PAYMENT_LEVELS.includes(userLevel) &&
      [1, 4, 5, 6, 7, 8].includes(userLevel) &&
      finalDate2.getTime() > today
    ) {
      return true;
    }

    return false;
  };

  const isOnRetryPaymentTime = (userLevel: number, finalDate: number, method: string) => {
    const today = new Date().getTime() / 1000;
    const tolerance = TOLERANCE_DAYS_COUNT * 24 * 60 * 60;

    if (finalDate > today) {
      return false;
    }

    if (
      RECURRING_PAYMENT_LEVELS.includes(userLevel) &&
      (method === 'conekta' /*|| method === 'paypal'*/) &&
      finalDate > (today - tolerance)
    ) {
      return true;
    }

    return false;
  }

  const getCoursesHomeworksArray = () => {
    // userFilteredHomeworkHistory
    // userFilteredCoursesHomeworkHistory

    const result: IUserHomeworkHistory[] = userFilteredCoursesHomeworkHistory.map(({ courseId, lessonId, title }) => {
      const uh = userFilteredHomeworkHistory.filter((uh) => uh.lessonId === lessonId);
      if (uh.length > 0) {
        if (uh[0] !== undefined) {
          return uh[0];
        }
      }

      const result: IUserHomeworkHistory = {
        homeworkId: 0,
        courseId,
        seasonId: 0,
        lessonId,
        lessonTitle: title,
        status: 0,
        approved: 0,
        homeworkStatus: 'No entregada',
        comment: '',
        createdAt: '',
        image: ''
      }

      return result;
    });
    return result;
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
        <img
          className="go-back__arrow"
          src="/images/back-arrow.png"
          alt="back-arrow"
        />
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
              <div className="user-property-header user-property-header--small-text">Fecha de creación</div>
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
                      <p className='subscription-item__content-text'>{subscription.state}</p>
                    </div>
                  </div>
                  {
                    subscription.state !== 'Sin suscripción' &&
                    <div className='subscription-item'>
                      <div className='subscription-item__header'>
                        <p className='subscription-item__title'>
                          Su plan{' '}
                          {
                            subscription.state === 'Activo' && 'es'
                          }
                          {
                            subscription.state === 'Inactiva' && 'era'
                          }
                        </p>
                      </div>
                      <div className='subscription-item__content'>
                        <p className='subscription-item__content-text'>{subscription.type}</p>
                      </div>
                    </div>
                  }
                  {
                    (subscription.state === 'Activo' || subscription.state === 'Inactiva') &&
                    <>
                      <div className='subscription-item'>
                        <div className='subscription-item__header'>
                          <p className='subscription-item__title'>Método de pago</p>
                        </div>
                        <div className='subscription-item__content'>
                          <p className='subscription-item__content-text'>{subscription.method}</p>
                        </div>
                      </div>
                      <div className='subscription-item'>
                        <div className='subscription-item__header'>
                          <p className='subscription-item__title'>Fechas</p>
                        </div>
                        <div className='subscription-item__content'>
                          <p className='subscription-item__content-text'>
                            Activa desde:
                            <span className='subscription-item__content-text--normal-weight'>
                              {' '}{subscription.startDate}
                            </span>
                          </p>
                          <p className='subscription-item__content-text'>
                            {
                              subscription.state === 'Activo' &&
                              'Termina el:'
                            }
                            {
                              subscription.state === 'Inactiva' &&
                              'Terminó el:'
                            }
                            <span className='subscription-item__content-text--normal-weight'>
                              {' '}{subscription.finalDate}
                            </span>
                          </p>
                        </div>
                      </div>
                    </>
                  }
                </div>
                {
                  isOnRetryPaymentTime(user.level, user.finalDate, user.method) &&
                  <EmptyContentComponent
                    message='Usuario en proceso de reintento de pago'
                  />
                }
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
                          return (
                            <tr className="gonvar-table__row" key={orderNumber}>
                              <td className="gonvar-table__data">{orderNumber}</td>
                              <td className="gonvar-table__data">{getPrettyFormatedDate(paidAt)}</td>
                              <td className="gonvar-table__data">{product}</td>
                              <td className="gonvar-table__data">
                                {
                                  Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(amount / 100)
                                }
                              </td>
                            </tr>
                          );
                        })
                      }
                    </tbody>
                  </table>
                </div>
                :
                <EmptyContentComponent
                  message='No existen registros de pagos para este usuario'
                />
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
                        <th className="gonvar-table__th">Nombre del curso</th>
                        <th className="gonvar-table__th">Último ingreso</th>
                        <th className="gonvar-table__th">Fecha de finalización</th>
                        <th className="gonvar-table__th">Estado</th>
                        <th className="gonvar-table__th">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
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
                                    const filteredHomeworksOfUser = userHomeworkHistory.filter((h) => h.courseId === courseId);
                                    const filteredCoursesHomeworks = userCoursesHomeworkHistory.filter((ch) => ch.courseId === courseId);
                                    setUserFilteredCoursesHomeworkHistory(filteredCoursesHomeworks);
                                    setUserFilteredHomeworkHistory(filteredHomeworksOfUser);
                                    setUserHomeworksCourseTitle(courseName);
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
                <EmptyContentComponent
                  message='No existen registros de cursos para este usuario'
                  styles={{
                    order: '2'
                  }}
                />
            }
          </div>
        }
        {
          (selectedMainMenuOption === 'Courses' && viewHomeworks) &&
          <div className='course-homeworks-section'>
            <div className='course-homeworks-section__title-container'>
              <h3 className='course-homeworks-section__title'>
                <strong>{userHomeworksCourseTitle}</strong>
              </h3>
            </div>
            <div className="content-section">
              <div style={{
                width: '100%'
              }}>
                <div
                  className='go-back'
                  onClick={(e) => {
                    setViewHomeworks(false);
                  }}
                  style={{
                    width: '135px'
                  }}
                >
                  <img
                    className="go-back__arrow"
                    src="/images/back-arrow.png"
                    alt="back-arrow" />
                  <p style={{ margin: '0' }}>Regresar</p>
                </div>
              </div>
              {
                getCoursesHomeworksArray().length > 0 &&
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
                        getCoursesHomeworksArray().map(({ homeworkId, lessonTitle, homeworkStatus, comment, status, image }, index) => {
                          const a = 'gonvar-table__approved-text';
                          const na = 'gonvar-table__not-approved-text';
                          const p = 'gonvar-table__not-checking-text';
                          const ns = 'gonvar-table__not-sended-text';

                          let textStyle: string = '';
                          //  homeworkStatus === 'Aprobada' ? a : homeworkStatus === 'Reprobada' ? na : p;
                          if (homeworkStatus === 'Aprobada' && status === 1) {
                            textStyle = a;
                          } else if (homeworkStatus === 'Reprobada' && status === 1) {
                            textStyle = na;
                          } else if (homeworkStatus === 'No entregada') {
                            textStyle = ns;
                          } else {
                            textStyle = p;
                          }

                          const newTitle = lessonTitle.replace('Actividad: ', '');

                          return (<tr
                            className="gonvar-table__row"
                            key={`${index}-${homeworkId}`}
                          >
                            <td className="gonvar-table__data">{newTitle === '' ? lessonTitle : newTitle}</td>
                            <td className="gonvar-table__data">
                              <div className={`${textStyle}`}>
                                {
                                  ['Pendiente', 'Aprobada', 'Reprobada'].includes(homeworkStatus) ? homeworkStatus : 'No entregada'
                                }
                              </div>
                            </td>
                            <td className="gonvar-table__data">
                              {
                                homeworkStatus !== 'No entregada' &&
                                <Link href={image}>
                                  <a
                                    className="gonvar-table__button"
                                    target='_blank'
                                    style={{ textDecoration: 'none' }}
                                  >
                                    Ir a tarea
                                  </a>
                                </Link>
                              }
                              {
                                homeworkStatus === 'No entregada' &&
                                <div style={{
                                  height: '100%',
                                  width: '100%',
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center'
                                }}>
                                  <p style={{
                                    margin: '0'
                                  }}>Sin tarea</p>
                                </div>

                              }
                            </td>
                            <td className="gonvar-table__data gonvar-table__data--large-text">
                              {
                                comment
                              }
                            </td>
                          </tr>)
                        })
                      }
                    </tbody>
                  </table>
                </div>
              }
              {
                getCoursesHomeworksArray().length === 0 &&
                <EmptyContentComponent
                  message='No existen tareas registradas para este curso'
                  styles={{ order: '2' }}
                />
              }
            </div>
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