import {
  getGenericQueryResponse,
  postGenericQueryResponse,
} from '../../../api/admin';

// insert into code_sells (admin_id, distributor_id) values (${admin_id}, ${distributor_id});
const createCodeSell = async (body: {
  admin_id: number;
  distributor_id: number;
}) => {
  const { admin_id, distributor_id } = body;
  const query = `insert into code_sells (admin_id, distributor_id) values (${admin_id}, ${distributor_id});`;
  try {
    const result = await postGenericQueryResponse(query);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const addCodeSellDetail = async (
  code_sell_id: number,
  duration_type: 'M' | 'C' | 'A',
  count: number,
  amount: number,
) => {
  const query = `insert into code_sell_details (code_sell_id, duration_type, \`count\`, amount) 
  values (${code_sell_id}, '${duration_type}', ${count}, ${amount});`;
  try {
    const result = await postGenericQueryResponse(query);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const addCode = async (data: { code_sell_detail_id: number; code: string }) => {
  const { code_sell_detail_id, code } = data;
  const query = `insert into codes (code_sell_detail_id, code) 
    values (${code_sell_detail_id}, '${code}');`;
  try {
    const result = await postGenericQueryResponse(query);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

interface ICode {
  code_sell_id: number;
  admin_id: number;
  distributor_id: number;
  created_at: string;
  code_sell_detail_id: number;
  duration_type: string;
  count: number;
  amount: number;
  code_id: number;
  user_id: number | null;
  code: string;
  sell_at: number | null;
}

const getCodesByCodeSellId = async (code_sell_id: number) => {
  const query = `select cs.code_sell_id, cs.admin_id, cs.distributor_id, unix_timestamp(created_at) as created_sell_at, 
    csd.code_sell_detail_id, duration_type, \`count\`, amount, code_id, user_id, code, unix_timestamp(sell_at) as sell_at 
    from code_sells as cs
    inner join code_sell_details as csd on cs.code_sell_id = csd.code_sell_id
    inner join codes as c on c.code_sell_detail_id = csd.code_sell_detail_id
    where cs.code_sell_id = ${code_sell_id};`;

  try {
    const response = await getGenericQueryResponse(query);
    const result = response.data.data as ICode[];

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

type SubscriptionValue = 'M' | 'C' | 'A';

interface IDetail {
  duration_type: SubscriptionValue;
  count: number;
  amount: number;
}

interface ICreateCodeSell {
  admin_id: number;
  distributor_id: number;
  details: IDetail[];
}

export const generateCodes = async (body: ICreateCodeSell) => {
  const { admin_id, details, distributor_id } = body;
  const createCodeSellResponse = await createCodeSell({
    admin_id,
    distributor_id,
  });

  const createCodeSellId = createCodeSellResponse.data.data.insertId;

  const generateSequence = (n: number) =>
    Array(n)
      .fill(0)
      .map((_, i) => i + 1);

  for (const detail of details) {
    const { duration_type, amount, count } = detail;
    const addDetailResponse = await addCodeSellDetail(
      createCodeSellId,
      duration_type,
      count,
      amount,
    );

    const codeSellDetailId = addDetailResponse.data.data.insertId;
    const sequence = generateSequence(count);
    for (const indexOfCode of sequence) {
      const customizedUUID = generateUUID()
        .split('-')
        .filter((uuid, i) => i < 2)
        .join('');
      const addCodeResponse = await addCode({
        code_sell_detail_id: codeSellDetailId,
        code: customizedUUID,
      });
    }
  }

  const finalResponse = await getCodesByCodeSellId(createCodeSellId);
  return finalResponse;
};

const generateUUID = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID(); // Usa la API nativa si está disponible
  }

  // Fallback para navegadores antiguos
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const generateSequence = (n: number) =>
  Array.from({ length: n }, (_, i) => i + 1);
