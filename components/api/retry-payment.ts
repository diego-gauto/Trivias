/*
type FrecuencyValues = 'cuatri' | 'month' | 'anual';

cuatrimestre
cuatrimestre_v1_1

mensual
mensual_v1_1
mensual_v1_2
mensual_v1_3

anual
anual_v1_1
anual_v1_2
*/

export const getPlanId = (level: number, type: number) => {
  let plan_id = '';

  if (type === 0) {
    if ([4, 5].includes(level)) {
      plan_id = 'anual_v1_2';
    }
    if ([7, 8].includes(level)) {
      plan_id = 'cuatrimestre_v1_1';
    }
    if ([1, 6].includes(level)) {
      plan_id = 'mensual_v1_3';
    }
  }

  if (level === 0) plan_id = 'cuatrimestre_v1_1';

  // ANUALES
  if ([4, 5].includes(level) && type === 1599) plan_id = 'anual';
  if ([4, 5].includes(level) && type === 3497) plan_id = 'anual_v1_1';
  if ([4, 5].includes(level) && type === 2500) plan_id = 'anual_v1_2';
  if ([4, 5].includes(level) && type === 5697) plan_id = 'anual_v1_2';
  // MENSUALES
  if ([1, 6].includes(level) && type === 149) plan_id = 'mensual';
  if ([1, 6].includes(level) && type === 249) plan_id = 'mensual_v1_1';
  if ([1, 6].includes(level) && type === 459) plan_id = 'mensual_v1_2';
  if ([1, 6].includes(level) && type === 759) plan_id = 'mensual_v1_3';
  // CUATRIMESTRALES
  if ([7, 8].includes(level)) plan_id = 'cuatrimestre_v1_1';
  if ([7, 8].includes(level) && type === 1599) plan_id = 'cuatrimestre';
  if (type === 2000) plan_id = 'cuatrimestre_v1_1';

  if (plan_id === '') {
    plan_id = 'cuatrimestre_v1_1';
  }

  return plan_id;
};

export const getPriceToPay = (level: number, type: number) => {
  if (type === 0) {
    if ([1, 6].includes(level)) {
      return 759;
    }
    if ([7, 8].includes(level)) {
      return 2599;
    }
    if ([4, 5].includes(level)) {
      return 5697;
    }
  }

  if (level === 0) return 2599; // cuatrimestre

  const CORRECT_PRICES = [149, 249, 459, 759, 1599, 2599, 3497, 5697];

  if (!CORRECT_PRICES.includes(type)) {
    if ([999, 2000].includes(type) && level === 8) return 2599; // cuatrimestre
    if ([2500].includes(type) && level === 5) return 5697; // anual
    return 2599;
  }

  return type;
};
