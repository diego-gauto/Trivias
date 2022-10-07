import React, { useEffect, useLayoutEffect, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import { LOGIN_PATH } from "../../../constants/paths";
import Modal1 from "../Module4/Modal/Modal1";
import { Cardcontent, CardImage } from "../Module4/Module4.styled";
import {
  ButtonContain,
  Cardcontent2,
  CardContain,
  Content,
  ImageContent,
  MainContainer,
  PurpleButton,
  RespContain,
  Title,
} from "./Module5.styled";

const Module5 = ({ user, course }: any) => {
  const [courses, setCourses] = useState<any>([]);
  let today = new Date().getTime() / 1000;
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [course_1, setCourse] = useState<any>({});

  const handleShow = () => {
    setShow(true);
  }
  const handleWidth = () => {
    let cardWidth: any = document.getElementById('card-container-3')?.offsetWidth;
    let cardStyle: any = document.getElementById('shadow-3');
    if (window.innerWidth < cardWidth) {
      cardStyle.style.display = 'flex';
    } else {
      cardStyle.style.display = 'none';
    }
  }

  useEffect(() => {
    if (course) {
      let temp_courses: any = [];
      course.forEach((element: any) => {
        if (element.courseType == 'Mensual') {
          element.courseAbout = element.courseAbout.slice(0, 50);
          element.courseSubtittle = element.courseSubtittle.slice(0, 30);
          element.courseTittle = element.courseTittle.slice(0, 15);
          temp_courses.push(element);
        }
      });
      setCourses(temp_courses);
      setTimeout(() => {
        handleWidth();
      }, 500);
    }
  }, [course])

  const goTo = (data: any) => {
    if (user) {
      let today = new Date().getTime() / 1000;
      if (data.courseType == 'Mensual' && user.membership.finalDate > today) {
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
    } else {
      router.push(LOGIN_PATH);
    }
  }

  window.addEventListener('resize', function (event) {
    handleWidth();
  },);

  return (
    <MainContainer>
      <Content>
        <Title>
          Incluido con Gonvar+
        </Title>
        <RespContain>
          <CardContain id="card-container-3">
            {courses.map((course: any, index: any) => {
              return (
                < >
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
            })}
            <div id="shadow-3" className="right-shadow"></div>
          </CardContain>
        </RespContain>
        {<ButtonContain>
          {(user && user.membership.finalDate < today) && <Link href={{ pathname: 'Purchase', query: { type: 'subscription' } }}>
            <PurpleButton>
              Adquiere Gonvar+
            </PurpleButton>
          </Link>}
          {!user && <Link href={LOGIN_PATH}>
            <PurpleButton>
              Adquiere Gonvar+
            </PurpleButton>
          </Link>}
        </ButtonContain>}
      </Content>
      <Modal1 show={show} setShow={setShow} course={course_1} user={user} />
    </MainContainer >
  )
}
export default Module5;
