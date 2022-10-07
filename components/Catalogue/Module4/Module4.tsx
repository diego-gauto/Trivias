import React, { useEffect, useLayoutEffect, useState } from "react";

import router, { useRouter } from "next/router";

import { LOGIN_PATH } from "../../../constants/paths";
import { getPaidCourses } from "../../../store/actions/UserActions";
import {
  Maincontainer,
} from "../Module3/Module3.styled";
import Modal1 from "./Modal/Modal1";
import {
  Cardcontent,
  CardContain,
  CardImage,
  ScrollContainer,
  Title,
} from "./Module4.styled";
import { ImageContent } from "../Module5/Module5.styled";

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

  const handleWidth = () => {
    let cardWidth: any = document.getElementById('card-container-2')?.offsetWidth;
    let cardStyle: any = document.getElementById('shadow-2');
    if (window.innerWidth < cardWidth) {
      cardStyle.style.display = 'flex';
    } else {
      cardStyle.style.display = 'none';
    }
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
        handleWidth();
      })
    } else {
      allCourses.forEach((element: any) => {
        element.courseAbout = element.courseAbout.slice(0, 100);
        element.courseSubtittle = element.courseSubtittle.slice(0, 30);
        element.courseTittle = element.courseTittle.slice(0, 15);
      });
      setCourses(allCourses);
      setTimeout(() => {
        handleWidth();
      }, 500);
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
  window.addEventListener('resize', function (event) {
    handleWidth();
  },);

  return (
    <Maincontainer>
      <Title>
        Cursos disponibles
      </Title>
      <ScrollContainer>
        <CardContain id="card-container-2">
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
                    </ImageContent>
                  </Cardcontent>}
                </>
              )
            })
          }
          <div id="shadow-2" className="right-shadow"></div>
        </CardContain>
      </ScrollContainer>
      <Modal1 show={show} setShow={setShow} course={course} user={user} />
    </Maincontainer>
  )
}
export default Module4;