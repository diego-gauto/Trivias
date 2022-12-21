import React, { useEffect, useState } from 'react'
import { number } from 'yup';
import { Text03 } from '../../../../../components/Home/Module4_Carousel/SlideModule/SlideModule.styled';
import CourseProgress from '../Progress/CourseProgress';
import { MainContainer, Title, UploadIcon, Container, Episode, Divider, CoursesContainer, CloseButton, SeasonContainer } from './Courses.styled';
import EveryCourse from './Lessons/EveryCourse';

const Courses = ({ id, course, data, userId, season, lesson, menu, handleClick }: any) => {

  const [selected, setSelected] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);


  useEffect(() => {
    let temp_selected: any = [];
    course?.seasons.forEach((element: any) => {
      temp_selected.push(false)
    });
    setSelected(temp_selected);

    let viewed = 0;
    course.lessons.forEach((element: any) => {
      if (element.users.includes(userId)) {
        viewed++;
      }
    });
    setCount(viewed)

  }, [course])

  useEffect(() => {
    setOpen(menu)
  }, [menu])

  const toggleHandler = (index: any) => {
    let temp = [...selected]
    temp[index] = !temp[index];
    setSelected(temp)
  }


  return (
    <MainContainer open={open}>
      {/* <CloseButton onClick={() => { setOpen(!open); handleClick(false) }}>
        x
      </CloseButton> */}
      {/* <CourseProgress title={course?.courseTittle} season={index} lesson={lesson} course={course} userId={userId} refresh={toggleHandler} /> */}
      <div className='course-info'>
        <p className='title'>{course?.courseTittle}</p>
        <p>Un curso de <span>{course?.courseProfessor[0].name}</span></p>
        <div className='level-container'>
          {(course?.courseDifficulty == "Muy Fácil" || course?.courseDifficulty == "Fácil") && <img style={{ width: "auto" }} src="../images/Landing/blue.png" alt="" />}
          {(course?.courseDifficulty == "Intermedio") && <img style={{ width: "auto" }} src="../images/Landing/green.png" alt="" />}
          {(course?.courseDifficulty == "Avanzado" || course?.courseDifficulty == "Máster") && <img style={{ width: "auto" }} src="../images/Landing/red.png" alt="" />}
          <Text03 style={{ padding: 0 }} level={course?.courseDifficulty}><span>{course?.courseDifficulty}</span></Text03>
        </div>
      </div>
      <div className='course-progress'>
        <p className='title'>Tu progreso <br />
          <b>{count} de {course?.lessons.length}</b> <span>lecciones.</span>
        </p>
        <div className='certificate-label'>
          <p>Acaba el curso <br />
            para obtener <br />
            tu certificado.</p>
        </div>
      </div>
      {course?.seasons.map((season: any, index: number) => {
        return (
          <SeasonContainer key={"course seasons " + index}>
            <Container onClick={() => { toggleHandler(index) }}>
              <Title>
                Módulo {index + 1}
                <UploadIcon active={selected[index]} />
              </Title>
              <Episode>
                {season.lessons.length > 1 ? `${season.lessons.length} Lecciones` : `${season.lessons.length} Lección`}
              </Episode>
            </Container>
            <Divider />
            <CoursesContainer active={selected[index]} onClick={() => {
              setOpen(!open); handleClick(false)
            }}>
              <EveryCourse id={id} season={index} lessons={season.lessons} data={data} userId={userId} course={course} />
            </CoursesContainer>
          </SeasonContainer>
        )
      })}

    </MainContainer>
  )
}
export default Courses;