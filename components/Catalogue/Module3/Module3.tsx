import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

import { useRouter } from "next/router";
import { Image, Row } from "react-bootstrap";

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

import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css/scrollbar';
import SwiperCore, { Mousewheel, Scrollbar } from "swiper";

import { Container } from "react-bootstrap";
import { SlideModuleContainer } from "../Module2/Module2.styled";
SwiperCore.use([Scrollbar, Mousewheel]);

const Module3 = ({ user, allCourses, isLoading, setThirdLoad }: any) => {
  const [courses, setCourses] = useState<any>([]);
  const [course, setCourse] = useState<any>({});
  const router = useRouter()
  const [show, setShow] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const swiperRef = useRef<SwiperCore>();

  const onInit = (swiper: SwiperCore) => {
    swiperRef.current = swiper;
  };
  useEffect(() => {
    if (!isLoading) {
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
          setTimeout(() => {
            setLoading(false);
          }, 200);
          setTimeout(() => {
            setThirdLoad(false);
          }, 400);
        })
      }
    }
  }, [user, isLoading])

  const goTo = (data: any) => {
    let today = new Date().getTime() / 1000;
    if (data.courseType == 'Mensual' && user.membership.finalDate > today || data.paid) {
      router.push({
        pathname: 'Lesson',
        query: { id: data.id, season: 0, lesson: 0 },
      });
    }
    setCourse(data)
  }
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
      },
      300: {
        slidesPerView: 2.25,
        spaceBetween: 0,
      }
    }
  };

  return (
    <Maincontainer>
      {courses.length > 0 && <div className={loading ? "skeleton-product" : ""} style={{ 'width': '100%' }}>
        <Container fluid
          style={{ overflow: "hidden", padding: 0, margin: 0, paddingLeft: '10px' }}>
          <div className="grey-field" style={{ maxWidth: "fit-content" }}>
            <Title>
              Tus Cursos
            </Title>
          </div>
          {/* <div className="grey-field" style={{ maxWidth: "fit-content", position: "relative" }}> */}
          <Swiper {...settings} onInit={onInit} id="card-container-3">
            {courses.map((element: any, idx: any) => (
              <SwiperSlide key={idx} onClick={() => {
                goTo(element)
              }}>
                <SlideModuleContainer>
                  <ImageContent>
                    <Band />
                    <DaysLeft>{element.date} días</DaysLeft>
                    <Image src={element.coursePath} fluid style={{ borderRadius: "10px" }} />
                  </ImageContent>
                </SlideModuleContainer>
              </SwiperSlide>
            ))}
            <div id="shadow-2" className="right-shadow"></div>
          </Swiper>
          {/* </div> */}
        </Container>
      </div>}
    </Maincontainer>
  )
}
export default Module3;