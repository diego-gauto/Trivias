import React, { useEffect, useState } from "react";

import router, { useRouter } from "next/router";

import { LOGIN_PATH } from "../../../constants/paths";
import { getPaidCourses } from "../../../store/actions/UserActions";
import {
  ImageContent,
  InsideContent,
  InsideText,
  Maincontainer,
  Text1,
  Text2,
  Text3,
  TextContain,
} from "../Module3/Module3.styled";
import Modal1 from "./Modal/Modal1";
import {
  Cardcontent,
  CardContain,
  CardImage,
  ScrollContainer,
  Title,
  VideoInfo,
  Viewpay,
} from "./Module4.styled";

const Module4 = ({ user, allCourses }: any) => {
  const [show, setShow] = useState(false);
  const [courses, setCourses] = useState<any>([]);
  const [course, setCourse] = useState<any>({});
  const router = useRouter()
  const [userCourses, setUserCourses] = useState<any>([]);
  let today = new Date().getTime() / 1000;

  const handleShow = () => {
    setShow(true);
  }

  useEffect(() => {
    if (user) {
      let date = new Date().getTime() / 1000;
      getPaidCourses(user.id).then((paid) => {
        setUserCourses(paid);
        allCourses.forEach((element: any) => {
          element.courseAbout = element.courseAbout.slice(0, 100);
          element.courseSubtittle = element.courseSubtittle.slice(0, 30);
          element.courseTittle = element.courseTittle.slice(0, 15);
          if (paid.some((x: any) => x.id == element.id && date < x.finalDate)) {
            element.paid = true;
          } else {
            element.paid = false;
          }
        });
        setCourses(allCourses);
      })
    } else {
      allCourses.forEach((element: any) => {
        element.courseAbout = element.courseAbout.slice(0, 100);
        element.courseSubtittle = element.courseSubtittle.slice(0, 30);
        element.courseTittle = element.courseTittle.slice(0, 15);
      });
      setCourses(allCourses);
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
      if (data.courseType == 'Mensual' && user.membership.finalDate < today) {
        router.push(
          { pathname: 'Purchase', query: { type: 'subscription' } }
        )
      }
      if (data.courseType == 'Producto' && !data.paid) {
        router.push(
          { pathname: 'Purchase', query: { type: 'course', id: data.id } }
        )
      }
    } else {
      if (data.courseType == 'Gratis') {
        router.push({
          pathname: 'Lesson',
          query: { id: data.id, season: 0, lesson: 0 },
        });
      }
      if (!user && data.courseType !== 'Gratis') {
        router.push(LOGIN_PATH)
      }
    }
    setCourse(data)
  }

  return (
    <Maincontainer>
      <Title>
        Cursos disponibles
      </Title>
      <ScrollContainer>
        <CardContain>
          {
            courses.map((course: any, index: any) => {
              return (
                <>
                  {<Cardcontent key={"cardContent-" + index} onClick={() => {
                    handleShow();
                    setCourse(course);
                  }}>
                    <ImageContent>
                      <CardImage
                        src={course.coursePath}
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
                          {course.courseTittle}...
                          <Text2>
                            {course.courseSubtittle}...
                          </Text2>
                        </Text1>
                        <Text3>
                          {course.courseAbout}...
                        </Text3>
                      </TextContain>
                      {course.courseType == 'Producto' && !course.paid && <Viewpay onClick={(e) => {
                        e.stopPropagation();
                        goTo(course);
                      }}>
                        Comprar - ${course.coursePrice}.00
                      </Viewpay>}
                      {((course.courseType == 'Mensual' && user && user.membership.finalDate < today) || (course.courseType == 'Mensual' && !user)) && <Viewpay onClick={(e) => {
                        e.stopPropagation();
                        goTo(course);
                      }}>
                        Comprar Gonvar+
                      </Viewpay>}
                      {(course.courseType == 'Gratis' || (user && course.courseType == 'Mensual' && user.membership.finalDate > today)) && <Viewpay onClick={(e) => {
                        e.stopPropagation();
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
                  </Cardcontent>}
                </>
              )
            })
          }
          {/* <div className="right-shadow"></div> */}
        </CardContain>
      </ScrollContainer>
      <Modal1 show={show} setShow={setShow} course={course} user={user} />
    </Maincontainer>
  )
}
export default Module4;