import React, { useEffect, useState } from 'react'
import { number } from 'yup';
import CourseProgress from '../Progress/CourseProgress';
import { MainContainer, Title, UploadIcon, Container, Episode, Divider, CoursesContainer, CloseButton } from './Courses.styled';
import EveryCourse from './Lessons/EveryCourse';

const Courses = ({ id, course, data, userId, season, lesson, menu, handleClick }: any) => {

  const [selected, setSelected] = useState<any>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let temp_selected: any = [];
    course?.seasons.forEach((element: any) => {
      temp_selected.push(false)
    });
    setSelected(temp_selected)
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
      <CloseButton onClick={() => { setOpen(!open); handleClick(false) }}>
        x
      </CloseButton>
      <CourseProgress title={course?.courseTittle} season={season} lesson={lesson} course={course} userId={userId} />
      {course?.seasons.map((season: any, index: any) => {
        return (
          <>
            <Container onClick={() => { toggleHandler(index) }}>
              <Title>
                Temporada {index + 1}
                <UploadIcon active={selected[index]} />
              </Title>
              <Episode>
                {season.lessons.length} episodios
              </Episode>
            </Container>
            <Divider />
            <CoursesContainer active={selected[index]}>
              <EveryCourse id={id} season={index} lessons={season.lessons} data={data} userId={userId} />
            </CoursesContainer>
          </>
        )
      })}

    </MainContainer>
  )
}
export default Courses;