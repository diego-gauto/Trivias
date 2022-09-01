import Link from 'next/link';
import { ImageContent, InsideContent, InsideText, Text1, Text2, Text3 } from '../Module3/Module3.styled';
import { CardImage } from "../Module4/Module4.styled";
import React, { useEffect, useState } from "react";
import { getCourses, getWholeCourses } from "../../../store/actions/courseActions";
import { Banner2, ImageContain, CardContain, Cardcontent, Content, LimitTime, MainContainer, SpanText, SuscribeText, TextContent, Title, TextContain, TextContainer, PurpleButton, ButtonContain, Divider, RespContain, Cardcontent2, Cardcontent3 } from './Module5.styled';

const Module5 = ({ user }: any) => {
  const [courses, setCourses] = useState<any>([]);

  const getCourses = () => {
    let temp_courses: any = [];
    getWholeCourses().then((response) => {
      response.forEach((element: any) => {
        if (element.courseType == 'Mensual') {
          element.courseAbout = element.courseAbout.slice(0, 50)
          temp_courses.push(element);
        }
      });
      setCourses(temp_courses);
    })
  }
  useEffect(() => {
    getCourses();
  }, [])
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
          {!user && <Link href={{ pathname: 'auth/Login' }}>
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
