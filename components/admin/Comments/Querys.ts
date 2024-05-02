export const generateCommentsByCourseIdQuery = (
  courseId: number | undefined,
  offset: number,
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
  courseId: number | undefined,
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

type Preferency = 'all' | 'with-response' | 'without-response';

export interface CommentStructure {
  comment_id: number;
  comment_comment: string;
  comment_created_at: string;
  comment_user_id: number;
  lessons_id: number;
  comment_course_id: number;
  comment_answer_id: number;
  comment_answer_comment: string;
  comment_answer_created_at: string;
  comments_id: number;
  comment_answer_user_id: number;
  comment_answer_course_id: number;
  comment_answer_comment_id: number;
  comment_answer_comment_comment: number;
  comment_answer_comment_user_id: number;
  comment_answer_comment_created_at: string;
  lesson_title: string;
  lesson_number: number;
  season_number: number;
  course_title: string;
  season_title: string;
}

export const generateCountAllComments = (
  courseId: number,
  courseIds: number[],
  isSuperAdmin: boolean,
) => {
  const condition1 =
    !isSuperAdmin && courseIds.length > 0
      ? `course_id IN (${courseIds.join(',')})`
      : '';
  const condition2 = courseId !== -1 ? `course_id = ${courseId}` : '';
  const conditions = [condition1, condition2].filter((c) => c.length > 0);
  const where =
    conditions.length > 0 ? ` WHERE ${conditions.join(' AND ')}` : '';
  const query = `SELECT COUNT(*) as count FROM comments${where};`;
  return query;
};

export const generateGetAllComments = (
  preferency: Preferency,
  courseId: number,
  offset: number,
  courseIds: number[],
  isSuperAdmin: boolean,
) => {
  let responseCondition = '';
  if (preferency === 'with-response') {
    responseCondition = 'comment_answer_id IS NOT NULL';
  } else if (preferency === 'without-response') {
    responseCondition = 'comment_answer_id IS NULL';
  } else if (preferency === 'all') {
  }

  const condition1 = courseId !== -1 ? `course_id = ${courseId}` : '';
  const condition2 =
    !isSuperAdmin && courseIds.length > 0
      ? `course_id in (${courseIds.join(',')})`
      : '';
  const conditionArray = [condition1, condition2].filter((c) => c.length > 0);
  const where = `WHERE ${conditionArray.join(' and ')}`;
  const haveConditions = conditionArray.length > 0;

  const query = `SELECT all_comments_and_answers.*,
    l.title  AS lesson_title,
    l.number AS lesson_number,
    s.season AS season_number,
    c.title  AS course_title,
    s.name   AS season_title
    FROM (
        SELECT comments_2.id as 'comment_id', 
        comments_2.comment as 'comment_comment', 
        comments_2.created_at as 'comment_created_at',
        comments_2.user_id as 'comment_user_id',
        comments_2.lessons_id,
        comments_2.course_id as 'comment_course_id',
        comment_answers.id as 'comment_answer_id',
        comment_answers.comment as 'comment_answer_comment',
      comment_answers.created_at as 'comment_answer_created_at',
      comment_answers.comments_id,
      comment_answers.user_id as 'comment_answer_user_id',
      comment_answers.course_id as 'comment_answer_course_id',
      comment_answer_comment.id as 'comment_answer_comment_id',
      comment_answer_comment.comment as 'comment_answer_comment_comment',
      comment_answer_comment.user_id as 'comment_answer_comment_user_id',
      comment_answer_comment.created_at as 'comment_answer_comment_created_at'
        FROM (
          SELECT * FROM comments 
          ${haveConditions ? where : ''}
          ORDER BY created_at DESC
          LIMIT 100 OFFSET ${offset}
        ) AS comments_2
        LEFT JOIN comment_answers ON comments_2.id = comment_answers.comments_id 
        LEFT JOIN comment_answer_comment ON comment_answers.id = comment_answer_comment.comment_answers_id 
    
        UNION
        
        SELECT comments_2.id as 'comment_id', 
        comments_2.comment as 'comment_comment', 
        comments_2.created_at as 'comment_created_at',
        comments_2.user_id as 'comment_user_id',
        comments_2.lessons_id,
        comments_2.course_id as 'comment_course_id',
        comment_answers.id as 'comment_answer_id',
        comment_answers.comment as 'comment_answer_comment',
      comment_answers.created_at as 'comment_answer_created_at',
      comment_answers.comments_id,
      comment_answers.user_id as 'comment_answer_user_id',
      comment_answers.course_id as 'comment_answer_course_id',
      comment_answer_comment.id as 'comment_answer_comment_id',
      comment_answer_comment.comment as 'comment_answer_comment_comment',
      comment_answer_comment.user_id as 'comment_answer_comment_user_id',
      comment_answer_comment.created_at as 'comment_answer_comment_created_at'
        FROM (
          SELECT * FROM comments 
          ${haveConditions ? where : ''}
          ORDER BY created_at DESC
          LIMIT 100 OFFSET ${offset}
        ) AS comments_2
        RIGHT JOIN comment_answers ON comments_2.id = comment_answers.comments_id 
        RIGHT JOIN comment_answer_comment ON comment_answers.id = comment_answer_comment.comment_answers_id
    ) AS all_comments_and_answers
    INNER JOIN lessons AS l ON l.id = all_comments_and_answers.lessons_id
    INNER JOIN courses AS c ON c.id = all_comments_and_answers.comment_course_id
    INNER JOIN seasons AS s ON s.id = l.seasons_id
    ORDER BY comment_created_at DESC, comment_id, comment_answer_created_at desc, comment_answer_id;`;
  return query;
};
