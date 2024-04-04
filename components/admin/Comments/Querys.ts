export const generateCommentsByCourseIdQuery = (
  courseId: number | undefined,
  offset: number
) => {
  const where = `WHERE  s.course_id = ${courseId}`;
  return `SELECT co.*,
      l.title  AS lesson_title,
      l.number AS lesson_number,
      s.season AS season_number,
      c.title  AS course_title,
      s.name   AS season_title
    FROM comments AS co
      INNER JOIN lessons AS l
        ON l.id = co.lessons_id
      INNER JOIN courses AS c
        ON c.id = co.course_id
      INNER JOIN seasons AS s
        ON s.id = l.seasons_id
    ${courseId ? where : ''}
    ORDER  BY c.id ASC, co.created_at DESC
    LIMIT  50 offset ${offset};`
    .replace(/\n/g, '')
    .replace(/\s+/g, ' ');
};

export const generateCommentsByCourseIdCountQuery = (
  courseId: number | undefined
) => {
  const where = `WHERE course_id = ${courseId}`;
  return `SELECT count(*) as count FROM comments ${courseId ? where : ''};`;
};

export const generateAnswersByCommentIdQuery = (commentId: number) => {
  const query = `SELECT * FROM comment_answers WHERE comments_id = ${commentId} ORDER BY created_at DESC;`;
  return query;
};

export const generateAnswersOfAnswersByAnswerIdQuery = (answerId: number) => {
  const query = `SELECT * FROM comment_answer_comment WHERE comment_answers_id = ${answerId} ORDER BY created_at DESC;`;
  return query;
};

export const generateCoursesQuery = () => {
  const query = `select id, title from courses;`;
  return query;
};

export const generateGetAdminUsersQuery = () => {
  const query = `select user_id from admin_users;`;
  return query;
};
