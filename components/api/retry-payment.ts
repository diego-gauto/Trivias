export const getPlanId = (level: number, type: number) => {
  let plan_id = '';

  if (type === 0) {
    if ([4, 5].includes(level)) {
      plan_id = 'anual_v1_1';
    }
    if ([7, 8].includes(level)) {
      plan_id = 'cuatrimestre';
    }
    if ([1, 6].includes(level)) {
      plan_id = 'mensual_v1_2';
    }
  }

  if ([4, 5].includes(level) && type === 1599) plan_id = 'anual';
  if ([4, 5].includes(level) && type === 3497) plan_id = 'anual_v1_1';
  if ([1, 6].includes(level) && type === 149) plan_id = 'mensual';
  if ([1, 6].includes(level) && type === 249) plan_id = 'mensual_v1_1';
  if ([1, 6].includes(level) && type === 459) plan_id = 'mensual_v1_2';
  if ([7, 8].includes(level)) plan_id = 'cuatrimestre';
  if (level === 0) plan_id = 'cuatrimestre';

  return plan_id;
};

export const getPriceToPay = (level: number, type: number) => {
  if (type === 0) {
    if ([1, 6].includes(level)) {
      return 459;
    }
    if ([7, 8].includes(level)) {
      return 1599;
    }
    if ([4, 5].includes(level)) {
      return 3497;
    }
  }

  const CORRECT_PRICES = [149, 249, 459, 1599, 3497];

  if (!CORRECT_PRICES.includes(type)) {
    /*throw new Error(
      `Cuenta con un precio que no es correcto, contacte con soporte tecnico`,
    );*/
    console.error(
      'Cuenta con un precio que no es correcto, contacte con soporte tecnico: ' +
        type,
    );
    return 1599;
  }

  return type;
};
