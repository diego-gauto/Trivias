import { getGenericQueryResponse, postGenericQueryResponse } from "../../api/admin";

export const getAdminUserIdByEmail = async (email: string) => {
  try {
    const query = `select au.id as admin_user_id 
      from users as u 
      inner join admin_users as au on au.user_id = u.id
      where u.email like '${email}%';`;
    const response = await getGenericQueryResponse(query);
    const data = response.data.data as { admin_user_id: number }[];
    return data[0]?.admin_user_id || 0;
  } catch (error) {
    console.error(error);
    return 0;
  }
}

export const getAllAdmins = async (): Promise<IAdmin[]> => {
  try {
    const query = `select au.id as admin_id,
        u.id as user_id,
        concat(u.name, ' ', u.last_name) as name,
        u.email, u.phone_number
        from admin_users as au 
        inner join users as u on u.id = au.user_id 
        order by au.id;`;
    const response = await getGenericQueryResponse(query);
    const data = response.data.data as IAdmin[];
    return data;
  } catch (error) {
    console.error(error);
  }
  return [];
}

export const getAllDistributorUsersArray = async (offset: number, input: string): Promise<IDistributor[]> => {
  try {
    const query = `select d.distributor_id, concat(u.name, ' ', u.last_name) as name, 
        u.phone_number, u.photo, unix_timestamp(u.created_at) as user_created_at, 
        unix_timestamp(d.created_at) as distributor_created_at, d.admin_user_id, 
        u.country, u.email, ifnull(u.origin_state, 'Desconocido') as origin_state,
        ifnull(d.postal_code, 'Desconocido') as postal_code
        from distributors as d
        inner join users as u on u.id = d.user_id
        where u.email like '${input}%' or concat(u.name, ' ', u.last_name) like '${input}%'
        order by d.distributor_id
        limit 100 offset ${offset};`;
    const response = await getGenericQueryResponse(query);
    const data = response.data.data as IDistributor[];
    return data;
  } catch (error) {
    console.error(error);
  }
  return [];
}

export const getAllDistributorUsersCount = async (input: string): Promise<number> => {
  try {
    const query = `select count(*) as count
      from distributors as d
      inner join users as u on u.id = d.user_id
      where u.email like '${input}%' or concat(u.name, ' ', u.last_name) like '${input}%';`;
    const response = await getGenericQueryResponse(query);
    const data = response.data.data as { count: number }[];
    return data[0]?.count || 0;
  } catch (error) {
    console.error(error);
  }
  return 0;
}

export const getAllUsersArray = async (offset: number, input: string): Promise<IUser[]> => {
  try {
    const query = `select id as user_id, concat(name, ' ', last_name) as name, 
      phone_number, photo, unix_timestamp(created_at) as user_created_at, 
      country, email, ifnull(origin_state, '') as origin_state
      from users
      where email like '${input}%' or concat(name, ' ', last_name) like '${input}%'
      order by id
      limit 100 offset ${offset};`;
    console.log({ query });
    const response = await getGenericQueryResponse(query);
    const data = response.data.data as IUser[];
    return data;
  } catch (error) {
    console.error(error);
  }
  return [];
}

export const getAllUsersCount = async (input: string): Promise<number> => {
  try {
    const query = `select count(*) as count
      from users 
      where email like '${input}%' or concat(name, ' ', last_name) like '${input}%';`;
    const response = await getGenericQueryResponse(query);
    const data = response.data.data as { count: number }[];
    return data[0]?.count || 0;
  } catch (error) {
    console.error(error);
  }
  return 0;
}

export const getAllDistributorUserIds = async (): Promise<IDistributorIdsWithUserId[]> => {
  try {
    const query = `select distributor_id, user_id from distributors;`;
    const response = await getGenericQueryResponse(query);
    const data = response.data.data as IDistributorIdsWithUserId[];
    return data;
  } catch (error) {
    console.error(error);
  }
  return [];
}

export const createANewDistributor = async (userId: number, adminUserId: number): Promise<boolean> => {
  try {
    const query = `insert into distributors (user_id, admin_user_id) values (${userId}, ${adminUserId});`;
    const response = await postGenericQueryResponse(query);
    console.log({ result: response.data.data });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export const getDistributorDetails = async () => {
  try {
    const query = `select * 
      from codes as c
      inner join code_sell_details as csd on c.code_sell_detail_id = csd.code_sell_detail_id
      inner join code_sells as cs on cs.code_sell_id = csd.code_sell_id
      where cs.distributor_id = 1;`;
    const response = await getGenericQueryResponse(query);
  } catch (error) {
    console.error(error);
  }
  return null;
}

export const getDistributorCodesById = async (distributorId: number): Promise<ICodeSell[]> => {
  try {
    interface ICodeSellCode {
      code_sell_id: number,
      admin_id: number,
      distributor_id: number,
      created_sell_at: string,
      code_sell_detail_id: number,
      duration_type: 'M' | 'C' | 'A',
      count: number,
      amount: number,
      code_id: number,
      user_id: number | null,
      code: string,
      sell_at: string | null
      username: string | null
      email: string | null
      phone_number: string | null
    }

    const getCodeSellsQuery = `select cs.code_sell_id, cs.admin_id, cs.distributor_id, cs.created_at as created_sell_at, 
        csd.code_sell_detail_id, duration_type, \`count\`, amount, code_id, user_id, concat(u.name, ' ', u.last_name) as username, u.email, u.phone_number,code, sell_at 
        from code_sells as cs
        inner join code_sell_details as csd on cs.code_sell_id = csd.code_sell_id
        inner join codes as c on c.code_sell_detail_id = csd.code_sell_detail_id
        left join users as u on c.user_id = u.id
        where cs.distributor_id = ${distributorId}
        order by cs.created_at desc;`;

    const getCodeSellsResponse = await getGenericQueryResponse(getCodeSellsQuery);
    const rows = getCodeSellsResponse.data.data as ICodeSellCode[];

    const codeSellIds = new Set([...rows.map(c => c.code_sell_id)]);
    const result: ICodeSell[] = [];
    for (const codeSellId of codeSellIds) {
      const codesX = rows.filter(c => c.code_sell_id === codeSellId);
      const codeSellDetailIds = new Set([...codesX.map(c => c.code_sell_detail_id)]);
      let codeSellDetailsArray = [];
      for (const codeSellDetailId of codeSellDetailIds) {
        const codes = codesX.filter(c => c.code_sell_detail_id === codeSellDetailId);

        const readyCodes = codes.map(c => {
          const { code, sell_at, user_id, code_sell_detail_id, email, username } = c;
          return {
            code,
            sell_at: sell_at !== null ? parseInt(sell_at) : null,
            user_id,
            code_sell_detail_id,
            username,
            email
          }
        });
        const { code_sell_detail_id, code_sell_id, amount, count, duration_type } = codes[0]!;
        codeSellDetailsArray.push({
          code_sell_id,
          code_sell_detail_id,
          amount,
          count,
          duration_type,
          codes: readyCodes
        });

      }
      const { created_sell_at, distributor_id, admin_id, code_sell_id } = codesX[0]!;
      result.push({
        distributor_id,
        admin_id,
        code_sell_id,
        created_sell_at: parseInt(created_sell_at),
        details: codeSellDetailsArray
      });
    }
    return result;
  } catch (error) {
    console.error(error);
  }
  return [];
}

export async function createCodesForDistributor(accessCount: number): Promise<string[]> {
  try {
    const getAllCodesQuery = `select code from codes;`;
    const getAllCodesResponse = await getGenericQueryResponse(getAllCodesQuery);
    const allCodesArray = (getAllCodesResponse.data.data as { code: string }[]).map((e) => e.code);

    const newCodes: string[] = [];

    const generateUUIDShort = () => {
      return generateUUID()
        .split('-')
        .filter((v, index) => [0, 1].includes(index))
        .join('');
    }

    for (let index = 0; index < accessCount; index++) {
      const value = generateUUIDShort();
      newCodes.push(value);
    }

    const result = replaceDuplicatedItems(allCodesArray, newCodes, generateUUIDShort);
    return result;
  } catch (error) {
    console.error(error);
    return [];
  }
}

function replaceDuplicatedItems(baseArray: string[], newArray: string[], generateNewValue: () => string) {
  return newArray.map(element => {
    if (baseArray.includes(element)) {
      let newElement: string = '';
      do {
        newElement = generateNewValue();
      } while (baseArray.includes(newElement) || newArray.includes(newElement));
      return newElement;
    }
    return element;
  });
}

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
}

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

export const generateSellOfAccess = async (body: ICreateCodeSell): Promise<boolean> => {
  const { admin_id, details, distributor_id } = body;

  console.log({ body });

  try {
    const createCodeSellResponse = await createCodeSell({
      admin_id,
      distributor_id,
    });
    console.log("Pudo crear la venta");
    const createCodeSellId = createCodeSellResponse.data.data.insertId;
    type GeneratedCodeSellDetail = {
      code_sell_detail_id: number
      count: number
    }

    const generatedCodeSellsDetails: GeneratedCodeSellDetail[] = [];

    for (const detail of details) {
      const { duration_type, amount, count } = detail;
      const addDetailResponse = await addCodeSellDetail(
        createCodeSellId,
        duration_type,
        count,
        amount,
      );

      const codeSellDetailId = addDetailResponse.data.data.insertId;
      generatedCodeSellsDetails.push({
        count,
        code_sell_detail_id: codeSellDetailId,
      });
    }
    console.log("Pudo crear un detalle");
    generatedCodeSellsDetails.forEach(async (csd) => {
      const { code_sell_detail_id, count } = csd;
      const codes = await createCodesForDistributor(count);
      codes.forEach(async (code) => {
        await addCode({
          code_sell_detail_id,
          code
        });
        console.log("Pudo crear un codigo");
      });
    });

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getProductHistoryByDistributorId = async (distributorId: number): Promise<IProductSellHistory[]> => {
  try {
    const query = `SELECT ps.seller_id, distributor_id, sell_at, p2.product_sell_id, 
    p1.product_id, count, price, p1.name AS product_name, p1.image AS product_image, 
    sv.email AS seller_email 
    FROM product_sells AS ps 
    INNER JOIN products_by_product_sell AS p2 ON p2.product_sell_id = ps.product_sell_id 
    INNER JOIN products AS p1 ON p2.product_id = p1.product_id 
    INNER JOIN sellers_view AS sv ON sv.seller_id = ps.seller_id
    WHERE ps.distributor_id = ${distributorId};`;
    const response = await getGenericQueryResponse(query);
    const result = response.data.data as IProductHistoryRecord[];

    const productSellIds = [...new Set(result.map(ps => ps.product_sell_id))]

    const finalResult: IProductSellHistory[] =
      productSellIds.map((psId) => {
        const records = result.filter(ph => ph.product_sell_id === psId);
        const { distributor_id, seller_email, sell_at, seller_id } = records[0]!;
        const products: IProductSell[] = records.map((ph) => {
          const { product_sell_id, product_id, product_name, product_image, price, count } = ph;

          return {
            product_sell_id,
            product_id,
            product_name,
            product_image,
            count,
            price
          }
        });

        const sellAtWithFormat = new Date(parseInt(sell_at) * 1000);

        const productCount = products
          .map(p => p.count)
          .reduce((pv, cv) => { return pv + cv }, 0);

        const productTotalAmount = products
          .map((p) => { return { price: p.price, count: p.count } })
          .reduce((pv, cv) => { return pv + (cv.price * cv.count) }, 0);

        return {
          distributor_id,
          sell_at: sellAtWithFormat.toJSON().slice(0, 10),
          seller_email,
          seller_id,
          products,
          product_count: productCount,
          product_total_amount: productTotalAmount
        }
      });

    return finalResult;
  } catch (error) {
    console.error(error);
    return [];
  }
}

const generateSequence = (n: number) =>
  Array(n)
    .fill(0)
    .map((_, i) => i + 1);