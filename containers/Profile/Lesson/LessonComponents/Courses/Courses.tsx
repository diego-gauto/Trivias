import router from 'next/router';
import React, { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive';
import { addUserCertificateApi, getUserCertificateApi } from '../../../../../components/api/lessons';
import { Text03 } from '../../../../../components/Home/Module4_Carousel/SlideModule/SlideModule.styled';
import CourseProgress from '../Progress/CourseProgress';
import { MainContainer, Title, UploadIcon, Container, Episode, Divider, CoursesContainer, CloseButton, SeasonContainer } from './Courses.styled';
import EveryCourse from './Lessons/EveryCourse';

const Courses = ({ course, data, userData, season, lesson, menu, handleClick }: any) => {

  const [selected, setSelected] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);
  const [seasons, setSeasons] = useState<any>([]);
  const responsive1124 = useMediaQuery({ query: "(max-width: 1124px)" });
  const [certficate, setCertificate] = useState<any>(false);
  const [temp, setTemp] = useState(data);

  useEffect(() => {
    let viewed = 0;
    course.lessons.forEach((element: any) => {
      if (element.users.includes(userData?.user_id)) {
        viewed++;
      }
    });

    if (course.lessons.length == viewed) {
      let ids = {
        userId: userData.user_id,
        courseId: course.id
      }
      let tempCertificate = {
        ...ids,
        folio: `${ids.courseId}-${ids.userId}`
      }
      getUserCertificateApi(ids).then((res) => {
        if (res.data.data.length === 0) {
          addUserCertificateApi(tempCertificate)
        }
      })
      setCertificate(true)
    }
    setCount(viewed)

  }, [data])

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
        title: course.title,
        professor: course.professors[0].name,
        id: userData.user_id,
        color: course.certificate_color,
        courseId: course.id,
        teacherSignature: course.professors[0].sign,
      }
    });
  }

  useEffect(() => {
    let temp_selected: any = [];
    course.seasons.forEach((element: any) => {
      temp_selected.push(true)
    });
    setSelected(temp_selected);
  }, [])

  return (
    <MainContainer open={open}>
      <div className='course-info'>
        <p className='title'>{course?.title}</p>
        <p>Un curso de <span>{course?.professors[0]?.name}</span></p>
        <div className='level-container'>
          {(course?.dificulty == "Muy Fácil" || course?.dificulty == "Fácil") && <img style={{ width: "auto" }} src="../images/Landing/blue.png" alt="" />}
          {(course?.dificulty == "Intermedio") && <img style={{ width: "auto" }} src="../images/Landing/green.png" alt="" />}
          {(course?.dificulty == "Avanzado" || course?.dificulty == "Máster") && <img style={{ width: "auto" }} src="../images/Landing/red.png" alt="" />}
          <Text03 style={{ padding: 0 }} level={course?.dificulty}><span>{course?.dificulty}</span></Text03>
        </div>
      </div>
      {(certficate && !responsive1124) && <div className="certificate-container">
        <button onClick={() => { goTo() }}>
          <p>Obtener certificado</p>
        </button>
      </div>}
      <div className='course-progress'>
        <p className='title'>Tu progreso <br />
          <b>{count} de {course.lessons.length}</b> <span>lecciones.</span>
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
                {selected[index] && <CourseProgress data={temp} title={course?.title} season={index} lesson={lesson} course={course} userId={userData?.user_id} refresh={toggleHandler} />}
                <div>
                  <p className='title'>{seasons[index]?.name ? seasons[index]?.name : `Módulo ${index + 1}`}</p>
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
              <EveryCourse season={index} lessons={season.lessons} data={data} userId={userData?.user_id} course={course} />
            </CoursesContainer>
          </SeasonContainer>
        )
      })}
      <div className='bg'></div>
    </MainContainer>
  )
}
export default Courses;