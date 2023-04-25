import React, { useEffect, useState } from 'react'
import { BsTriangle } from 'react-icons/bs';
import ReactPlayer from 'react-player';
import { Container, CoursesContain, PurpleButton, SubText, Title, TransparentButton, Gradient, GonvarLoader } from './Courses.styled';
import Sliders from './Modules/Sliders';
import { getUserApi } from "../api/users";
import { getAllCourseDataApi, getCoursesApi } from "../api/lessons";
import { ICourses, ILessons, ISeasons } from './ICourses';
import CourseModal from '../CourseModal/CourseModal';
import { useRouter } from 'next/router';
const Courses = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [courses, setCourses] = useState<any>([]);
  const [userData, setUserData] = useState<any>(null);
  const [videoCourse, setVideoCourse] = useState<any>([]);
  const [courseForModal, setCourseForModal] = useState<any>({});
  const [loggedIn, setLoggedIn] = useState(false);
  let today = new Date().getTime() / 1000;
  const [seasonIndex, setSeasonIndex] = useState<number>(0);
  const [lessonIndex, setLessonIndex] = useState<number>(0);

  const [show, setShow] = useState<boolean>(false);
  const router = useRouter();
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
  const coursesAll = (user: any) => {
    getCoursesApi().then((res) => {
      setCourses(res);
      let courseforVideo: any = JSON.parse(JSON.stringify(res));
      let courseForModal: any = [];
      if (user && user.user_history.length > 0) {
        courseForModal = res.filter((course: ICourses) => {
          return course.id === user.user_history[0].course_id
        })
        courseforVideo = courseforVideo.filter((course: ICourses, index: number) => {
          return course.id === user.user_history[0].course_id
        })
        courseforVideo[0].seasons = courseforVideo[0].seasons.filter((season: ISeasons, index: number) => {
          if (season.id === user.user_history[0].season_id) {
            setSeasonIndex(index);
          }
          return season.id === user.user_history[0].season_id
        })
        courseforVideo[0].seasons[0].lessons = courseforVideo[0].seasons[0].lessons.filter((lesson: ILessons, index: number) => {
          if (lesson.id === user.user_history[0].lesson_id) {
            setLessonIndex(index);
          }
          return lesson.id === user.user_history[0].lesson_id
        })
      }
      else {
        courseforVideo = courseforVideo.filter((course: ICourses, index: number) => {
          return course.id === 35
        })
        courseForModal = courseforVideo;
        setSeasonIndex(0);
        setLessonIndex(0);
      }
      setCourseForModal(courseForModal[0]);
      setVideoCourse(courseforVideo[0]);
      setLoading(false);
    })
  }
  const goTo = () => {
    if (userData) {
      if (videoCourse.type === "Producto" && userData.user_courses.find((x: any) => (x.course_id === videoCourse.id && x.final_date >= today))) {
        router.push({
          pathname: 'Lesson',
          query: { id: videoCourse.id, season: seasonIndex, lesson: lessonIndex },
        });
      }
      if (videoCourse.type === "Producto" && userData.user_courses.find((x: any) => (x.course_id === videoCourse.id && x.final_date <= today))) {
        router.push({
          pathname: 'Purchase', query: { type: 'course', id: videoCourse.id }
        });
      }
      if (videoCourse.type === "Mensual" && userData.final_date >= today) {
        router.push({
          pathname: 'Lesson',
          query: { id: videoCourse.id, season: seasonIndex, lesson: lessonIndex },
        });
      }
      if (videoCourse.type === "Mensual" && userData.final_date < today) {
        router.push({
          pathname: 'Purchase',
          query: { type: 'subscription' }
        });
      }
    }
    else {
      router.push({ pathname: '/auth/Login' })
    }
  }
  const handleOpen = () => {
    setShow(true);
  }
  useEffect(() => {
    if (localStorage.getItem("email")) {
      getUserApi(localStorage.getItem("email")).then((res) => {
        setLoggedIn(true);
        setUserData(res);
        // coursesAll(res);
        getAllCourseDataApi(res.id).then((data) => {
          setCourses(data);
          setVideoCourse(data.video_preview);
          setSeasonIndex(data.video_preview.seasonId);
          setLessonIndex(data.video_preview.lessonId);
          setLoading(false);
        })
      })
    } else {
      // coursesAll(null);
      getAllCourseDataApi(null).then((data) => {
        setCourses(data);
        setVideoCourse(data.video_preview);
        setSeasonIndex(0);
        setLessonIndex(0);
        setLoading(false);
      })
    }

  }, [])
  return (
    <CoursesContain>
      {/* VIDEO  */}
      <Container>
        <div className={loading ? "skeleton-product video-display" : "video-display"}>
          <div className="image-container">
            <div className="video-container">
              {
                !loading &&
                <ReactPlayer
                  url={videoCourse.seasons[seasonIndex].lessons[lessonIndex].link}
                  className='absolute'
                  playing={true}
                  muted={true}
                  loop={true}
                  playsinline
                  width='100%'
                  height='100%'
                />
              }
            </div>
          </div>
          <div className="text-container">
            <div className="grey-field">
              <div className="top">
                <img style={{ margin: 0 }} src="../images/purchase/logo.png" alt="" />
                <p>Gonvar+</p>
              </div>
              <Title>
                {!loading && videoCourse.title}
              </Title>
            </div>
            <div className="grey-field">
              <SubText>
                {!loading && (videoCourse.professors.length > 0 ? videoCourse.professors[0].name : "Arita Gonvar")}
              </SubText>
            </div>
            <div className="button-contain">
              <div className="grey-field" style={{ maxWidth: "fit-content" }}>
                <PurpleButton onClick={goTo}>
                  <BsTriangle />
                  Reproducir
                </PurpleButton>
              </div>
              <div className="grey-field" style={{ maxWidth: "fit-content" }}>
                <TransparentButton onClick={handleOpen}>
                  Más información
                </TransparentButton>
              </div>
            </div>
          </div>
          <Gradient></Gradient>
        </div>
      </Container>
      <CourseModal show={show} setShow={setShow} course={courseForModal} user={userData} />
      {/* SLIDERS */}
      <div className="module-contain">
        {
          courseSections.map((slideType: string, index: number) => {
            return (
              <Sliders
                slideType={slideType}
                slideNumber={index}
                containLoader={loading}
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