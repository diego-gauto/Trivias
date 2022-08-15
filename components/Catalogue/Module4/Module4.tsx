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

const Module4 = () => {
  const [show, setShow] = useState(false);
  const [courses, setCourses] = useState<any>([]);
  const [course, setCourse] = useState<any>({});

  const handleShow = () => {
    setShow(true);
  }
  const getAllcourses = () => {
    getCourses().then((res) => {
      setCourses(res);
    })
  }

  useEffect(() => {
    getAllcourses();
  }, [])

  useEffect(() => {
    console.log(course);

  }, [course])


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
                  <Viewpay onClick={() => {
                    handleShow(),
                      setCourse(course)
                  }}>
                    Comprar - ${course.coursePrice}.00
                  </Viewpay>
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