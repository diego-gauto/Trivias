import React, { useEffect, useLayoutEffect, useState } from "react";

import { useRouter } from "next/router";

import { getPaidCourses } from "../../../store/actions/UserActions";
import {
  Cardcontent,
  CardContain,
  CardImage,
  ScrollContainer,
  Title,
} from "../Module4/Module4.styled";
import {
  Band,
  DaysLeft,
  Maincontainer,
} from "./Module3.styled";
import Modal1 from "../Module4/Modal/Modal1";
import { ImageContent } from "../Module5/Module5.styled";

const Module3 = ({ user, allCourses }: any) => {
  const [courses, setCourses] = useState<any>([]);
  const [course, setCourse] = useState<any>({});
  const router = useRouter()
  const [show, setShow] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    if (user) {
      let temp_courses: any = [];
      let date = new Date().getTime() / 1000;
      let temp_final_date: any;
      getPaidCourses(user.id).then((paid: any) => {
        allCourses.forEach(async (element: any) => {
          if (paid.some((x: any) => x.id == element.id && date < x.finalDate)) {
            element.paid = true;
            element.courseAbout = element.courseAbout.slice(0, 100);
            element.courseSubtittle = element.courseSubtittle.slice(0, 30);
            element.courseTittle = element.courseTittle.slice(0, 15);
            temp_final_date = paid.find((courePaid: any) => courePaid.id == element.id);
            element.date = Math.ceil((temp_final_date.finalDate - date) / (3600 * 24));
            temp_courses.push(element);
          }
        });
        setCourses(temp_courses);
      })
    }
  }, [user])

  const goTo = (data: any) => {
    let today = new Date().getTime() / 1000;
    if (data.courseType == 'Mensual' && userData.membership.finalDate > today || data.paid) {
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
  // window.addEventListener('resize', function (event) {
  //   let cardWidth: any = document.getElementById('card-container')?.offsetWidth;
  //   let cardStyle: any = document.getElementById('shadow');
  //   if (window.innerWidth < cardWidth) {
  //     cardStyle.style.display = 'flex';
  //   } else {
  //     cardStyle.style.display = 'none';
  //   }
  // },);

  // useLayoutEffect(() => {
  //   let cardWidth: any = document.getElementById('card-container')?.offsetWidth;
  //   let cardStyle: any = document.getElementById('shadow');
  //   if (window.innerWidth < cardWidth) {
  //     cardStyle.style.display = 'flex';
  //   } else {
  //     cardStyle.style.display = 'none';
  //   }
  // }, [])

  return (
    <Maincontainer>
      {courses.length > 0 && <>
        <Title>
          Tus Cursos
        </Title>
        <ScrollContainer>
          <CardContain id="Scroll">
            {courses.map((course: any, index: any) => {
              return (
                <Cardcontent key={"card-course-" + index} onClick={() => {
                  goTo(course)
                }}>
                  <ImageContent>
                    <Band />
                    <DaysLeft>{course.date} días</DaysLeft>
                    <CardImage
                      src={course.coursePath}
                    />
                  </ImageContent>
                </Cardcontent>

              )
            })}
          </CardContain>
        </ScrollContainer>
      </>}
    </Maincontainer>
  )
}
export default Module3;