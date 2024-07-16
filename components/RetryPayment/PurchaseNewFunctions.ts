interface Subscription {
  price: number;
  title: string;
  duration: any;
}

export const getSubscriptionTypeTitle = (frequency: string) => {
  if (frequency === 'month') {
    return 'Mensual';
  } else if (frequency === 'cuatrimestral') {
    return 'Cuatrimestral';
  } else if (frequency === 'anual') {
    return 'Anual';
  }
  return '';
};

export const getDuration = (frequency: string) => {
  if (frequency === 'month') {
    return 30;
  } else if (frequency === 'cuatrimestral') {
    return 120;
  } else if (frequency === 'anual') {
    return 365;
  }

  return 0;
};

export const getSubscription = (
  type: string,
  frequency: string,
  v: string,
): Subscription => {
  return {
    price: getPriceByParams(type, frequency, v),
    title: getTitle(frequency),
    duration: getDuration(frequency),
  };
};

export const getTitle = (frequency: string) => {
  if (frequency === 'month') {
    return 'Gonvar Plus Mensual';
  } else if (frequency === 'cuatrimestral') {
    return 'Gonvar Plus Cuatri';
  } else if (frequency === 'anual') {
    return 'Gonvar Plus Anual';
  }

  return 'Gonvar Plus';
};

export const getPriceByParams = (
  type: string,
  frequency: string,
  v: string,
) => {
  let tempPrice = 0;
  if (frequency === 'month' && v === '1') tempPrice = 149;
  if (frequency === 'month' && v === '2') tempPrice = 249;
  if (frequency === 'month' && v === '3') tempPrice = 459;
  if (frequency === 'anual' && ['1', '2'].includes(v)) tempPrice = 1599;
  if (frequency === 'anual' && v === '3') tempPrice = 3497;
  if (frequency === 'cuatrimestral' && ['1', '2', '3'].includes(v))
    tempPrice = 1599;
  if (type === 'course') tempPrice = 1599;
  return tempPrice;
};
