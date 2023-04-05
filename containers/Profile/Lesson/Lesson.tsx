import React, { useEffect, useState } from "react";

import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useRouter } from "next/router";
import { LOGIN_PATH } from "../../../constants/paths";
import { db } from "../../../firebase/firebaseConfig";
import { useAuth } from "../../../hooks/useAuth";
import {
  addHistoryCourse,
  getTeacher,
  getWholeCourse,
} from "../../../store/actions/courseActions";
import { addUserCertificate, getPaidCourses } from "../../../store/actions/UserActions";
import { MainContainer } from "./Lesson.styled";
import Video from "./LessonComponents/Video/Video";
import { Background, LoaderContain, LoaderImage } from "../../../screens/Login.styled";
import Modules from "./LessonComponents/Modules/Modules";
import Courses from "./LessonComponents/Courses/Courses";
import { io } from 'socket.io-client';
import { addCourse, getCourseApi } from "../../../components/api/lessons";



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

  const checkCourse = () => {

    let date = new Date().getTime() / 1000;
    if (course) {
      let temp_lesson;
      let temp_comments;

      onSnapshot(query(collection(db, 'comments'), orderBy("createdAt", "desc")), (doc) => {
        let comment: any = []
        doc.docs.forEach((x) => {
          comment.push({ ...x.data(), id: x.id })
        })
        if (comment?.some((x: any) => x.courseId == course.id && x.lessonId == course.seasons[season].lessons[lesson].id && x.seasonId == course.seasons[season].id)) {
          temp_comments = [...comment].filter((x: any) => x.courseId == course.id && x.lessonId == course.seasons[season].lessons[lesson].id && x.seasonId == course.seasons[season].id);
          setCurrentComments(temp_comments);
        } else {
          setCurrentComments([]);
        }
      })

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
          setCertificate(true);
          let tempCertificate = userData.certificates;
          if (tempCertificate) {
            if (tempCertificate.find((x: any) => x.courseId == course.id)) {
              return;
            } else {
              tempCertificate.push({ folio: course.id.slice(0, 4) + userData.id.slice(0, 4), createdAt: new Date(), courseId: course.id });
              addUserCertificate(tempCertificate, userData.id);
            }
          } else {
            tempCertificate = []
            tempCertificate.push({ folio: course.id.slice(0, 4) + userData.id.slice(0, 4), createdAt: new Date(), courseId: course.id, courseTitle: course.courseTittle });
            addUserCertificate(tempCertificate, userData.id);
          }
        }
      }
    }
  }

  const handleComplete = () => {
    getCourse()
  }

  try {
    var userDataAuth = useAuth();
    useEffect(() => {
      if (userDataAuth.user !== null) {
        setUserData(userDataAuth.user)
        setLoggedIn(true)
      } else {
        router.push(LOGIN_PATH)
      }
    }, [])
  } catch (error) {
    setLoggedIn(false)
  }

  useEffect(() => {
    getCourse();
  }, [])

  const getCourse = () => {
    getCourseApi(id).then((res) => {
      setCurrentLesson(res.seasons[season].lessons[lesson]);
      setCourse(res);
      setIsLoading(false);
    })
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