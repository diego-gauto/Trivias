import React, { useEffect, useState } from "react";

import Modal1 from "./Modal/Modal1";
import {
  Band,
  DaysLeft,
  ImageContent,
  InsideContent,
  InsideText,
  Maincontainer,
  Text1,
  Text2,
  Text3,
  TextContain,
  ViewCourse,
} from "./Module3.styled";
import { Title, CardImage, Viewpay, Cardcontent, VideoInfo, CardContain } from "../Module4/Module4.styled";
import { getPaidCourses } from "../../../store/actions/UserActions";
import { useRouter } from "next/router";
import { getCourses, getWholeCourses } from "../../../store/actions/courseActions";

const Module3 = ({ user }: any) => {
  const [courses, setCourses] = useState<any>([]);
  const [course, setCourse] = useState<any>({});
  const router = useRouter()
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    if (user) {
      let temp_courses: any = [];
      let date = new Date().getTime() / 1000;
      let temp_final_date: any;
      getPaidCourses(user.id).then((paid: any) => {
        getWholeCourses().then((response) => {
          response.forEach(async (element: any) => {
            if (paid.some((x: any) => x.id == element.id && date < x.finalDate)) {
              element.paid = true;
              temp_final_date = paid.find((courePaid: any) => courePaid.id == element.id);
              element.date = Math.ceil((temp_final_date.finalDate - date) / (3600 * 24));
              temp_courses.push(element);
            }
          });
          setCourses(temp_courses);
        })
      })
    }
  }, [user])

  const goTo = (data: any) => {
    if (data.courseType == 'Mensual' && userData.membership.level == 1 || data.paid) {
      router.push({
        pathname: 'Lesson',
        query: { id: data.id, season: 0, lesson: 0 },
      });
    }
    // if (data.courseType == 'Gratis') {
    //   router.push({
    //     pathname: 'Lesson',
    //     query: { id: data.id },
    //   });
    // }
    // if (data.courseType == 'Mensual' && userData.membership.level == 0) {
    //   router.push(
    //     { pathname: 'Purchase', query: { type: 'subscription' } }
    //   )
    // }
    setCourse(data)
  }

  return (
    <Maincontainer>
      {courses.length > 0 && <>
        <Title>
          Cursos en poseción
        </Title>
        <CardContain id="Scroll">
          {courses.map((course: any, index: any) => {
            return (
              <Cardcontent key={"card-course-" + index}>
                <ImageContent>
                  <Band />
                  <DaysLeft>{course.date} días</DaysLeft>
                  <CardImage
                    src="/images/Preview/card3.png"
                    width={400}
                    height={210}
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
                      {course.courseTittle}
                      <Text2>
                        {course.courseCategory}
                      </Text2>
                    </Text1>
                    <Text3>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam est tempor, egestas mauris pulvinar.
                    </Text3>
                  </TextContain>
                  <ViewCourse onClick={() => {
                    goTo(course)
                  }}>
                    Ver el Curso
                  </ViewCourse>
                </VideoInfo>
              </Cardcontent>

            )
          })}
        </CardContain>
      </>}
    </Maincontainer>
  )
}
export default Module3;