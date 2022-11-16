import React, { useEffect, useState } from 'react'
import { number } from 'yup';
import CourseProgress from '../Progress/CourseProgress';
import { MainContainer, Title, UploadIcon, Container, Episode, Divider, CoursesContainer, CloseButton, SeasonContainer } from './Courses.styled';
import EveryCourse from './Lessons/EveryCourse';

const Courses = ({ id, course, data, userId, season, lesson, menu, handleClick }: any) => {

  const [selected, setSelected] = useState<any>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let temp_selected: any = [];
    course?.seasons.forEach((element: any) => {
      temp_selected.push(true)
    });
    setSelected(temp_selected)
  }, [course])

  useEffect(() => {
    setOpen(menu)
    console.log(menu);

  }, [menu])

  const toggleHandler = (index: any) => {
    let temp = [...selected]
    temp[index] = !temp[index];
    setSelected(temp)
  }


  return (
    <MainContainer open={open}>
      <CloseButton onClick={() => { setOpen(!open); handleClick(false) }}>
        x
      </CloseButton>
      <CourseProgress title={course?.courseTittle} season={season} lesson={lesson} course={course} userId={userId} refresh={toggleHandler} />
      {course?.seasons.map((season: any, index: number) => {
        return (
          <SeasonContainer key={"course seasons " + index}>
            <Container onClick={() => { toggleHandler(index) }}>
              <Title>
                Temporada {index + 1}
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