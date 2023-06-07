import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { LESSON_PATH, LOGIN_PATH, PREVIEW_PATH, PURCHASE_PATH } from "../../../constants/paths";
import { useAuth } from "../../../hooks/useAuth";
import { MainContainer } from "./Lesson.styled";
import Video from "./LessonComponents/Video/Video";
import { Background, LoaderContain, LoaderImage } from "../../../screens/Login.styled";
import Modules from "./LessonComponents/Modules/Modules";
import Courses from "./LessonComponents/Courses/Courses";
import { getCourseApi } from "../../../components/api/lessons";
import ActivityModal from "./ActivityModal/ActivityModal";

const Lesson = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [course, setCourse] = useState<any>();
  const router = useRouter()
  const { id, season, lesson }: any = router.query;
  const [userData, setUserData] = useState<any>(null);
  const [menu, setMenu] = useState<boolean>(false);
  const [currentlesson, setCurrentLesson] = useState<any>({});
  const [show, setShow] = useState<boolean>(false);
  const [firstLesson, setFirstLesson] = useState<boolean>(false);
  const [lastLesson, setLastLesson] = useState<boolean>(false);
  const [blockForNextSeason, setBlockForNextSeason] = useState<boolean>(false)
  const [previousLesson, setPreviousLesson] = useState<any>({
    lessonIndex: 0,
    seasonIndex: 0,
  })
  const [nextLesson, setnextLesson] = useState<any>({
    lessonIndex: 0,
    seasonIndex: 0,
  });
  useEffect(() => {
    if (course) {
      getCourse();
    }

  }, [router]);

  const handleComplete = () => {
    getCourse()
  }
  const onHide = () => {
    setShow(false)
  }
  const openActivityModal = () => {
    setShow(true)
  }
  try {
    var userDataAuth = useAuth();
    useEffect(() => {
      if (router.asPath === LESSON_PATH) {
        router.push(PREVIEW_PATH)
        return
      }
      if (userDataAuth.user !== null) {
        let user = userDataAuth.user;
        let today = new Date().getTime() / 1000;
        setUserData(user);
        getCourseApi(id).then((res) => {
          if (res.type === 'Producto' && user.user_courses.filter((x: any) => x.course_id === +id && x.final_date < today).length > 0) {
            return router.push(
              { pathname: PURCHASE_PATH, query: { type: 'course', id: res.id } }
            )
          }
          if (res.type === 'Mensual' && (user.level === 0 && user.final_date < today)) {
            return router.push({
              pathname: PURCHASE_PATH,
              query: { type: 'subscription' }
            });
          }
          setCurrentLesson(res.seasons[season].lessons[lesson]);
          setCourse(res);
          getDataForNextLesson(res);
          setIsLoading(false);
          return
        })
        setLoggedIn(true)
      } else {
        router.push(LOGIN_PATH)
      }
    }, [])
  } catch (error) {
    setLoggedIn(false)
  }
  const getCourse = () => {
    getCourseApi(id).then((res) => {
      setCurrentLesson(res.seasons[season].lessons[lesson]);
      setCourse(res);
      getDataForNextLesson(res);
      setIsLoading(false);
    })
  }
  const getDataForNextLesson = (courseData: any) => {
    if (userData) {
      if (courseData.sequential === 1) {
        let tempLesson = courseData.seasons[+season].lessons[+lesson];
        let checkLesson = tempLesson.users.filter((user: number) => userData.user_id === user);
        let checkProgress = tempLesson.progress.filter((data: any) => userData.user_id === data.user_id);
        if ((tempLesson.quiz === 1 || tempLesson.homework === 1) && (checkLesson.length === 0 && checkProgress[0].status === 0)) {
          setBlockForNextSeason(true);
        }
      }
    }

    if (courseData.seasons[season].lessons[+lesson + 1]) {
      setLastLesson(false);
      setnextLesson({
        lessonIndex: +lesson + 1,
        seasonIndex: +season,
      });
    }
    else {
      if (courseData.seasons[+season + 1]) {
        setLastLesson(false);
        setnextLesson({
          lessonIndex: 0,
          seasonIndex: +season + 1,
        });
      }
      else {
        setLastLesson(true);
        setnextLesson({
          lessonIndex: +lesson,
          seasonIndex: +season,
        });
      }
    }
    if (courseData.seasons[season].lessons[+lesson - 1]) {
      setFirstLesson(false);
      setPreviousLesson({
        lessonIndex: +lesson - 1,
        seasonIndex: +season,
      })
    }
    else {
      if (courseData.seasons[+season - 1]) {
        setFirstLesson(false);
        setPreviousLesson({
          lessonIndex: courseData.seasons[+season - 1].lessons.length - 1,
          seasonIndex: +season - 1,
        });
      }
      else {
        setFirstLesson(true);
        setPreviousLesson({
          lessonIndex: +lesson,
          seasonIndex: +season,
        });
      }
    }
  }
  // const history = (data: any, user: any) => {
  //   let temp = {
  //     courseId: data.id,
  //     seasonId: data.seasons[season].id,
  //     lessonId: data.seasons[season].lessons[lesson].id,
  //     userId: user.user_id
  //   }
  //   addUserHistory(temp)
  // }

  const handleClick = () => {
    getCourse();
  }

  return (
    <>
      {isLoading ? <Background style={{ justifyContent: "center", alignItems: "center" }}>
        <LoaderImage >
          <LoaderContain />
        </LoaderImage>
      </Background> :
        <MainContainer>
          <div className="left-side">
            <div className='nav-course'>
              <img src="/images/Navbar/NavbarLogo2.png" alt="" />
            </div>
            <Video data={currentlesson} id={id} course={course} user={userData} season={season} lesson={lesson} handleComplete={handleComplete} nextLesson={nextLesson} openActivityModal={openActivityModal} />
            <Modules
              course={course}
              handleClick={handleClick}
              data={currentlesson}
              user={userData}
              eason={season}
              lesson={lesson}
              teacherCreds={course.professors}
              courseIds={{ courseId: id, seasonId: course.seasons[season].id }}
              previousLesson={previousLesson}
              nextLesson={nextLesson}
              firstLesson={firstLesson}
              lastLesson={lastLesson}
              blockForNextSeason={blockForNextSeason}
            />
          </div>
          <Courses menu={menu} handleClick={handleClick} course={course} data={currentlesson} userData={userData} season={season} lesson={lesson} />
          {/* <FirstContainer>
              <Video comments={currentComments} data={currentlesson} title={course?.courseTittle} id={id} course={course} user={userData} season={season} lesson={lesson} handleComplete={handleComplete} />
            </FirstContainer> */}
        </MainContainer>}
      <ActivityModal show={show} onHide={onHide} currentlesson={currentlesson} />
    </>
  )
}
export default Lesson;