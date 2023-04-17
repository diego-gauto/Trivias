import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { LOGIN_PATH } from "../../../constants/paths";
import { useAuth } from "../../../hooks/useAuth";
import { MainContainer } from "./Lesson.styled";
import Video from "./LessonComponents/Video/Video";
import { Background, LoaderContain, LoaderImage } from "../../../screens/Login.styled";
import Modules from "./LessonComponents/Modules/Modules";
import Courses from "./LessonComponents/Courses/Courses";
import { addCourse, addUserHistory, getCourseApi } from "../../../components/api/lessons";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";


const Lesson = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [course, setCourse] = useState<any>();
  const router = useRouter()
  const { id, season, lesson }: any = router.query;
  const [userData, setUserData] = useState<any>(null);
  const [menu, setMenu] = useState<boolean>(false);
  const [currentlesson, setCurrentLesson] = useState<any>({});
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

  try {
    var userDataAuth = useAuth();
    useEffect(() => {
      if (userDataAuth.user !== null) {
        let user = userDataAuth.user;
        let today = new Date().getTime() / 1000;
        setUserData(user);
        getCourseApi(id).then((res) => {
          if (res.type === 'Producto' && user.user_courses.filter((x: any) => x.course_id === +id && x.final_date < today).length > 0) {
            router.push(
              { pathname: 'Purchase', query: { type: 'course', id: res.id } }
            )
          }
          if (res.type === 'Mensual' && user.level === 0) {
            router.push({
              pathname: 'Purchase',
              query: { type: 'subscription' }
            });
          }
          setCurrentLesson(res.seasons[season].lessons[lesson]);
          setCourse(res);
          history(res, user);
          setIsLoading(false);
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
      if (course.seasons[season].lessons[+lesson + 1]) {
        setnextLesson({
          lessonIndex: +lesson + 1,
          seasonIndex: +season,
        });
      }
      else {
        if (course.seasons[+season + 1]) {
          setnextLesson({
            lessonIndex: 0,
            seasonIndex: +season + 1,
          });
        }
        else {
          setnextLesson({
            lessonIndex: 0,
            seasonIndex: 0,
          });
        }
      }
      if (userData !== null) {
        history(res, userData);
      }
      setIsLoading(false);
    })
  }
  const history = (data: any, user: any) => {
    let temp = {
      courseId: data.id,
      seasonId: data.seasons[season].id,
      lessonId: data.seasons[season].lessons[lesson].id,
      userId: user.user_id
    }
    addUserHistory(temp)
  }

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
              {!menu ? <GiHamburgerMenu onClick={() => {
                setMenu(!menu)
              }}></GiHamburgerMenu> :
                <AiOutlineClose onClick={() => {
                  setMenu(!menu)
                }}></AiOutlineClose>}
            </div>
            <Video data={currentlesson} id={id} course={course} user={userData} season={season} lesson={lesson} handleComplete={handleComplete} nextLesson={nextLesson} />
            <Modules course={course} handleClick={handleClick} data={currentlesson} user={userData} season={season} lesson={lesson} teacherCreds={course.professors} courseIds={{ courseId: id, seasonId: course.seasons[season].id }} />
          </div>
          <Courses menu={menu} handleClick={handleClick} course={course} data={currentlesson} userData={userData} season={season} lesson={lesson} />
          {/* <FirstContainer>
              <Video comments={currentComments} data={currentlesson} title={course?.courseTittle} id={id} course={course} user={userData} season={season} lesson={lesson} handleComplete={handleComplete} />
            </FirstContainer> */}
        </MainContainer>}
    </>
  )
}
export default Lesson;