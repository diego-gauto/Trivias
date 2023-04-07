import React, { useEffect, useState } from 'react'
import { BsTriangle } from 'react-icons/bs';
import ReactPlayer from 'react-player';
import { Container, CoursesContain, PurpleButton, SubText, Title, TransparentButton, Gradient, GonvarLoader } from './Courses.styled';
import Sliders from './Modules/Sliders';
import { getUserApi } from "../api/users";
import { getCoursesApi } from "../api/lessons";
import { ICourses } from './ICourses';
const Courses = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [courses, setCourses] = useState<any>([]);
  const [userData, setUserData] = useState<any>(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const block = false;
  let courseSections = [
    "continue-watching",
    "my-courses",
    "all-courses",
    "product-courses",
    "monthly-courses"
  ]
  window.addEventListener("resize", () => {
    setInnerWidth(window.innerWidth <= 400 ? 399 : window.innerWidth);
  });
  const coursesAll = () => {
    getCoursesApi().then((res) => {
      setCourses(res.data.data);
      setLoading(true);
    })
  }
  useEffect(() => {
    if (localStorage.getItem("email")) {
      getUserApi(localStorage.getItem("email")).then((res) => {
        setLoggedIn(true);
        setUserData(res);
        coursesAll();
      })
    } else {
      coursesAll();
    }
  }, [])

  // if (!loading) {
  //   return (
  //     <GonvarLoader>
  //       <div className="loader-image">
  //         <div className="loader-contain" />
  //       </div>
  //     </GonvarLoader>
  //   )
  // }
  return (
    <CoursesContain>
      {/* VIDEO  */}
      {
        block &&
        <Container>
          <div className={loading ? "skeleton-product" : ""}>
            <div className="image-container">
              <div className="video-container">
                {/* <ReactPlayer
                url={ }
                className='absolute'
                playing={true}
                muted={true}
                loop={true}
                width='100%'
                height='100%'
              /> */}
              </div>
            </div>
            <div className="text-container">
              <div className="grey-field">
                <div className="top">
                  <img style={{ margin: 0 }} src="../images/purchase/logo.png" alt="" />
                  <p>Gonvar+</p>
                </div>
                <Title>
                  {/* {historyCourse.courseTittle} */}
                </Title>
              </div>
              <div className="grey-field">
                <SubText>
                  {/* de {historyCourse.courseProfessor[0]?.name} */}
                </SubText>
              </div>
              <div className="button-contain">
                <div className="grey-field" style={{ maxWidth: "fit-content" }}>
                  <PurpleButton>
                    <BsTriangle />
                    Reproducir
                  </PurpleButton>
                </div>
                <div className="grey-field" style={{ maxWidth: "fit-content" }}>
                  <TransparentButton >
                    Más información
                  </TransparentButton>
                </div>
              </div>
            </div>
            <Gradient></Gradient>
          </div>
        </Container>
      }

      {/* SLIDERS */}
      <div className="module-contain">
        {
          courseSections.map((slideType: string, index: number) => {
            return (
              <Sliders
                slideType={slideType}
                slideNumber={index}
                innerWidth={innerWidth}
                allCourses={courses}
                user={userData}
                key={"Course-slider-" + index}
              />
            )
          })
        }
      </div>
    </CoursesContain>
  )
}
export default Courses;