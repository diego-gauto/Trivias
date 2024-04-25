export const generateMemberhsipsQuery = (
  sd: string,
  fd: string,
  levels: string
) => {
  const query = `SELECT users.id,
        users.name,
        users.last_name,
        users.email,
        users.phone_number,
        memberships.final_date,
        memberships.level,
        memberships.method
    FROM   users
        INNER JOIN memberships
                ON users.id = memberships.user_id
    WHERE  from_unixtime(memberships.final_date) BETWEEN '${sd}' AND '${fd} 23:59:59'
    AND memberships.level IN (${levels})
    ORDER BY final_date;`;
  return query;
};
