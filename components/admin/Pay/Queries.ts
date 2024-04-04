export const generateGetInvoicesQuery = (email: string, offset: number) => {
  const where = `WHERE email LIKE '${email}%'`;
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

export const generateGetInvoicesCountQuery = (email: string) => {
  const query = `SELECT count(*) as count
    FROM invoices INNER JOIN users ON users.id = invoices.user_id
    WHERE email LIKE '${email}%'`;
  return query;
};
