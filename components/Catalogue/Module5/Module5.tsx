import React, { useEffect, useState } from "react";

import Link from "next/link";

import { LOGIN_PATH } from "../../../constants/paths";
import {
  InsideContent,
  InsideText,
  Text1,
  Text2,
  Text3,
} from "../Module3/Module3.styled";
import { CardImage, VideoInfo, Viewpay } from "../Module4/Module4.styled";
import {
  Banner2,
  ButtonContain,
  Cardcontent2,
  CardContain,
  Content,
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
  ImageContent,
} from "./Module5.styled";
import { useRouter } from "next/router";

const Module5 = ({ user, course }: any) => {
  const [courses, setCourses] = useState<any>([]);
  let today = new Date().getTime() / 1000;
  const router = useRouter();

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
          {(!user || (user && user.membership.finalDate < today)) ? <Title>
            Conoce nuestra suscripción
          </Title> :
            <Title>
              Disfruta de tu suscripción Gonvar+
            </Title>}
          <TextContent>
            {/* <LimitTime>
              Tiempo ilimitado por $89.99 al mes
            </LimitTime> */}
            {(!user || (user && user.membership.finalDate < today)) && <SuscribeText>
              Suscríbete a
              <SpanText>
                Gonvar+
              </SpanText>
            </SuscribeText>}
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
                        height="100%"
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
                          Curso: {course.courseTittle}
                          <Text2>
                            {course.courseSubtittle}...
                          </Text2>
                        </Text1>
                        <Text3>
                          {course.courseAbout}...
                        </Text3>
                      </TextContain>
                      {(user && user.membership.finalDate > today) && <Viewpay onClick={() => { goTo(course) }}>
                        Ver curso
                      </Viewpay>}
                      {(!user || user.membership.finalDate < today) && <Viewpay onClick={() => { goTo(course) }}>
                        Comprar Gonvar+
                      </Viewpay>}
                    </VideoInfo>
                  </Cardcontent2>
                </>
              )
            })}
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
    </MainContainer >
  )
}
export default Module5;
