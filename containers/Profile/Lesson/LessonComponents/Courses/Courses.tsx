import router from 'next/router';
import React, { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive';
import { Text03 } from '../../../../../components/Home/Module4_Carousel/SlideModule/SlideModule.styled';
import CourseProgress from '../Progress/CourseProgress';
import { MainContainer, Title, UploadIcon, Container, Episode, Divider, CoursesContainer, CloseButton, SeasonContainer } from './Courses.styled';
import EveryCourse from './Lessons/EveryCourse';

const Courses = ({ id, course, data, userData, season, lesson, menu, handleClick }: any) => {

  const [selected, setSelected] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);
  const responsive1124 = useMediaQuery({ query: "(max-width: 1124px)" });
  const [certficate, setCertificate] = useState<any>(false);
  useEffect(() => {
    let temp_selected: any = [];
    course?.seasons.forEach((element: any) => {
      temp_selected.push(false)
    });
    setSelected(temp_selected);

    let viewed = 0;
    course.lessons.forEach((element: any) => {
      if (element.users.includes(userData?.id)) {
        viewed++;
      }
    });
    if (course.lessons.length == viewed) {
      setCertificate(true)
    }
    setCount(viewed)

  }, [course, data])

  useEffect(() => {
    setOpen(menu)
  }, [menu])

  const toggleHandler = (index: any) => {
    let temp = [...selected]
    temp[index] = !temp[index];
    setSelected(temp)
  }
  const goTo = () => {
    router.push({
      pathname: `/Certificates`,
      query: {
        name: userData.name,
        title: course.courseTittle,
        professor: course.courseProfessor[0].name,
        id: userData.uid,
        color: course.courseCertificateColor,
        courseId: course.id,
        teacherSignature: "",
      }
    });
  }


  return (
    <MainContainer open={open}>
      <div className='course-info'>
        <p className='title'>{course?.courseTittle}</p>
        <p>Un curso de <span>{course?.courseProfessor[0]?.name}</span></p>
        <div className='level-container'>
          {(course?.courseDifficulty == "Muy Fácil" || course?.courseDifficulty == "Fácil") && <img style={{ width: "auto" }} src="../images/Landing/blue.png" alt="" />}
          {(course?.courseDifficulty == "Intermedio") && <img style={{ width: "auto" }} src="../images/Landing/green.png" alt="" />}
          {(course?.courseDifficulty == "Avanzado" || course?.courseDifficulty == "Máster") && <img style={{ width: "auto" }} src="../images/Landing/red.png" alt="" />}
          <Text03 style={{ padding: 0 }} level={course?.courseDifficulty}><span>{course?.courseDifficulty}</span></Text03>
        </div>
      </div>
      {(certficate && !responsive1124) && <div className="certificate-container">
        <button onClick={() => { goTo() }}>
          <p>Obtener certificado</p>
        </button>
      </div>}
      <div className='course-progress'>
        <p className='title'>Tu progreso <br />
          <b>{count} de {course?.lessons.length}</b> <span>lecciones.</span>
        </p>
        <div className='certificate-box'>
          <div className='half'></div>
          <div className='certificate-label'>
            <p>Acaba el curso <br />
              para obtener <br />
              tu certificado.</p>
          </div>
        </div>
      </div>
      {(certficate && responsive1124) && <div className="certificate-container">
        <button onClick={() => { goTo() }}>
          <p>Obtener certificado</p>
        </button>
      </div>}
      <div className='certificate-responsive'>
        <p>Acaba el curso para obtener tu certificado.</p>
      </div>
      {course?.seasons.map((season: any, index: number) => {
        return (
          <SeasonContainer key={"course seasons " + index}>
            <Container onClick={() => { toggleHandler(index) }} active={selected[index]}>
              <div className='module'>
                {selected[index] && <CourseProgress title={course?.courseTittle} season={index} lesson={lesson} course={course} userId={userData?.id} refresh={toggleHandler} />}
                <div>
                  <p className='title'>Módulo {index + 1}</p>
                  <Episode>
                    {season.lessons.length > 1 ? `${season.lessons.length} Lecciones` : `${season.lessons.length} Lección`}
                  </Episode>
                </div>
              </div>
              <UploadIcon active={selected[index]} />
            </Container>
            <CoursesContainer active={selected[index]} onClick={() => {
              setOpen(!open); handleClick(false)
            }}>
              <EveryCourse id={id} season={index} lessons={season.lessons} data={data} userId={userData?.id} course={course} />
            </CoursesContainer>
          </SeasonContainer>
        )
      })}
      <div className='bg'></div>
    </MainContainer>
  )
}
export default Courses;