import React, { useEffect, useState } from "react";
import { getCourses } from "../../../store/actions/courseActions";
import {
  Cardcontent,
  CardContain,
  CardImage,
  ImageContent,
  InsideContent,
  InsideText,
  Maincontainer,
  Text1,
  Text2,
  Text3,
  TextContain,
  Title,
  VideoInfo,
} from "../Module3/Module3.styled";
import Modal1 from "./Modal/Modal1";
import { Viewpay } from "./Module4.styled";
import { useRouter } from 'next/router'
import { collection, onSnapshot, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import { useAuth } from "../../../hooks/useAuth";
import { getPaidCourses } from "../../../store/actions/UserActions";
const Module4 = () => {
  const [show, setShow] = useState(false);
  const [courses, setCourses] = useState<any>([]);
  const [course, setCourse] = useState<any>({});
  const router = useRouter()
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [userCourses, setUserCourses] = useState<any>([]);

  const handleShow = () => {
    setShow(true);
  }


  const goTo = (data: any) => {
    if (data.courseType == 'Mensual' && userData.menbership.level == 1 || data.paid) {
      router.push({
        pathname: 'Lesson',
        query: { id: data.id },
      });
    }
    if (data.courseType == 'Gratis') {
      router.push({
        pathname: 'Lesson',
        query: { id: data.id },
      });
    }
    if (data.courseType == 'Mensual' && userData.menbership.level == 0) {
      router.push(
        { pathname: 'Purchase', query: { type: 'subscription' } }
      )
    }
    setCourse(data)
  }

  try {
    var userDataAuth = useAuth();
    useEffect(() => {
      if (userDataAuth.user !== null) {
        setLoggedIn(true)
      } else {
        setLoggedIn(false)
      }
    }, [])

  } catch (error) {
    console.log(error)
    setLoggedIn(false)
  }

  const fetchDB_data = async () => {
    try {
      let date = new Date().getTime() / 1000;
      const query_1 = query(collection(db, "users"), where("uid", "==", userDataAuth.user.id));
      return onSnapshot(query_1, (response: any) => {
        response.forEach((e: any) => {
          setUserData({ ...e.data(), id: e.id });
          getPaidCourses(e.id).then((paid) => {
            setUserCourses(paid);
            getCourses().then((response) => {
              response.forEach((element: any) => {
                if (paid.some((x: any) => x.id == element.id && date < x.finalDate)) {
                  element.paid = true;
                } else {
                  element.paid = false;
                }
              });
              setCourses(response);
            })
          })
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
    <Maincontainer>
      <Title>
        Cursos disponibles
      </Title>
      <CardContain>
        {
          courses.map((course: any) => {
            return (
              <Cardcontent>
                <ImageContent>
                  <CardImage
                    src="/images/Preview/card5.png"
                    width={400}
                    height={210}
                  />
                  <InsideContent>
                    <InsideText>
                      24 Lecciones
                    </InsideText>
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
                      {course.courseAbout}
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
      <Modal1 show={show} setShow={setShow} course={course} />
    </Maincontainer>
  )
}
export default Module4;