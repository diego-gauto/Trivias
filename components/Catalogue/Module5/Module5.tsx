import React, { useEffect, useState } from "react";

import Link from "next/link";

import { LOGIN_PATH } from "../../../constants/paths";
import { getCourses, getWholeCourses } from "../../../store/actions/courseActions";
import {
  ImageContent,
  InsideContent,
  InsideText,
  Text1,
  Text2,
  Text3,
} from "../Module3/Module3.styled";
import { CardImage } from "../Module4/Module4.styled";
import {
  Banner2,
  ButtonContain,
  Cardcontent2,
  CardContain,
  Content,
  Divider,
  ImageContain,
  MainContainer,
  PurpleButton,
  RespContain,
  SpanText,
  SuscribeText,
  TextContain,
  TextContainer,
  TextContent,
  Title,
} from "./Module5.styled";

const Module5 = ({ user, course }: any) => {
  const [courses, setCourses] = useState<any>([]);

  useEffect(() => {
    if (course) {
      let temp_courses: any = [];
      course.forEach((element: any) => {
        if (element.courseType == 'Mensual') {
          element.courseAbout = element.courseAbout.slice(0, 50)
          temp_courses.push(element);
        }
      });
      setCourses(temp_courses);
    }
  }, [course])

  return (
    <MainContainer>
      <ImageContain>
        <Banner2
          src="/images/Preview/fondo2.png"
          layout='fill'
        />
      </ImageContain>
      <Content>
        <TextContainer>
          <Title>
            Conoce nuestra suscripción
          </Title>
          <TextContent>
            {/* <LimitTime>
              Tiempo ilimitado por $89.99 al mes
            </LimitTime> */}
            <SuscribeText>
              Suscríbete a
              <SpanText>
                Gonvar Plus
              </SpanText>
            </SuscribeText>
          </TextContent>
        </TextContainer>
        <RespContain>
          <CardContain>
            {courses.map((course: any, index: any) => {
              return (
                < >
                  <Cardcontent2>
                    <ImageContent>
                      <CardImage
                        src={course.coursePath}
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
                    <TextContain>
                      <Text1>
                        Curso: {course.courseTittle}
                        <Text2>
                          {course.courseCategory}
                        </Text2>
                      </Text1>
                      <Text3>
                        {course.courseAbout}...
                      </Text3>
                    </TextContain>
                  </Cardcontent2>
                  {(index == 0 && courses.length > 1) && < Divider >
                    +
                  </Divider>}
                  {(index == 1 && courses.length > 2) && < Divider >
                    +
                  </Divider>}
                </>
              )
            })}
          </CardContain>
        </RespContain>
        <ButtonContain>
          {user && <Link href={{ pathname: 'Purchase', query: { type: 'subscription' } }}>
            <PurpleButton>
              Adquiere Gonvar Plus
            </PurpleButton>
          </Link>}
          {!user && <Link href={LOGIN_PATH}>
            <PurpleButton>
              Adquiere Gonvar Plus
            </PurpleButton>
          </Link>}
        </ButtonContain>
      </Content>
    </MainContainer >
  )
}
export default Module5;
