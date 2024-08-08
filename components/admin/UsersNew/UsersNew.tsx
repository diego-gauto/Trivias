import React, { useEffect, useState } from 'react';
import { MainContainer } from './UsersNew.styled';
import { getGenericQueryResponse } from '../../api/admin';
import { useRouter } from 'next/router';
import { EmptyContentComponent } from './EmptyContentComponent';
import Link from 'next/link';
import { Modal } from './GenericModal';
import { SuccessModal } from './SuccessModal';
import { ActivateSubscriptionModal } from './ActivateSubscription';
import { UpdateFinalDateModal } from './UpdateFinalDateModal';
import { RemoveSubscriptionModal } from './RemoveSubscriptionModal';

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
  method: string
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

interface ICourseQuizz {
  courseId: number,
  courseTitle: string,
  lessonId: number,
  quizzId: number,
  quizzTitle: string,
  passingGrade: number,
  points: number
}

interface IUserQuizz {
  courseId: number,
  courseTitle: string,
  lessonId: number,
  quizzId: number,
  quizzTitle: string,
  grade: number,
  passingGrade: number,
  points: number,
  isPending: boolean,
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
const NO_RECURRING_PAYMENT_LEVELS = [5, 6, 8];

const SUCCESS_MESSAGES = {
  SUBSCRIPTION_ACTIVATION: 'La activación de suscripción se ha realizado correctamente',
  REMOVE_SUBSCRIPTION: 'Se ha eliminado la suscripción elegida correctamente',
  UPDATE_SUBSCRIPTION_FINAL_DATE: 'Se han modificado los dias seleccionados correctamente'
}

const UsersDetails = () => {
  const router = useRouter();
  const [userId, setUserId] = useState(0);
  const [selectedMainMenuOption, setSelectedMainMenuOption] = useState<MainMenuOptionId>('Payments');

  const [subscription, setSubscription] = useState<IUserSubscriptionState>({} as IUserSubscriptionState);
  const [user, setUser] = useState<IUserData>({} as IUserData);

  const [selectedRewardsCenterMenuOption, setSelectedRewardsCenterMenuOption] = useState<RewardsCenterMenuOptionId>('Rewards');
  const [viewHomeworks, setViewHomeworks] = useState<boolean>(false);
  const [viewQuizzes, setViewQuizzes] = useState<boolean>(false);

  const [userCourseTitle, setUserCourseTitle] = useState<string>('');

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

  const [showChangeFinalDateModal, setShowChangeFinalDateModal] = useState<boolean>(false);
  const [showSuccesssModal, setShowSuccesssModal] = useState<boolean>(false);
  const [showRemoveSubscriptionModal, setShowRemoveSubscriptionModal] = useState<boolean>(false);
  const [showActivateSubscriptionModal, setShowActivateSubscriptionModal] = useState<boolean>(false);

  const [messageOfSuccessModal, setMessageOfSuccessModal] = useState<string>('');
  const [courseQuizzes, setCourseQuizzes] = useState<ICourseQuizz[]>([]);
  const [filteredCourseQuizzes, setFilteredCourseQuizzes] = useState<ICourseQuizz[]>([]);
  const [userQuizzes, setUserQuizzes] = useState<IUserQuizz[]>([]);
  const [filteredUserQuizzes, setFilteredUserQuizzes] = useState<IUserQuizz[]>([]);

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
      getQuizzesHistoryOfCourses();
      getQuizzesHistoryOfUser();

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
    const query = `select id as order_number, amount, paid_at, product, method 
    from invoices 
    where user_id = ${userId};`;

    interface IUserPaymentHistoryResponse {
      order_number: number;
      amount: number;
      paid_at: string;
      product: string;
      method: string;
    }

    const response = await getGenericQueryResponse(query);
    const userPaymentHistory: IUserPaymentHistoryResponse[] = response.data.data;

    const result: IUserPaymentHistory[] = [];
    userPaymentHistory.forEach(({ amount, order_number, paid_at, product, method }) => {
      result.push({
        amount,
        orderNumber: order_number,
        paidAt: paid_at,
        product,
        method
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

  const getQuizzesHistoryOfCourses = async () => {
    const query = `select c.id as course_id, c.title as course_title, l.id as lesson_id, q.id as quizz_id, q.title as quizz_title, passing_grade, q.points
      from lessons as l
      inner join seasons as s on s.id = l.seasons_id 
      inner join courses as c on c.id = s.course_id
      inner join quizzes as q on l.id = q.lessons_id
      where l.quiz = 1
      order by course_id, s.id, l.number;`;

    interface ICourseQuizzSQL {
      course_id: number,
      course_title: string,
      lesson_id: number,
      quizz_id: number,
      quizz_title: string,
      passing_grade: number,
      points: number
    }

    try {
      const coursesQuizzesResponse = await getGenericQueryResponse(query);
      const coursesQuizzesResume: ICourseQuizzSQL[] = coursesQuizzesResponse.data.data;

      const result: ICourseQuizz[] = coursesQuizzesResume.map(({ course_id, course_title, lesson_id, passing_grade, quizz_id, quizz_title, points }) => {
        return {
          courseId: course_id,
          lessonId: lesson_id,
          passingGrade: passing_grade,
          courseTitle: course_title,
          quizzId: quizz_id,
          quizzTitle: quizz_title,
          points
        }
      })

      setCourseQuizzes(result);
    } catch (error) {
      console.error(error);
    }
  }

  const getQuizzesHistoryOfUser = async () => {
    const query = `select c.id as course_id, c.title as course_title, l.id as lesson_id, q.id as quizz_id, q.title as quizz_title, grade, passing_grade, q.points 
      from lessons as l
      inner join seasons as s on s.id = l.seasons_id 
      inner join courses as c on c.id = s.course_id
      inner join quizzes as q on l.id = q.lessons_id
      inner join user_quizzes as uq on uq.lesson_id = l.id
      where l.quiz = 1 and uq.user_id = ${userId}
      order by course_id, s.id, l.number;`;

    interface IUserQuizzSQL {
      course_id: number,
      course_title: string,
      lesson_id: number,
      quizz_id: number,
      quizz_title: string,
      grade: number,
      points: number,
      passing_grade: number,
    }

    try {
      const userQuizzesResponse = await getGenericQueryResponse(query);
      const userQuizzesResume: IUserQuizzSQL[] = userQuizzesResponse.data.data;

      const result: IUserQuizz[] = userQuizzesResume.map(({ course_id, course_title, lesson_id, passing_grade, quizz_id, quizz_title, grade, points }) => {
        return {
          courseId: course_id,
          lessonId: lesson_id,
          passingGrade: passing_grade,
          courseTitle: course_title,
          quizzId: quizz_id,
          quizzTitle: quizz_title,
          grade,
          points,
          isPending: false
        }
      });

      setUserQuizzes(result);
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
    if (value === 'conekta') {
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

  const getCoursesQuizzesArray = () => {
    const result: IUserQuizz[] = filteredCourseQuizzes.map(({ courseId, courseTitle, lessonId, passingGrade, quizzId, quizzTitle, points }) => {
      const uq = filteredUserQuizzes.filter((uq) => uq.lessonId === lessonId);

      if (uq.length > 0) {
        if (uq[0] !== undefined) {
          return uq[0];
        }
      }

      return ({
        courseId,
        courseTitle,
        grade: 0,
        lessonId,
        passingGrade,
        quizzId,
        quizzTitle,
        points,
        isPending: true
      });
    });

    return result;
  }


  type SubscriptionModalOption = 'edit-final-date' | 'remove-subscription' | 'active-subscription' | 'confirm' | 'success';

  const generateModalContent = (option: SubscriptionModalOption): JSX.Element => {
    switch (option) {
      case 'edit-final-date':
        return (
          <UpdateFinalDateModal
            finalDate={user.finalDate}
            startDate={user.startDate}
            userId={user.userId}
            onCancelEvent={() => {
              setShowChangeFinalDateModal(false);
            }}
            onSuccessEvent={() => {
              setMessageOfSuccessModal(SUCCESS_MESSAGES.UPDATE_SUBSCRIPTION_FINAL_DATE)
              setShowChangeFinalDateModal(false);
              setShowSuccesssModal(true);
            }}
          />
        );
      case 'remove-subscription':
        return (
          <RemoveSubscriptionModal
            clientFinalDate={user.finalDate}
            clientStartDate={user.startDate}
            clientUserLevel={user.level}
            clientUserId={user.userId}
            onCancelEvent={() => {
              setShowRemoveSubscriptionModal(false);
            }}
            onSuccessEvent={() => {
              setMessageOfSuccessModal(SUCCESS_MESSAGES.REMOVE_SUBSCRIPTION);
              setShowRemoveSubscriptionModal(false);
              setShowSuccesssModal(true);
            }}
          />)
      case 'active-subscription':
        return (
          <ActivateSubscriptionModal
            clientStartDate={user.startDate}
            clientUserId={userId}
            clientFinalDate={user.finalDate}
            clientCurrentLevel={user.level}
            onCancelEvent={() => {
              setShowActivateSubscriptionModal(false);
            }}
            onSuccessEvent={() => {
              setMessageOfSuccessModal(SUCCESS_MESSAGES.SUBSCRIPTION_ACTIVATION)
              setShowActivateSubscriptionModal(false);
              setShowSuccesssModal(true);
            }}
          />
        )
      case 'confirm':
        return (<p></p>)
      case 'success':
        return (
          <SuccessModal
            successMessage={messageOfSuccessModal}
            acceptEvent={() => {
              setShowSuccesssModal(false)
              window.location.reload();
            }}
          />
        )
    }
  }

  const generateActionButtons = (): JSX.Element => {

    const updateSubscription: JSX.Element = (
      <div
        className='subscription-actions-item'
        onClick={(e) => {
          setShowActivateSubscriptionModal(true);
        }}
        key={`subscription-actions-update`}
      >
        <p className='subscription-actions-item__text'>
          Activar suscripción
        </p>
      </div>
    );

    const removeSubscription: JSX.Element = (
      <div
        className='subscription-actions-item'
        onClick={(e) => {
          setShowRemoveSubscriptionModal(true);
        }}
        key={`subscription-actions-remove`}
      >
        <p className='subscription-actions-item__text'>
          Eliminar suscripción
        </p>
      </div>
    );

    const updateFinalDate: JSX.Element = (<div
      className='subscription-actions-item'
      onClick={(e) => {
        setShowChangeFinalDateModal(true);
      }}
      key={`subscription-actions-update-final-date`}
    >
      <p className='subscription-actions-item__text'>
        Editar dias de suscripción
      </p>
    </div>);

    const buttons: JSX.Element[] = [];

    /*
    Activa -> Pago recurrente 1, 4, 7 (Botones no aparecen)
    Activa -> Pago no recurrente 5, 6, 8 (Botones cancelar y editar días)
    Inactiva -> Pago recurrente (Periodo de reintento, no mostrar botones)
    Inactiva -> Pago recurrente (Ya paso periodo de reintento, editar días o activar plan)
    Inactiva -> Pago no recurrente 5, 6 , 8 (Botones activar plan, editar días)
    Nivel 0 -> Activar plan o editar dias
    */

    const RECURRING_PAYMENT_LEVELS = [1, 4, 7];
    const NO_RECURRING_PAYMENT_LEVELS = [5, 6, 8];

    const now = Math.floor((new Date()).getTime() / 1000);
    const tenDaysInSeconds = 10 * 24 * 60 * 60;


    const isRetryPeriod = user.finalDate > (now - tenDaysInSeconds) && user.finalDate < now;

    const isActive = user.finalDate > now;

    if (RECURRING_PAYMENT_LEVELS.includes(user.level) && isActive) {
      // No aparecen botones
    } else if (NO_RECURRING_PAYMENT_LEVELS.includes(user.level) && isActive) {
      buttons.push(removeSubscription);
      buttons.push(updateFinalDate);
    } else if (RECURRING_PAYMENT_LEVELS.includes(user.level) && isRetryPeriod) {
      // No aparecen botones
    } else if (RECURRING_PAYMENT_LEVELS.includes(user.level) && user.finalDate < (now - tenDaysInSeconds)) {
      buttons.push(updateSubscription);
      buttons.push(updateFinalDate);
    } else if (NO_RECURRING_PAYMENT_LEVELS.includes(user.level) && !isActive) {
      buttons.push(updateSubscription);
      buttons.push(updateFinalDate);
    } else if (user.level === 0) {
      buttons.push(updateSubscription);
      buttons.push(updateFinalDate);
    }

    return (
      <>
        {
          buttons.length > 0 &&
          <div className='subscription-actions-container'>
            {
              buttons
            }
          </div>
        }
      </>
    );
  }

  const haveSomeHomework = (courseId: number): boolean => {
    return userCoursesHomeworkHistory.some((uh) => uh.courseId === courseId);
  }

  const haveSomeQuizz = (courseId: number): boolean => {
    return courseQuizzes.some((cq) => cq.courseId === courseId);
  }

  return (
    <MainContainer>
      <div
        className="top-header"
        onClick={() => {
          // localStorage.removeItem('selected-user-id');
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
                  key={`main_section_${id}`}
                  className={`section-title ${extraCSSClass}`}
                  onClick={(e) => {
                    if (id !== 'Rewards') {
                      setSelectedMainMenuOption(id)
                    }
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
          <div className="content-section" key={`content-section_subscription`}>
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
                    (subscription.state === 'Activo' || subscription.state === 'Inactiva' || subscription.state === 'En prueba') &&
                    <>
                      <div className='subscription-item'>
                        <div className='subscription-item__header'>
                          <p className='subscription-item__title'>Método de pago</p>
                        </div>
                        <div className='subscription-item__content'>
                          <p className='subscription-item__content-text'>{subscription.method}</p>
                        </div>
                      </div>
                      {
                        (user.startDate !== 0 || user.finalDate !== 0) &&
                        <div className='subscription-item'>
                          <div className='subscription-item__header'>
                            <p className='subscription-item__title'>Fechas</p>
                          </div>
                          <div className='subscription-item__content'>
                            {
                              user.startDate !== 0 &&
                              <p className='subscription-item__content-text'>
                                Activa desde:
                                <span className='subscription-item__content-text--normal-weight'>
                                  {' '}{subscription.startDate}
                                </span>
                              </p>
                            }
                            {
                              user.finalDate !== 0 &&
                              <p className='subscription-item__content-text'>
                                {
                                  (subscription.state === 'Activo' ||
                                    subscription.state === 'En prueba')
                                  &&
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
                            }
                          </div>
                        </div>
                      }
                    </>
                  }
                </div>
                {
                  isOnRetryPaymentTime(user.level, user.finalDate, user.method) &&
                  <EmptyContentComponent
                    message='Usuario en proceso de reintento de pago'
                  />
                }
                {
                  generateActionButtons()
                }
              </div>
            }
          </div>
        }
        {
          selectedMainMenuOption === 'Payments' &&
          <div className="content-section" key={`content-section_payments`}>
            {
              userPaymentHistory.length > 0 ?
                <div className="table-content" key={`user_payment_history`}>
                  <table className="gonvar-table">
                    <thead className="gonvar-table__thead">
                      <tr className="gonvar-table__row">
                        <th className="gonvar-table__th">Numero de orden</th>
                        <th className="gonvar-table__th">Fecha de pago</th>
                        <th className="gonvar-table__th">Producto</th>
                        <th className="gonvar-table__th">Método de pago</th>
                        <th className="gonvar-table__th">Monto</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        userPaymentHistory.map(({ amount, orderNumber, paidAt, product, method }) => {
                          return (
                            <tr className="gonvar-table__row" key={`user_payment_record_${orderNumber}`}>
                              <td className="gonvar-table__data">{orderNumber}</td>
                              <td className="gonvar-table__data">{getPrettyFormatedDate(paidAt)}</td>
                              <td className="gonvar-table__data">{product}</td>
                              <td className="gonvar-table__data">{getMethodNameByDBValue(method)}</td>
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
          (selectedMainMenuOption === 'Courses' && !viewHomeworks && !viewQuizzes) &&
          <div className="content-section" key={`content-section_courses_main`}>
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
                            <tr className="gonvar-table__row" key={`course_resume_row_${courseId}`}>
                              <td className="gonvar-table__data">{courseName}</td>
                              <td className="gonvar-table__data">{lastSingIn}</td>
                              <td className="gonvar-table__data">{finishDate}</td>
                              <td className="gonvar-table__data">{statePercent}%</td>
                              <td className="gonvar-table__data">
                                <div
                                  style={{
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr',
                                    gap: '5px'
                                  }}
                                >
                                  {
                                    haveSomeHomework(courseId) &&
                                    <button
                                      type="button"
                                      className="gonvar-table__button"
                                      onClick={(e) => {
                                        setViewHomeworks(true);
                                        const filteredHomeworksOfUser = userHomeworkHistory.filter((h) => h.courseId === courseId);
                                        const filteredCoursesHomeworks = userCoursesHomeworkHistory.filter((ch) => ch.courseId === courseId);
                                        setUserFilteredCoursesHomeworkHistory(filteredCoursesHomeworks);
                                        setUserFilteredHomeworkHistory(filteredHomeworksOfUser);
                                        setUserCourseTitle(courseName);
                                      }}>
                                      Ver tareas
                                    </button>
                                  }
                                  {
                                    haveSomeQuizz(courseId) &&
                                    <button
                                      type="button"
                                      className="gonvar-table__button"
                                      onClick={(e) => {
                                        setViewQuizzes(true);
                                        const filteredQuizzesOfUser = userQuizzes.filter((uq) => uq.courseId === courseId);
                                        const filteredQuizzesOfCourse = courseQuizzes.filter((cq) => cq.courseId === courseId);
                                        setFilteredCourseQuizzes(filteredQuizzesOfCourse);
                                        setFilteredUserQuizzes(filteredQuizzesOfUser);
                                        setUserCourseTitle(courseName);
                                      }}>
                                      Ver Quizzes
                                    </button>
                                  }

                                </div>
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
          <div className='course-homeworks-section' key={`content-section_courses_homeworks`}>
            <div className='course-homeworks-section__title-container'>
              <h3 className='course-homeworks-section__title'>
                <strong>{userCourseTitle}</strong>
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
                            key={`homework_row_${index}-${homeworkId}`}
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
          (selectedMainMenuOption === 'Courses' && !viewHomeworks && viewQuizzes) &&
          <div className='course-homeworks-section' key={`content-section_courses_homeworks`}>
            <div className='course-homeworks-section__title-container'>
              <h3 className='course-homeworks-section__title'>
                <strong>{userCourseTitle}</strong>
              </h3>
            </div>
            <div className="content-section">
              <div style={{
                width: '100%'
              }}>
                <div
                  className='go-back'
                  onClick={(e) => {
                    setViewQuizzes(false);
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
                getCoursesQuizzesArray().length > 0 &&
                <div className="table-content">
                  <table className="gonvar-table">
                    <thead className="gonvar-table__thead">
                      <tr className="gonvar-table__row">
                        <th className="gonvar-table__th">Quizz</th>
                        <th className="gonvar-table__th">Estado</th>
                        <th className="gonvar-table__th">Puntos</th>
                        <th className="gonvar-table__th">Porcentaje de aprobación</th>
                        <th className="gonvar-table__th">Porcentaje obtenido</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        getCoursesQuizzesArray().map(({ courseId, courseTitle, grade, lessonId, passingGrade, quizzId, quizzTitle, isPending, points }, index) => {
                          const approve = 'gonvar-table__approved-text';
                          const notApprove = 'gonvar-table__not-approved-text';
                          const pending = 'gonvar-table__not-sended-text';

                          let textStyle: string = '';
                          const isApprove = Math.round((grade / points) * 100) >= passingGrade;
                          const quizzStatus = isPending ? 'No realizado' : (isApprove ? 'Aprobado' : 'No aprobado');

                          if (isPending) {
                            textStyle = pending;
                          } else if (isApprove) {
                            textStyle = approve;
                          } else {
                            textStyle = notApprove;
                          }

                          return (<tr
                            className="gonvar-table__row"
                            key={`homework_row_${index}-${courseId}-${lessonId}`}
                          >
                            <td className="gonvar-table__data">{quizzTitle}</td>
                            <td className="gonvar-table__data">
                              <div className={`${textStyle}`}>
                                {
                                  quizzStatus
                                }
                              </div>
                            </td>
                            {
                              <td className="gonvar-table__data">
                                {
                                  points
                                }
                              </td>
                            }
                            <td className="gonvar-table__data">
                              {
                                // Math.round((points / 100) * passingGrade)
                                passingGrade
                              }
                              {'%'}
                            </td>
                            <td className="gonvar-table__data">
                              {
                                grade !== 0 ?
                                  `${Math.round((grade / points) * 100)} %`
                                  : ''
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
                getCoursesQuizzesArray().length === 0 &&
                <EmptyContentComponent
                  message='No existen quizzes registrados para este curso'
                  styles={{ order: '2' }}
                />
              }
            </div>
          </div>
        }
        {
          (selectedMainMenuOption === 'Rewards') &&
          <div className="content-section" key={`content-section_courses_rewards`}>
            <div className="rewards-sections">
              {
                REWARDS_SECTIONS.map(({ id, label }) => {
                  const extraCSSClass = selectedRewardsCenterMenuOption === id ? 'rewards-sections__option--active' : '';
                  return (
                    <div
                      className={`rewards-sections__option ${extraCSSClass}`}
                      id={id}
                      key={`reward_section_${id}`}
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
      {
        showChangeFinalDateModal &&
        <Modal
          show={showChangeFinalDateModal}
          onClose={() => {
            setShowChangeFinalDateModal(false)
          }}
          child={generateModalContent('edit-final-date')}
        />
      }
      {
        showSuccesssModal &&
        <Modal
          show={showSuccesssModal}
          onClose={() => {
            setShowSuccesssModal(false)
          }}
          child={generateModalContent('success')}
        />
      }
      {
        showRemoveSubscriptionModal &&
        <Modal
          show={showRemoveSubscriptionModal}
          onClose={() => {
            setShowRemoveSubscriptionModal(false)
          }}
          child={generateModalContent('remove-subscription')}
        />
      }
      {
        showActivateSubscriptionModal &&
        <Modal
          show={showActivateSubscriptionModal}
          onClose={() => {
            setShowActivateSubscriptionModal(false)
          }}
          child={generateModalContent('active-subscription')}
        />
      }
    </MainContainer>
  )
}

export default UsersDetails;