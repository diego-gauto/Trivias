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

export const authRedirect = (type: string, userInfo?: any) => {
  let today = new Date().getTime() / 1000;
  if (type === 'login') {
    if (
      localStorage.getItem('trial') === 'true' &&
      userInfo.final_date < today &&
      userInfo.role !== 'superAdmin'
    ) {
      localStorage.removeItem('trial');
      window.location.href = `https://www.gonvar.io${PURCHASE_PATH}?type=subscription&trial=true&v=3`;
    } else if (localStorage.getItem('course')) {
      const course = localStorage.getItem('course');
      localStorage.removeItem('course');
      window.location.href = `https://www.gonvar.io${PURCHASE_PATH}?type=course&id=${course || ''}`;
    } else if (localStorage.getItem('product')) {
      const product = localStorage.getItem('product');
      localStorage.removeItem('product');
      window.location.href = `https://www.gonvar.io${PURCHASE_PATH}?type=course&id=${product || ''}`;
    } else if (
      localStorage.getItem('month') === 'true' &&
      userInfo.final_date < today &&
      userInfo.role !== 'superAdmin'
    ) {
      localStorage.removeItem('month')
      window.location.href = `https://www.gonvar.io${PURCHASE_PATH}?type=subscription&frequency=month&v=3`;
    } else if (localStorage.getItem('month_1') === 'true') {
      localStorage.removeItem('month_1')
      window.location.href = `https://www.gonvar.io${PURCHASE_PATH}?type=subscription&frequency=month&v=1`;
    } else if (localStorage.getItem('month_2') === 'true') {
      localStorage.removeItem('month_2')
      window.location.href = `https://www.gonvar.io${PURCHASE_PATH}?type=subscription&frequency=month&v=2`;
    } else if (
      localStorage.getItem('anual') === 'true' &&
      userInfo.final_date < today &&
      userInfo.role !== 'superAdmin'
    ) {
      localStorage.removeItem('anual');
      window.location.href = `https://www.gonvar.io${PURCHASE_PATH}?type=subscription&frequency=anual&v=3`;
    } else if (
      localStorage.getItem('cuatri') === 'true' &&
      userInfo.final_date < today &&
      userInfo.role !== 'superAdmin'
    ) {
      localStorage.removeItem('cuatri');
      window.location.href = `https://www.gonvar.io${PURCHASE_PATH}?type=subscription&frequency=cuatrimestral&v=3`;
    } else if (localStorage.getItem('nailMaster') === 'true') {
      localStorage.removeItem('nailMaster');
      window.location.href = `https://www.gonvar.io${PURCHASE_PATH}?type=course&id=30`;
    } else if (
      localStorage.getItem('plan') === 'true' &&
      userInfo.final_date < today &&
      userInfo.role !== 'superAdmin'
    ) {
      localStorage.removeItem('plan');
      window.location.href = `https://www.gonvar.io${PLAN_PATH}`;
    } else if (localStorage.getItem('login') === 'true') {
      localStorage.removeItem('login');
      window.location.href = `https://www.gonvar.io${PROFILE_PATH}`;
    } else if (localStorage.getItem('rewards') === 'true') {
      localStorage.removeItem('rewards');
      window.location.href = `https://www.gonvar.io${REWARDS_PATH}`;
    }
    else if (localStorage.getItem('retryPayment') === 'true') {
      localStorage.removeItem('retryPayment');
      window.location.href = `https://www.gonvar.io${RETRY_PAYMENT_PATH}`;
    }
    else {
      window.location.href = PREVIEW_PATH;
    }
  }
  if (type === 'register') {
    if (localStorage.getItem('trial') === 'true') {
      localStorage.removeItem('trial');
      window.location.href = `https://www.gonvar.io${PURCHASE_PATH}?type=subscription&trial=true&v=3`;
    }
    if (localStorage.getItem('course')) {
      const course = localStorage.getItem('course');
      localStorage.removeItem('course');
      window.location.href = `https://www.gonvar.io${PURCHASE_PATH}?type=course&id=${course || ''}`;
    }
    if (localStorage.getItem('product')) {
      const product = localStorage.getItem('product');
      localStorage.removeItem('product');
      window.location.href = `https://www.gonvar.io${PURCHASE_PATH}?type=course&id=${product || ''}`;
    }
    if (localStorage.getItem('month') === 'true') {
      localStorage.removeItem('month');
      window.location.href = `https://www.gonvar.io${PURCHASE_PATH}?type=subscription&frequency=month&v=3`;
    }
    if (localStorage.getItem('month_1') === 'true') {
      localStorage.removeItem('month_1');
      window.location.href = `https://www.gonvar.io${PURCHASE_PATH}?type=subscription&frequency=month&v=1`;
    }
    if (localStorage.getItem('anual') === 'true') {
      localStorage.removeItem('anual');
      window.location.href = `https://www.gonvar.io${PURCHASE_PATH}?type=subscription&frequency=anual&v=3`;
    }
    if (localStorage.getItem('cuatri') === 'true') {
      localStorage.removeItem('cuatri');
      window.location.href = `https://www.gonvar.io${PURCHASE_PATH}?type=subscription&frequency=cuatrimestral&v=3`;
    }
    if (localStorage.getItem('nailMaster') === 'true') {
      localStorage.removeItem('nailMaster');
      window.location.href = `https://www.gonvar.io${PURCHASE_PATH}?type=course&id=30`;
    }
    if (localStorage.getItem('plan') === 'true') {
      localStorage.removeItem('plan');
      window.location.href = `https://www.gonvar.io${PLAN_PATH}`;
    }
    if (localStorage.getItem('login') === 'true') {
      localStorage.removeItem('login');
      window.location.href = `https://www.gonvar.io${PROFILE_PATH}`;
    }
    if (localStorage.getItem('rewards') === 'true') {
      localStorage.removeItem('rewards');
      window.location.href = `https://www.gonvar.io${REWARDS_PATH}`;
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
    if (
      haveAccess(
        user.level,
        user.final_date,
        user.role,
        user.method as MembershipMethodValue,
      ) &&
      course.type === 'Mensual'
    ) {
      router.push({
        pathname: LESSON_PATH,
        query: { id: course.id, season: 0, lesson: 0 },
      });
    } else {
      router.push(PLAN_PATH);
    }
  } else {
    if (course.type === 'Mensual') {
      localStorage.setItem('plan', `true`);
    }
    router.push({ pathname: LOGIN_PATH });
  }
};
