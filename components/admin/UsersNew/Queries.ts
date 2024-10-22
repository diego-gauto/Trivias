export const generateCoursesWithLessonsData = () => {
  // La cantidad de lecciones que tienen todos los cursos
  const query = `select c.id as course_id, c.title, c.published, count(l.id) as lessons_count
    from lessons as l
    inner join seasons as s on s.id = l.seasons_id
    inner join courses as c on c.id = s.course_id
    group by c.id, c.title, c.published
    order by course_id;`;
  return query;
};

export const generateCoursesViewedByUser = (userId: number) => {
  // Las lecciones que ha visto, junto con sus cursos
  const query = `select distinct c.id as course_id, s.id as season_id, l.id as lesson_id
    from lesson_users as lu
    inner join lessons as l on lu.lessons_id  = l.id
    inner join seasons as s on s.id = l.seasons_id
    inner join courses as c on c.id = s.course_id
    where user_id = ${userId}
    order by course_id, season_id, lesson_id;`;
  return query;
};

export const generateFinishedCoursesByUser = (userId: number) => {
  // Los cursos "que ha visto (quizas los que haya terminado)"
  const query = `select id, user_id, course_id, final_date from user_courses where user_id = ${userId};`;
  return query;
};
