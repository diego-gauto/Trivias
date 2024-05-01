import router from 'next/router';

import {
  PREVIEW_PATH,
  PROFILE_PATH,
  PURCHASE_PATH,
  SIGNUP_PATH,
} from '../../../constants/paths';
import { IUser } from '../../../interfaces/IUserData';

type Suscription = 'M' | 'C' | 'A';

export const goTo = (user: IUser, type: Suscription) => {
  const today = new Date().getTime() / 1000;
  const frequency =
    type === 'M' ? 'month' : type === 'C' ? 'cuatrimestral' : 'anual';
  // debugger;
  if (user && user.id) {
    let complete_nails = user.user_courses.filter(
      (val: any) => val.course_id === 57 && val.final_date > today,
    );
    // Usuarios que estan en proceso de re-intento de pago que final_date puede estar vencido
    // Si una usuaria es de pago recurrente nivel 1, 4, 7
    // debugger;
    if (
      [1, 4, 7].includes(user.level) &&
      user.final_date > today - 10 * 24 * 60 * 60
    ) {
      router.push(PREVIEW_PATH);
    }
    // Cambiar
    // Pagos no recurrentes
    // 1. Con final_date vencido (inactivas)
    // 2. Con final_date no vencido (activas)
    else if ([0, 5, 6, 8].includes(user.level)) {
      if (user.final_date < today) {
        router.push({
          pathname: PURCHASE_PATH,
          query: { type: 'subscription', frequency, v: '3' },
        });
      } else {
        router.push(PREVIEW_PATH);
      }
    }
    // niveles 3 pausados
    else if (user.level === 3) {
      router.push(PROFILE_PATH);
    } else if (complete_nails.length > 0) {
      router.push(PREVIEW_PATH);
    } else {
      router.push({
        pathname: PURCHASE_PATH,
        query: { type: 'subscription', frequency, v: '3' },
      });
    }
  } else {
    localStorage.setItem(frequency, 'true');
    router.push(SIGNUP_PATH);
  }
};
