import React, { useEffect, useState } from "react";

import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useRouter } from "next/router";

import { LOGIN_PATH } from "../../../constants/paths";
import { db } from "../../../firebase/firebaseConfig";
import { useAuth } from "../../../hooks/useAuth";
import {
  addHistoryCourse,
  getComments,
  getWholeCourse,
} from "../../../store/actions/courseActions";
import { getPaidCourses } from "../../../store/actions/UserActions";
import { Container, FirstContainer, MainContainer } from "./Lesson.styled";
import Modules from "./LessonComponents/Modules/Modules";
import Video from "./LessonComponents/Video/Video";
import { Background, LoaderContain, LoaderImage } from "../../../screens/Login.styled";

const Lesson = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [course, setCourse] = useState<any>();
  const router = useRouter()
  const { id, season, lesson }: any = router.query;
  const [userData, setUserData] = useState<any>(null);
  const [currentlesson, setCurrentLesson] = useState<any>({});
  const [currentComments, setCurrentComments] = useState<any>([]);
  const [comments, setComments] = useState<any>([]);
  const [certficate, setCertificate] = useState<any>(false);

  useEffect(() => {
    checkCourse()
  }, [router, course]);

  const checkCourse = () => {
    let date = new Date().getTime() / 1000;
    if (course) {
      let temp_lesson;
      let temp_comments;
      temp_lesson = course.seasons[season].lessons[lesson];
      temp_lesson.seasonId = course?.seasons[season].id;
      temp_lesson.courseId = course.id;
      temp_lesson.courseTitle = course?.courseTittle;
      temp_lesson.teachers = course?.courseProfessor;
      setCurrentLesson(temp_lesson);
      if (userData) {
        if (course.courseType == 'Gratis') {
          addHistoryCourse(course, userData.id, season, lesson);
        }
        if (course.courseType == 'Mensual' && userData.membership.finalDate > date) {
          addHistoryCourse(course, userData.id, season, lesson);
        }
        if (course.courseType == 'Producto') {
          getPaidCourses(userData.id).then((paid: any) => {
            if (paid.some((x: any) => x.id == course.id && date < x.finalDate)) {
              addHistoryCourse(course, userData.id, season, lesson);
            }
          })
        }
        let viewed = 0;
        course.lessons.forEach((element: any) => {
          if (element.users.includes(userData.id)) {
            viewed++;
          }
        });
        if (course.lessons.length == viewed) {
          setCertificate(true)
        }

      }
      if (comments.some((x: any) => x.courseId == course.id && x.lessonId == course.seasons[season].lessons[lesson].id && x.seasonId == course.seasons[season].id)) {
        temp_comments = [...comments].filter((x: any) => x.courseId == course.id && x.lessonId == course.seasons[season].lessons[lesson].id && x.seasonId == course.seasons[season].id);
        setCurrentComments(temp_comments);
      } else {
        setCurrentComments([]);
      }
    }
  }

  const handleComplete = () => {
    checkCourse()
  }

  try {
    var userDataAuth = useAuth();
    useEffect(() => {
      if (userDataAuth.user !== null) {
        setLoggedIn(true)
      } else {
        router.push(LOGIN_PATH)
      }
    }, [])
  } catch (error) {
    setLoggedIn(false)
  }

  const fetchDB_data = async () => {
    try {
      getComments().then((res) => {
        setComments(res);
      })
      let date = new Date().getTime() / 1000;
      const query_1 = query(collection(db, "users"), where("uid", "==", userDataAuth.user.id));
      return onSnapshot(query_1, (response) => {
        response.forEach((e: any) => {
          getPaidCourses(e.id).then((paid: any) => {
            getWholeCourse(id).then((res: any) => {
              if (res.courseType == 'Producto') {
                if (paid.some((x: any) => x.id == res.id && date < x.finalDate)) {
                  res.paid = true;
                  addHistoryCourse(res, e.id, season, lesson);
                  setIsLoading(false);
                } else {
                  router.push({
                    pathname: 'Purchase', query: { type: 'course', id: id }
                  });
                }
              }
              if (res.courseType == 'Mensual') {
                if (e.data().membership.finalDate > date) {
                  addHistoryCourse(res, e.id, season, lesson);
                  setIsLoading(false);
                }
                else {
                  router.push(
                    { pathname: 'Purchase', query: { type: 'subscription' } }
                  )
                }
              }
              if (res.courseType == 'Gratis') {
                addHistoryCourse(res, e.id, season, lesson);
                setIsLoading(false);
              }
              setCourse(res);
            })
          })
          setUserData({ ...e.data(), id: e.id });
        });
      });
    } catch (error) {
      return false
    }
  }

  useEffect(() => {
    fetchDB_data()

  }, [loggedIn])

  const goTo = () => {
    router.push({
      pathname: `/Certificates`,
      query: { name: userData.name, title: course.courseTittle }
    });
  }

  return (
    <>
      {isLoading ? <Background style={{ justifyContent: "center", alignItems: "center" }}>
        <LoaderImage >
          <LoaderContain />
        </LoaderImage>
      </Background> :
        <MainContainer>
          {/* {certficate && <div className="certificate-container">
            <p>Muchas felicidades por acompletar el curso, tu certificado ya esta disponible!</p>
            <button onClick={() => { goTo() }}>Certificado</button>
          </div>} */}
          {course && <Container>
            <FirstContainer>
              <Video comments={currentComments} data={currentlesson} title={course?.courseTittle} id={id} course={course} user={userData} season={season} lesson={lesson} handleComplete={handleComplete} />
            </FirstContainer>
          </Container>}
        </MainContainer>}
    </>
  )
}
export default Lesson;