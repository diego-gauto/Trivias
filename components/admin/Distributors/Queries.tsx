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

export const getNormalUserIdByEmail = async (email: string) => {
  try {
    const query = `SELECT u.id AS user_id FROM users AS u where u.email LIKE '${email}%';`;
    const response = await getGenericQueryResponse(query);
    const data = response.data.data as { user_id: number }[];
    return data[0]?.user_id || 0;
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

const getWhereConditionsForDistributorsQuery = (input: string, params: IDistributorFilterParams) => {
  const { postal_code, origin_state, minAmount, maxAmount } = params;
  let amountRangeConditions: string[] = [];

  if (minAmount !== '') {
    amountRangeConditions.push(`COALESCE(t1.total_amount, 0) > ${minAmount}`);
  }
  if (maxAmount !== '') {
    amountRangeConditions.push(`COALESCE(t1.total_amount, 0) < ${maxAmount}`);
  }

  const amountCondition = amountRangeConditions.length > 0 ? `(${amountRangeConditions.join(' OR ')})` : '';
  const allConditions: string[] = [];

  if (postal_code !== '') {
    allConditions.push(`d.postal_code = '${postal_code}'`);
  }
  if (origin_state !== '') {
    allConditions.push(`u.origin_state = '${origin_state}'`);
  }

  if (amountCondition !== '') {
    allConditions.push(amountCondition);
  }

  if (input !== '') {
    allConditions.push(`(u.email LIKE '${input}%' OR CONCAT(u.name, ' ', u.last_name) LIKE '${input}%')`);
  }

  return allConditions.length === 0 ? '' : `WHERE ${allConditions.join('\n AND ')}`;
}

export const getAllDistributorUsersArray = async (offset: number, input: string, params: IDistributorFilterParams): Promise<IDistributor[]> => {
  try {
    const query2 = `SELECT 
          d.distributor_id, 
          CONCAT(u.name, ' ', u.last_name) AS name, 
          u.phone_number, 
          u.photo, 
          UNIX_TIMESTAMP(u.created_at) AS user_created_at, 
          UNIX_TIMESTAMP(d.created_at) AS distributor_created_at, 
          d.admin_user_id, 
          u.country, 
          IFNULL(u.email, '') AS email, 
          IFNULL(u.origin_state, '') AS origin_state, 
          IFNULL(d.postal_code, '') AS postal_code, 
          u.id AS user_id,
          COALESCE(t1.total_amount, 0) AS total_sales
      FROM distributors AS d
      INNER JOIN users AS u ON u.id = d.user_id
      LEFT JOIN (
          -- Subconsulta que calcula el total de ventas por distribuidor
          SELECT cs.distributor_id, SUM(csd.amount * csd.count) AS total_amount
          FROM code_sells AS cs
          INNER JOIN code_sell_details AS csd ON csd.code_sell_id = cs.code_sell_id
          WHERE csd.count > 0
          GROUP BY cs.distributor_id
      ) AS t1 ON d.distributor_id = t1.distributor_id
      ${getWhereConditionsForDistributorsQuery(input, params)}
      ORDER BY d.distributor_id
      LIMIT 100 OFFSET ${offset};`;
    const response = await getGenericQueryResponse(query2);
    const data = response.data.data as IDistributor[];
    return data;
  } catch (error) {
    console.error(error);
  }
  return [];
}

export const getAllProductsArray = async (offset: number, input: string): Promise<IProduct[]> => {
  try {
    const query = `SELECT * FROM products 
      WHERE name LIKE '%${input}%' 
      ORDER BY product_id
      LIMIT 100 offset ${offset};`;
    const response = await getGenericQueryResponse(query);
    const data = response.data.data as IProduct[];
    return data.map((p) => {
      const { product_id, name, default_price } = p;
      return {
        product_id,
        name,
        default_price
      }
    });
  } catch (error) {
    console.error(error);
  }
  return [];
}

export const getProducts = async (name: string): Promise<IProduct[]> => {
  try {
    const query = `SELECT * FROM products WHERE name LIKE '${name}%';`;
    const response = await getGenericQueryResponse(query);
    const data = response.data.data as IProduct[];
    return data;
  } catch (error) {
    console.error(error);
  }
  return [];
}

export const getDistributorById = async (id: number): Promise<IDistributor | null> => {
  try {
    const query = `select d.distributor_id, concat(u.name, ' ', u.last_name) as name, 
        u.phone_number, u.photo, unix_timestamp(u.created_at) as user_created_at, 
        unix_timestamp(d.created_at) as distributor_created_at, d.admin_user_id, 
        u.country, ifnull(u.email, '') as email, ifnull(u.origin_state, '') as origin_state,
        ifnull(d.postal_code, '') as postal_code
        from distributors as d
        inner join users as u on u.id = d.user_id
        where d.distributor_id = ${id};`;
    const response = await getGenericQueryResponse(query);
    const data = response.data.data as IDistributor[];
    return data[0] || null;
  } catch (error) {
    console.error(error);
  }
  return null;
}

export const getAllDistributorUsersCount = async (input: string, params: IDistributorFilterParams): Promise<number> => {
  try {
    const query = `select count(*) as count
      from distributors as d
      inner join users as u on u.id = d.user_id
      ${getWhereConditionsForDistributorsQuery(input, params)};`;
    const response = await getGenericQueryResponse(query);
    const data = response.data.data as { count: number }[];
    return data[0]?.count || 0;
  } catch (error) {
    console.error(error);
  }
  return 0;
}

export const getAllProducts = async (): Promise<IProduct[]> => {
  try {
    const query = `SELECT * FROM products;`;
    const response = await getGenericQueryResponse(query);
    const data = response.data.data as IProduct[];
    return data;
  } catch (error) {
    console.error(error);
  }
  return [];
}

export const getAllProductsCount = async (input: string): Promise<number> => {
  try {
    const query = `SELECT COUNT(*) AS count FROM products WHERE name LIKE '%${input}%';`;
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
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export const getDistributorIdByEmail = async (email: string) => {
  try {
    const query = `SELECT d.distributor_id 
    FROM distributors AS d 
    INNER JOIN users AS u ON u.id = d.user_id 
    WHERE u.email LIKE '${email}';`;
    const response = await getGenericQueryResponse(query);
    const data = response.data.data as { distributor_id: number }[];

    return data[0]?.distributor_id || 0;
  } catch (error) {
    console.error(error);
  }
  return 0;
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

  try {
    const createCodeSellResponse = await createCodeSell({
      admin_id,
      distributor_id,
    });
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
    generatedCodeSellsDetails.forEach(async (csd) => {
      const { code_sell_detail_id, count } = csd;
      const codes = await createCodesForDistributor(count);
      codes.forEach(async (code) => {
        await addCode({
          code_sell_detail_id,
          code
        });
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
    const query = `SELECT ps.product_sell_id, ps.seller_id, distributor_id, CAST(sell_at AS SIGNED) AS sell_at, p2.product_sell_id, 
    p1.product_id, count, price, p1.name AS product_name, u.email AS seller_email, ps.send_cost, ps.is_confirmed, ps.discount
    FROM product_sells AS ps 
    INNER JOIN products_by_product_sell AS p2 ON p2.product_sell_id = ps.product_sell_id 
    INNER JOIN products AS p1 ON p2.product_id = p1.product_id 
    INNER JOIN users AS u ON u.id = ps.seller_id
    WHERE ps.distributor_id = ${distributorId};`;
    const response = await getGenericQueryResponse(query);
    const result = response.data.data as IProductHistoryRecord[];

    console.log({ result });

    const productSellIds = [...new Set(result.map(ps => ps.product_sell_id))]

    const finalResult: IProductSellHistory[] =
      productSellIds.map((psId) => {
        const records = result.filter(ph => ph.product_sell_id === psId);
        const { product_sell_id, distributor_id, seller_email, sell_at, seller_id, is_confirmed, send_cost, discount } = records[0]!;
        const products: IProductSell[] = records.map((ph) => {
          const { product_sell_id, product_id, product_name, price, count } = ph;

          return {
            product_sell_id,
            product_id,
            product_name,
            count,
            price
          }
        });

        const sellAtWithFormat = new Date(parseInt(sell_at) * 1000);

        const productCount = products
          .map(p => p.count)
          .reduce((pv, cv) => { return pv + cv }, 0);

        // TODO: Calculo
        const productTotalAmount = (products
          .map((p) => { return { price: p.price, count: p.count } })
          .reduce((pv, cv) => { return pv + (cv.price * cv.count) }, 0))
          * (1 - (discount / 100))
          + send_cost;

        /*
        const total = (invoiceProducts.reduce((pv, cv) => {
            return pv + (cv.price * cv.count);
          }, 0) * (1 - (discount / 100))) + send_cost; // + send_cost
        */

        console.log({ is_confirmed });

        return {
          product_sell_id,
          distributor_id,
          sell_at: sellAtWithFormat.toJSON().slice(0, 10),
          seller_email,
          seller_id,
          products,
          product_count: productCount,
          product_total_amount: productTotalAmount,
          is_confirmed: `${is_confirmed}` === '1',
          send_cost,
          discount
        }
      });

    console.log({ finalResult });

    return finalResult;
  } catch (error) {
    console.error(error);
    return [];
  }
}

const checkIfProductInoviceExist = async (id: number) => {
  try {
    // Comprobar si existe
    const query = `SELECT COUNT(*) AS count FROM product_sells WHERE product_sell_id = ${id};`;
    const response = await getGenericQueryResponse(query);
    const data = response.data.data;
  } catch (error) {
    console.error(error);
  }
}

export const updateProductInvoice = async (productInvoice: IProductInvoice): Promise<boolean> => {
  try {
    const { distributorId, sellerId, products, date, is_confirmed, send_cost, product_sell_id, discount } = productInvoice;
    const [year, month, day] = date.split("-").map((value) => parseInt(value) || 1);
    const sellAt = Math.floor(new Date(year!, month! - 1, day!).getTime() / 1000);
    const updateQuery = `UPDATE product_sells 
      SET seller_id = ${sellerId}, 
      distributor_id = ${distributorId}, 
      sell_at = ${sellAt}, 
      send_cost = ${send_cost},
      is_confirmed = ${is_confirmed},
      discount = ${discount}
      WHERE product_sell_id = ${product_sell_id};`;

    const updateResponse = await postGenericQueryResponse(updateQuery);
    console.log({ updateResponse });

    // Actualizar listado de productos
    const removeQuery = `DELETE FROM products_by_product_sell WHERE product_sell_id = ${product_sell_id};`;
    const deleteResponse = await postGenericQueryResponse(removeQuery);

    let insertQuery = 'INSERT INTO products_by_product_sell (product_sell_id, product_id, count, price) VALUES ';

    const realProducts = products.filter(p => p.count > 0);

    const values: string[] = [];
    for (let index = 0; index < realProducts.length; index++) {
      const product = realProducts[index]!;
      const { productId, count, price } = product;
      const record = `(${product_sell_id}, ${productId}, ${count}, ${price})`;
      values.push(record);
    }

    insertQuery += values.join(', ') + ';';

    const insertResponse = await postGenericQueryResponse(insertQuery);
    console.log({ insertResponse });

    return true;
  } catch (error) {
    console.error(error);
  }
  return false;
}

export const createProductInvoice = async (productInvoice: IProductInvoice): Promise<boolean> => {
  try {
    console.log({ productInvoice });
    const { distributorId, sellerId, products, date, is_confirmed, send_cost, discount } = productInvoice;
    const [year, month, day] = date.split("-").map((value) => parseInt(value) || 1);
    const sellAt = Math.floor(new Date(year!, month! - 1, day!).getTime() / 1000);
    const createProductSellQuery = `INSERT INTO product_sells 
      (seller_id, distributor_id, sell_at, is_confirmed, send_cost, discount) 
      VALUES (${sellerId}, ${distributorId}, ${sellAt}, ${is_confirmed}, ${send_cost}, ${discount})`;

    const createProductSellResponse = await postGenericQueryResponse(createProductSellQuery);
    const productSellId = createProductSellResponse.data.data.insertId;

    let createProductsBySellQuery = 'INSERT INTO products_by_product_sell (product_sell_id, product_id, count, price) VALUES ';

    const realProducts = products.filter(p => p.count > 0);

    const values: string[] = [];
    for (let index = 0; index < realProducts.length; index++) {
      const product = realProducts[index]!;
      const { productId, count, price } = product;
      const record = `(${productSellId}, ${productId}, ${count}, ${price})`;
      values.push(record);
    }

    createProductsBySellQuery += values.join(', ') + ';';
    const addProductsOfSellResponse = await postGenericQueryResponse(createProductsBySellQuery);
    console.log({ addProductsOfSellResponse });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export const createProduct = async (product: IProduct): Promise<boolean> => {
  try {
    const { name, default_price } = product;

    const createProductQuery = `INSERT INTO products (name, default_price) VALUES ('${name}', ${default_price});`;

    const createProductResponse = await postGenericQueryResponse(createProductQuery);
    const productId = createProductResponse.data.data.insertId;

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export const updateProduct = async (product: IProduct): Promise<boolean> => {
  try {
    const { product_id, name, default_price } = product;

    const updateProductQuery = `UPDATE products SET
    name = '${name}',
    default_price = ${default_price},
    WHERE product_id = ${product_id};`;

    const updateProductResponse = await postGenericQueryResponse(updateProductQuery);
    const productId = updateProductResponse.data.data.insertId;

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export const createSeller = async (seller: ISeller): Promise<boolean> => {
  try {
    const { name, last_name, email, phone_number, photo_url, postal_code } = seller;

    const createSellerQuery = `INSERT INTO sellers (name, last_name, email, phone_number, photo_url, postal_code) 
    VALUES ('${name}', '${last_name}', '${email}', '${phone_number}', '${photo_url}', '${postal_code}');`;

    const createSellerResponse = await postGenericQueryResponse(createSellerQuery);
    const sellerId = createSellerResponse.data.data.insertId;

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export const updateSeller = async (seller: ISeller): Promise<boolean> => {
  try {
    const { seller_id, name, last_name, email, phone_number, photo_url, postal_code } = seller;

    const createSellerQuery = `UPDATE sellers SET 
    name = '${name}',
    last_name = '${last_name}',
    email = '${email}',
    phone_number = '${phone_number}',
    photo_url = '${photo_url}',
    postal_code = '${postal_code}'
    WHERE seller_id = ${seller_id};`;

    const updateSellerResponse = await postGenericQueryResponse(createSellerQuery);
    const sellerId = updateSellerResponse.data.data.insertId;
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export const updateDistributor = async (distributor: IDistributor): Promise<boolean> => {
  try {
    const { distributor_id, postal_code, user_id, email, phone_number, origin_state } = distributor;

    const updateDistributorQuery = `UPDATE distributors SET 
    postal_code = '${postal_code}'
    WHERE distributor_id = ${distributor_id};`;

    const updateDistributorResponse = await postGenericQueryResponse(updateDistributorQuery);
    const distributorId = updateDistributorResponse.data.data.insertId;

    const updateUserQuery = `UPDATE users SET
    email = '${email}',
    phone_number = '${phone_number}',
    origin_state = '${origin_state}'
    WHERE id = ${user_id}`;
    const updateUserResponse = await postGenericQueryResponse(updateUserQuery);

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export const getAllSellers = async () => {
  try {
    const query = `SELECT seller_id, email FROM sellers;`;
    const response = await getGenericQueryResponse(query);
    return response.data.data as { email: string, seller_id: number }[];
  } catch (error) {
    return []
  }
}

export const getSellersList = async (offset: number, input: string) => {
  try {
    const query = `SELECT * FROM sellers AS s 
      WHERE CONCAT(s.name, ' ', s.last_name) LIKE '%${input}%'
      OR s.email LIKE '%${input}%'
      order by seller_id
      limit 100 offset ${offset};`;
    const response = await getGenericQueryResponse(query);
    return response.data.data as ISeller[];
  } catch (error) {
    return []
  }
}

export const getSellersCount = async (input: string) => {
  try {
    const query = `SELECT COUNT(*) AS count FROM sellers AS s 
      WHERE CONCAT(s.name, ' ', s.last_name) LIKE '%${input}%'
      OR s.email LIKE '%${input}%'`;
    const response = await getGenericQueryResponse(query);
    const data = response.data.data as { count: number }[];
    return data[0]?.count || 0;
  } catch (error) {
    return 0;
  }
}

const generateSequence = (n: number) =>
  Array(n)
    .fill(0)
    .map((_, i) => i + 1);

export const getUserAccessRoles = async (userId: number): Promise<IAdminDistributorsRole> => {
  try {
    const query = `SELECT * FROM admin_distributors AS ad WHERE ad.user_id = ${userId};`;
    const response = await getGenericQueryResponse(query);

    if (response.data.data.length === 0) {
      throw new Error('No existe este usuario en la tabla de "admin_distributors".');
    }
    const data = response.data.data[0] as IAdminDistributorsRole;
    return data;
  } catch (error) {
    console.error(error);
    return {
      user_id: userId,
      admin_distributor_id: 0,
      create: 0,
      download: 0,
      edit: 0,
      view: 0,
      abm_products: 0,
      abm_sellers: 0,
      create_access_invoices: 0,
      create_products_invoices: 0,
    };
  }
}

export const getIsSuperAdmin = async (email: string) => {
  try {
    const query = `SELECT u.role FROM users AS u WHERE u.email LIKE '${email}';`;
    const response = await getGenericQueryResponse(query);
    const data = response.data.data[0] as { role: string } | undefined;
    if (data === undefined) {
      return false;
    }
    return data.role === 'superAdmin';
  } catch (error) {
    console.error(error);
    return false;
  }
}

export const getAllPostalCodesFromDistributors = async () => {
  try {
    const query = `SELECT DISTINCT postal_code FROM distributors;`;
    const response = await getGenericQueryResponse(query);
    const data = response.data.data as { postal_code: string }[];
    return data.map(row => row.postal_code).filter(ps => ps !== '');
  } catch (error) {
    console.error(error);
  }
  return [];
}
