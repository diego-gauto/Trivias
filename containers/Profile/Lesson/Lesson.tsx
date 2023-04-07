import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { LOGIN_PATH } from "../../../constants/paths";
import { useAuth } from "../../../hooks/useAuth";
import { MainContainer } from "./Lesson.styled";
import Video from "./LessonComponents/Video/Video";
import { Background, LoaderContain, LoaderImage } from "../../../screens/Login.styled";
import Modules from "./LessonComponents/Modules/Modules";
import Courses from "./LessonComponents/Courses/Courses";
import { io } from 'socket.io-client';
import { addCourse, addUserHistory, getCourseApi } from "../../../components/api/lessons";



const Lesson = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [course, setCourse] = useState<any>();
  const router = useRouter()
  const { id, season, lesson }: any = router.query;
  const [userData, setUserData] = useState<any>(null);
  const [currentlesson, setCurrentLesson] = useState<any>({});
  // const socket = io("http://94.74.77.165:89");

  // socket.io.on("error", (error) => {
  //   console.log(error);

  // });

  useEffect(() => {
    if (course) {
      getCourse();
    }

  }, [router]);


  // const send = () => {
  //   console.log(0);
  //   socket.emit("comment", { data: "hola" }).timeout(5000);
  // }

  // socket.on("comment", ({ data }) => {
  //   console.log(data);

  // });

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
            <Video data={currentlesson} id={id} course={course} user={userData} season={season} lesson={lesson} handleComplete={handleComplete} />
            <Modules handleClick={handleClick} data={currentlesson} user={userData} season={season} lesson={lesson} teacherCreds={course.professors} courseIds={{ courseId: id, seasonId: course.seasons[season].id }} />
          </div>
          <Courses menu={true} handleClick={handleClick} course={course} data={currentlesson} userData={userData} season={season} lesson={lesson} />
          {/* <FirstContainer>
              <Video comments={currentComments} data={currentlesson} title={course?.courseTittle} id={id} course={course} user={userData} season={season} lesson={lesson} handleComplete={handleComplete} />
            </FirstContainer> */}
        </MainContainer>}
    </>
  )
}
export default Lesson;