

import { DocumentData } from "firebase/firestore";
import { Image, Row } from "react-bootstrap";
import router from "next/router";
import { useEffect, useRef, useState } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css/scrollbar';
import { getViewedCourses } from "../../../store/actions/courseActions";
import SwiperCore, { Mousewheel, Scrollbar } from "swiper";
import {
  ContinueText,
  SlideModuleContainer,
} from "./Module2.styled";
import { Container } from "react-bootstrap";
import { LOGIN_PATH } from "../../../constants/paths";
SwiperCore.use([Scrollbar, Mousewheel]);

const Module2 = ({ user, allCourses }: any) => {
  const [courses, setCourses] = useState<any>([]);
  const swiperRef = useRef<SwiperCore>();
  let today = new Date().getTime() / 1000;

  const onInit = (swiper: SwiperCore) => {
    swiperRef.current = swiper;
  };

  const handleWidth = () => {
    // let cardWidth: any = document.getElementById('card-container-1')?.offsetWidth;
    // let cardStyle: any = document.getElementById('shadow-1');
    // if (window.innerWidth < cardWidth) {
    //   cardStyle.style.display = 'flex';
    // } else {
    //   cardStyle.style.display = 'none';
    // }
  }
  useEffect(() => {
    if (user) {
      let tempCourses: any = [];
      getViewedCourses(user.id).then((res: any) => {
        res.forEach((element: DocumentData) => {
          let tempCourse;
          if (allCourses.some((x: any) => x.id == element.documentID)) {
            tempCourse = allCourses.filter((x: any) => x.documentID == element.documentID);
            element.coursePath = tempCourse[0].coursePath;
            if (("progress" in tempCourse[0].seasons[element.season].lessons[element.lesson])) {
              element.progress = tempCourse[0].seasons[element.season].lessons[element.lesson].progress.filter((x: any) => x.id == user.id)
              element.progress = element.progress[0]?.time
            }
            tempCourses.push(element)
          }
        });
        setCourses(tempCourses);
        handleWidth();
      });
    }
  }, [user]);

  window.addEventListener('resize', function (event) {
    handleWidth();
  },);
  const settings = {
    mousewheel: {
      forceToAxis: true
    },
    slidesPerView: 2,
    freeMode: true,
    spaceBetween: 0,
    breakpoints: {
      1024: {
        slidesPerView: 5,
        spaceBetween: 0,
      }
    }
  };

  const goTo = (course: any) => {
    if (user) {
      if (course.courseType == 'Mensual' && user.membership.finalDate > today || course.paid || course.courseType == 'Gratis') {
        router.push({
          pathname: 'Lesson',
          query: { id: course.documentID, season: 0, lesson: 0 },
        });
      }
      if (course.courseType == 'Mensual' && user.membership.finalDate < today) {
        router.push(
          { pathname: 'Purchase', query: { type: 'subscription' } }
        )
      }
      if (course.courseType == 'Producto' && !course.paid) {
        router.push(
          { pathname: 'Purchase', query: { type: 'course', id: course.documentID } }
        )
      }
    } else {
      if (course.courseType == 'Gratis') {
        router.push({
          pathname: 'Lesson',
          query: { id: course.documentID, season: 0, lesson: 0 },
        });
      }
      if (!user && course.courseType !== 'Gratis') {
        router.push(LOGIN_PATH)
      }
    }
  }

  return (
    <>
      {courses.length > 0 && <Container fluid
        style={{ overflow: "hidden", padding: 0, margin: 0, paddingLeft: '10px' }}>
        <ContinueText>
          Continua viendo
        </ContinueText>
        <Swiper id="card-container-1" {...settings} onInit={onInit}>
          {courses.map((element: any, idx: any) => (
            <SwiperSlide key={idx} onClick={() => {
              goTo(element)
            }}>
              <SlideModuleContainer>
                <Image src={element.coursePath} fluid style={{ borderRadius: "10px" }} />
              </SlideModuleContainer>
            </SwiperSlide>
          ))}
          <div id="shadow-1" className="right-shadow"></div>
        </Swiper>
      </Container>}
    </>
  )
}
export default Module2;