export const generateGetInvoicesQuery = (
  email: string,
  method: string | undefined,
  offset: number
) => {
  const emailCond = email ? `email LIKE '${email}%'` : '';
  const methodCond = method ? `method LIKE '${method}'` : '';
  const whereConditions = [emailCond, methodCond].filter(c => c !== '');
  const where =
    whereConditions.length === 0
      ? ''
      : `WHERE ${whereConditions.join(' AND ')}`;
  const orderBy = !email
    ? 'ORDER BY paid_at DESC'
    : 'ORDER BY email ASC, paid_at DESC';

  const query = `SELECT invoices.*, name, email
    FROM invoices INNER JOIN users ON users.id = invoices.user_id
    ${where}
    ${orderBy}
    LIMIT 100 offset ${offset};`;
  return query;
};

export const generateGetInvoicesCountQuery = (
  email: string,
  method: string | undefined
) => {
  const emailCond = email ? `email LIKE '${email}%'` : '';
  const methodCond = method ? `method LIKE '${method}'` : '';
  const whereConditions = [emailCond, methodCond].filter(c => c !== '');
  const where =
    whereConditions.length === 0
      ? ''
      : `WHERE ${whereConditions.join(' AND ')}`;
  const query = `SELECT count(*) as count
    FROM invoices INNER JOIN users ON users.id = invoices.user_id
    ${where}`;
  return query;
};

export const getDistinctMethodsOfInvoice = () => {
  return 'SELECT DISTINCT method FROM invoices;';
};
