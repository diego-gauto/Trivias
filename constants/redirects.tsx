import {
  CERTIFICATES_PATH,
  LESSON_PATH,
  LOGIN_PATH,
  PLAN_PATH,
  PREVIEW_PATH,
  PROFILE_PATH,
  PURCHASE_PATH,
  RETRY_PAYMENT_PATH,
  REWARDS_PATH,
} from './paths';
import { IUser } from '../interfaces/IUserData';
import { ICourse } from '../interfaces/ICourse';
import router from 'next/router';
import {
  haveAccess,
  MembershipMethodValue,
} from '../components/GlobalFunctions';
let today = new Date().getTime() / 1000;

export interface IUserInfo {
  id: number
  name: string
  last_name: string
  email: string
  password: string
  phone_number: string
  role: string
  photo: string
  score: number
  stripe_id: string
  provider: string
  created_at: string
  past_user: string
  subscription: number
  last_sign_in: string
  country: string
  conekta_id: string
  terms: number
  come_from: string
  origin_state: any
  offer_reference: string
  user_id: number
  final_date: number
  level: number
  method: any
  payment_method: any
  plan_id: any
  plan_name: any
  start_date: number
  type: any
  admin_update_id: any
}

const purchaseValues = ['mensual',
  'mensual_v1_1',
  'mensual_v1_2',
  'mensual_v1_3',
  'anual',
  'anual_v1_1',
  'anual_v1_2',
  'cuatrimestre',
  'cuatrimestre_v1_1'];

const haveAnyPurchaseValue = () => {
  for (const pv of purchaseValues) {
    if (localStorage.getItem(pv) !== null) {
      return true;
    }
  }
  return false;
}

export const authRedirect = (type: string, userInfo?: any/* IUserInfo */) => {
  let today = Math.floor(new Date().getTime() / 1000);
  let tolerance = 10 * 24 * 60 * 60;

  if (type === 'login') {
    if (haveAnyPurchaseValue()) {
      if (haveAccess(userInfo.level, userInfo.final_date, userInfo.role as any, userInfo.method)) {
        window.location.href = PREVIEW_PATH;
      }
    }
    if (
      localStorage.getItem('trial') === 'true' &&
      userInfo.final_date < today &&
      userInfo.role !== 'superAdmin'
    ) {
      localStorage.removeItem('trial');
      window.location.href = `${window.location.origin}${PURCHASE_PATH}?type=subscription&trial=true&v=3`;
    } else if (localStorage.getItem('course')) {
      const course = localStorage.getItem('course');
      localStorage.removeItem('course');
      window.location.href = `${window.location.origin}${PURCHASE_PATH}?type=course&id=${course || ''}`;
    } else if (localStorage.getItem('product')) {
      const product = localStorage.getItem('product');
      localStorage.removeItem('product');
      window.location.href = `${window.location.origin}${PURCHASE_PATH}?type=course&id=${product || ''}`;
    } else if (localStorage.getItem('mensual') === 'true') {
      localStorage.removeItem('mensual')
      window.location.href = `${window.location.origin}${PURCHASE_PATH}?type=subscription&frequency=month&v=1`;
    } else if (localStorage.getItem('mensual_v1_1') === 'true') {
      localStorage.removeItem('mensual_v1_1')
      window.location.href = `${window.location.origin}${PURCHASE_PATH}?type=subscription&frequency=month&v=2`;
    } else if (localStorage.getItem('mensual_v1_2') === 'true') {
      localStorage.removeItem('mensual_v1_2')
      window.location.href = `${window.location.origin}${PURCHASE_PATH}?type=subscription&frequency=month&v=3`;
    } else if (localStorage.getItem('mensual_v1_3') === 'true') {
      localStorage.removeItem('mensual_v1_3')
      window.location.href = `${window.location.origin}${PURCHASE_PATH}?type=subscription&frequency=month&v=4`;
    } else if (localStorage.getItem('anual') === 'true') {
      localStorage.removeItem('anual');
      window.location.href = `${window.location.origin}${PURCHASE_PATH}?type=subscription&frequency=anual&v=2`;
    } else if (localStorage.getItem('anual_v1_1') === 'true') {
      localStorage.removeItem('anual_v1_1');
      window.location.href = `${window.location.origin}${PURCHASE_PATH}?type=subscription&frequency=anual&v=3`;
    } else if (localStorage.getItem('anual_v1_2') === 'true') {
      localStorage.removeItem('anual_v1_2');
      window.location.href = `${window.location.origin}${PURCHASE_PATH}?type=subscription&frequency=anual&v=4`;
    } else if (localStorage.getItem('cuatrimestre') === 'true') {
      localStorage.removeItem('cuatrimestre');
      window.location.href = `${window.location.origin}${PURCHASE_PATH}?type=subscription&frequency=cuatri&v=3`;
    } else if (localStorage.getItem('cuatrimestre_v1_1') === 'true') {
      localStorage.removeItem('cuatrimestre_v1_1');
      window.location.href = `${window.location.origin}${PURCHASE_PATH}?type=subscription&frequency=cuatri&v=4`;
    } else if (localStorage.getItem('nailMaster') === 'true') {
      localStorage.removeItem('nailMaster');
      window.location.href = `${window.location.origin}${PURCHASE_PATH}?type=course&id=30`;
    } else if (
      localStorage.getItem('plan') === 'true'
    ) {
      localStorage.removeItem('plan');
      if (userInfo.final_date < (today + tolerance) && userInfo.role !== 'superAdmin') {
        window.location.href = `${window.location.origin}${PLAN_PATH}`;
      }
    } else if (localStorage.getItem('login') === 'true') {
      localStorage.removeItem('login');
      window.location.href = `${window.location.origin}${PROFILE_PATH}`;
    } else if (localStorage.getItem('rewards') === 'true') {
      localStorage.removeItem('rewards');
      window.location.href = `${window.location.origin}${REWARDS_PATH}`;
    } else if (localStorage.getItem('retryPayment') === 'true') {
      localStorage.removeItem('retryPayment');
      window.location.href = `${window.location.origin}${RETRY_PAYMENT_PATH}`;
    } else if (localStorage.getItem('lesson-redirect-info')) {
      const lessonRedirectInfo = localStorage.getItem('lesson-redirect-info') || '';
      const { course_id, lesson_id, season_id, is_free, is_flexible } = JSON.parse(lessonRedirectInfo) as {
        course_id: number;
        season_id: number;
        lesson_id: number;
        is_free: boolean;
        is_flexible: boolean;
      };
      localStorage.removeItem('lesson-redirect-info');
      // CURSOS NO FLEXIBLES
      let url = `/lesson?id=${course_id}&season=${season_id}&lesson=${lesson_id}`;
      if (!is_flexible) {
        url = `/lesson?id=${course_id}&season=${0}&lesson=${0}`;
      }

      if (userInfo.final_date < (today + tolerance) && !is_free && userInfo.role !== 'superAdmin') {
        window.location.href = `${window.location.origin}${PLAN_PATH}`;
      } else {
        window.location.href = `${window.location.origin}${url}`;
      }
    }
    else {
      window.location.href = PREVIEW_PATH;
    }
  }
  if (type === 'register') {
    if (localStorage.getItem('trial') === 'true') {
      localStorage.removeItem('trial');
      window.location.href = `${window.location.origin}${PURCHASE_PATH}?type=subscription&trial=true&v=3`;
    }
    else if (localStorage.getItem('course')) {
      const course = localStorage.getItem('course');
      localStorage.removeItem('course');
      window.location.href = `${window.location.origin}${PURCHASE_PATH}?type=course&id=${course || ''}`;
    }
    else if (localStorage.getItem('product')) {
      const product = localStorage.getItem('product');
      localStorage.removeItem('product');
      window.location.href = `${window.location.origin}${PURCHASE_PATH}?type=course&id=${product || ''}`;
    } else if (localStorage.getItem('mensual') === 'true') {
      localStorage.removeItem('mensual')
      window.location.href = `${window.location.origin}${PURCHASE_PATH}?type=subscription&frequency=month&v=1`;
    } else if (localStorage.getItem('mensual_v1_1') === 'true') {
      localStorage.removeItem('mensual_v1_1')
      window.location.href = `${window.location.origin}${PURCHASE_PATH}?type=subscription&frequency=month&v=2`;
    } else if (localStorage.getItem('mensual_v1_2') === 'true') {
      localStorage.removeItem('mensual_v1_2')
      window.location.href = `${window.location.origin}${PURCHASE_PATH}?type=subscription&frequency=month&v=3`;
    } else if (localStorage.getItem('mensual_v1_3') === 'true') {
      localStorage.removeItem('mensual_v1_3')
      window.location.href = `${window.location.origin}${PURCHASE_PATH}?type=subscription&frequency=month&v=4`;
    } else if (localStorage.getItem('anual') === 'true') {
      localStorage.removeItem('anual');
      window.location.href = `${window.location.origin}${PURCHASE_PATH}?type=subscription&frequency=anual&v=2`;
    } else if (localStorage.getItem('anual_v1_1') === 'true') {
      localStorage.removeItem('anual_v1_1');
      window.location.href = `${window.location.origin}${PURCHASE_PATH}?type=subscription&frequency=anual&v=3`;
    } else if (localStorage.getItem('anual_v1_2') === 'true') {
      localStorage.removeItem('anual_v1_2');
      window.location.href = `${window.location.origin}${PURCHASE_PATH}?type=subscription&frequency=anual&v=4`;
    } else if (localStorage.getItem('cuatrimestre') === 'true') {
      localStorage.removeItem('cuatrimestre');
      window.location.href = `${window.location.origin}${PURCHASE_PATH}?type=subscription&frequency=cuatri&v=3`;
    } else if (localStorage.getItem('cuatrimestre_v1_1') === 'true') {
      localStorage.removeItem('cuatrimestre_v1_1');
      window.location.href = `${window.location.origin}${PURCHASE_PATH}?type=subscription&frequency=cuatri&v=4`;
    } else if (localStorage.getItem('nailMaster') === 'true') {
      localStorage.removeItem('nailMaster');
      window.location.href = `${window.location.origin}${PURCHASE_PATH}?type=course&id=30`;
    } else if (
      localStorage.getItem('plan') === 'true'
    ) {
      localStorage.removeItem('plan');
      if (userInfo.final_date < (today + tolerance) && userInfo.role !== 'superAdmin') {
        window.location.href = `${window.location.origin}${PLAN_PATH}`;
      }
    } else if (localStorage.getItem('login') === 'true') {
      localStorage.removeItem('login');
      window.location.href = `${window.location.origin}${PROFILE_PATH}`;
    } else if (localStorage.getItem('rewards') === 'true') {
      localStorage.removeItem('rewards');
      window.location.href = `${window.location.origin}${REWARDS_PATH}`;
    } else if (localStorage.getItem('lesson-redirect-info')) {
      const lessonRedirectInfo = localStorage.getItem('lesson-redirect-info') || '';
      const { course_id, lesson_id, season_id, is_free } = JSON.parse(lessonRedirectInfo) as {
        course_id: number;
        season_id: number;
        lesson_id: number;
        is_free: boolean;
      };
      localStorage.removeItem('lesson-redirect-info');
      // CURSOS NO FLEXIBLES
      let url = `/lesson?id=${course_id}&season=${season_id}&lesson=${lesson_id}`;
      if ([30, 57].includes(course_id)) {
        url = `/lesson?id=${course_id}&season=${0}&lesson=${0}`;
      }

      if (userInfo.final_date < (today + tolerance) && !is_free && userInfo.role !== 'superAdmin') {
        window.location.href = `${window.location.origin}${PLAN_PATH}`;
      } else {
        window.location.href = `${window.location.origin}${url}`;
      }
    }
    else {
      window.location.href = PREVIEW_PATH;
    }
  }
};

export const goToCertificate = (course: any) => {
  router.push({
    pathname: CERTIFICATES_PATH,
    query: {
      certificate_id: course.certificate_id,
    },
  });
};
export const goToSuscription = (user: IUser, course: ICourse) => {
  if (user) {
    // Falta considerar nivel 3 (Pausado, en este caso es necesario mandar a PROFILE_PATH)
    if (course.type === 'Gratis' || (
      haveAccess(
        user.level,
        user.final_date,
        user.role,
        user.method as MembershipMethodValue,
      ) && course.type === 'Mensual')
    ) {
      router.push({
        pathname: LESSON_PATH,
        query: { id: course.id, season: 0, lesson: 0 },
      });
    } else {
      router.push(PLAN_PATH);
    }
  } else {
    const { id } = course;
    const data = {
      course_id: id,
      season_id: 0,
      lesson_id: 0,
      is_free: course.type === 'Gratis' ? true : false
    }
    const jsonString = JSON.stringify(data);
    localStorage.setItem('lesson-redirect-info', jsonString);
    router.push({ pathname: LOGIN_PATH });
  }
};
