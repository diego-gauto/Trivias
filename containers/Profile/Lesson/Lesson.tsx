import React from 'react'
import { Container, FirstContainer, MainContainer, SecondContainer } from './Lesson.styled';
import Modules from './LessonComponents/Modules/Modules';
import Video from './LessonComponents/Video/Video';
import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { collection, onSnapshot, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import { getPaidCourses } from '../../../store/actions/UserActions';
import { addHistoryCourse, getComments, getWholeCourse } from '../../../store/actions/courseActions';
import router, { useRouter } from "next/router";


const Lesson = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [course, setCourse] = useState<any>();
  const router = useRouter()
  const [userData, setUserData] = useState<any>(null);
  const { id, season, lesson }: any = router.query;
  const [currentlesson, setCurrentLesson] = useState<any>({});
  const [currentComments, setCurrentComments] = useState<any>([]);
  const [comments, setComments] = useState<any>([]);


  useEffect(() => {
    if (course) {
      let temp_lesson;
      let temp_comments;
      temp_lesson = course.seasons[season].lessons[lesson];
      temp_lesson.seasonId = course?.seasons[season].id
      temp_lesson.courseId = course.id
      setCurrentLesson(temp_lesson);
      if (userData) {
        addHistoryCourse(course, userData.id, season, lesson);
      }
      if (comments.some((x: any) => x.courseId == course.id && x.lessonId == course.seasons[season].lessons[lesson].id && x.seasonId == course.seasons[season].id)) {
        temp_comments = comments.filter((x: any) => x.courseId == course.id && x.lessonId == course.seasons[season].lessons[lesson].id && x.seasonId == course.seasons[season].id);
        setCurrentComments(temp_comments);
      } else {
        setCurrentComments([]);
      }
    }
  }, [router, course]);

  try {
    var userDataAuth = useAuth();
    useEffect(() => {
      if (userDataAuth.user !== null) {
        setLoggedIn(true)
      } else {
        setLoggedIn(false);
        getWholeCourse(id).then((res: any) => {
          if (res.courseType == 'Gratis') {
            setCourse(res);
          }
          if (res.courseType == 'Producto' || res.courseType == 'Mensual') {
            router.push(
              { pathname: 'auth/Login' }
            )
          }
        })
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
                } else {
                  router.push({
                    pathname: 'Purchase', query: { type: 'course', id: id }
                  });
                }
              }
              if (res.courseType == 'Mensual') {
                if (e.data().membership.finalDate > date) {
                  addHistoryCourse(res, e.id, season, lesson);
                }
                else {
                  router.push(
                    { pathname: 'Purchase', query: { type: 'subscription' } }
                  )
                }
              }
              if (res.courseType == 'Gratis') {
                addHistoryCourse(res, e.id, season, lesson);
              }
              setCourse(res);
            })
          })
          setUserData({ ...e.data(), id: e.id });
        });
      })
    } catch (error) {
      return false
    }
  }

  useEffect(() => {
    fetchDB_data()

  }, [loggedIn])

  return (
    <MainContainer>
      {course && <Container>
        <FirstContainer>
          <Video data={currentlesson} title={course?.courseTittle} id={id} course={course} user={userData} season={season} lesson={lesson} />
          <Modules data={currentlesson} user={userData} comments={currentComments} season={season} lesson={lesson} teacherId={course.courseProfessor.id} />
        </FirstContainer>
      </Container>}

    </MainContainer>
  )
}
export default Lesson;