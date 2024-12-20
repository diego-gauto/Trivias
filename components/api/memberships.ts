import { getGenericQueryResponse } from './admin';

type MembershipType = 'mensual' | 'cuatrimestral' | 'anual';

interface Membership {
  membership_type_id: number;
  name: MembershipType;
  description: string;
  membership_price_id: number;
  price: number;
  initial_date: string;
  conekta_id: string;
  paypal_id: string;
}

const getCurrentMemberships = async () => {
  try {
    const query = `select mt.*, mp.membership_price_id, mp.price, 
      mp.initial_date, mp.conekta_id, mp.paypal_id
      from membership_types as mt 
      inner join membership_prices as mp 
      on mt.membership_type_id = mp.membership_type_id;`;
    const response = await getGenericQueryResponse(query);
    const data = response.data.data as Membership[];
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getMembershipTypeByUserProps = (user: {
  level: number;
  type: number;
}): MembershipType => {
  const { level, type } = user;
  if ([1, 6].includes(level)) {
    return 'mensual';
  }
  if ([4, 5].includes(level)) {
    return 'cuatrimestral';
  }
  if ([6, 7].includes(level)) {
    return 'anual';
  }
  throw new Error(
    'No se encontró el tipo de suscripción apropiado para el nivel',
  );
};

const getLastMembershipByProperties = (user: {
  level: number;
  type: number;
}) => {
  const memberships: Membership[] = [];

  const { level, type } = user;

  let membershipType: MembershipType = getMembershipTypeByUserProps({
    level,
    type,
  });

  const filteredMemberships = memberships.filter(
    (m) => m.name === membershipType,
  );
  const prices = filteredMemberships.map((m) => m.price);
  const max = Math.max(...prices);
  return max;
};
