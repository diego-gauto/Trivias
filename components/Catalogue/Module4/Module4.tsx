import React, { useEffect, useState } from "react";
import { getCourses, getWholeCourses } from "../../../store/actions/courseActions";
import {
  ImageContent,
  InsideContent,
  InsideText,
  Maincontainer,
  Text1,
  Text2,
  Text3,
  TextContain
} from "../Module3/Module3.styled";
import Modal1 from "./Modal/Modal1";
import { Title, CardImage, Viewpay, Cardcontent, VideoInfo, CardContain } from "./Module4.styled";
import { useRouter } from 'next/router'
import { getPaidCourses } from "../../../store/actions/UserActions";
const Module4 = ({ user }: any) => {
  const [show, setShow] = useState(false);
  const [courses, setCourses] = useState<any>([]);
  const [course, setCourse] = useState<any>({});
  const router = useRouter()
  const [userCourses, setUserCourses] = useState<any>([]);

  const handleShow = () => {
    setShow(true);
  }

  useEffect(() => {
    if (user) {
      let date = new Date().getTime() / 1000;
      getPaidCourses(user.id).then((paid) => {
        setUserCourses(paid);
        getWholeCourses().then((response) => {
          response.forEach((element: any) => {
            element.courseAbout = element.courseAbout.slice(0, 100);
            if (paid.some((x: any) => x.id == element.id && date < x.finalDate)) {
              element.paid = true;
            } else {
              element.paid = false;
            }
          });
          setCourses(response);
        })
      })
    } else {
      getWholeCourses().then((response) => {
        response.forEach((element: any) => {
          element.courseAbout = element.courseAbout.slice(0, 100);
        });
        setCourses(response);
      })
    }
  }, [user])

  const goTo = (data: any) => {
    if (user) {
      let today = new Date().getTime() / 1000;
      if (data.courseType == 'Mensual' && user.membership.finalDate > today || data.paid || data.courseType == 'Gratis') {
        router.push({
          pathname: 'Lesson',
          query: { id: data.id, season: 0, lesson: 0 },
        });
      }
      if (data.courseType == 'Mensual' && user.membership.level == 0) {
        router.push(
          { pathname: 'Purchase', query: { type: 'subscription' } }
        )
      }
    } else {
      if (data.courseType == 'Gratis') {
        router.push({
          pathname: 'Lesson',
          query: { id: data.id, season: 0, lesson: 0 },
        });
      }
      if (!user && data.courseType == 'Mensual') {
        router.push(
          { pathname: 'auth/Login' }
        )
      }
    }
    setCourse(data)
  }

  return (
    <Maincontainer>
      <Title>
        Cursos disponibles
      </Title>
      <CardContain id="Scroll">
        {
          courses.map((course: any, index: any) => {
            return (
              <Cardcontent key={"cardContent-" + index}>
                <ImageContent>
                  <CardImage
                    src="/images/Preview/card5.png"
                  />
                  <InsideContent>
                    {course.totalLessons > 1 && <InsideText>
                      {course.totalLessons} Lecciones
                    </InsideText>}
                    {course.totalLessons == 1 && <InsideText>
                      Unica Lección
                    </InsideText>}
                  </InsideContent>
                </ImageContent>
                <VideoInfo>
                  <TextContain>
                    <Text1>
                      Curso: {course.courseTittle}
                      <Text2>
                        {course.courseSubtittle}
                      </Text2>
                    </Text1>
                    <Text3>
                      {course.courseAbout}...
                    </Text3>
                  </TextContain>
                  {course.courseType == 'Producto' && !course.paid && <Viewpay onClick={() => {
                    handleShow(),
                      setCourse(course)
                  }}>
                    Comprar - ${course.coursePrice}.00
                  </Viewpay>}
                  {(course.courseType == 'Mensual' || course.courseType == 'Gratis') && <Viewpay onClick={() => {
                    goTo(course);
                  }}>
                    Ver curso
                  </Viewpay>}
                  {course.courseType == 'Producto' && course.paid && <Viewpay onClick={() => {
                    goTo(course);
                  }}>
                    Ver curso
                  </Viewpay>}
                </VideoInfo>
              </Cardcontent>
            )
          })
        }
      </CardContain>
      <Modal1 show={show} setShow={setShow} course={course} user={user} />
    </Maincontainer>
  )
}
export default Module4;