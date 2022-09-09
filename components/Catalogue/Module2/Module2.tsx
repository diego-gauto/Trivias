

import router from "next/router";
import { useEffect, useState } from "react";
import { getViewedCourses } from "../../../store/actions/courseActions";
import {
  Background,
  CardContainer,
  Container,
  ContinueText,
  ImageContain,
  PlayIcon,
  PlayIconS,
  Progress,
  Video,
  VideoContain,
  VideoInfo,
  VideoTitle,
} from "./Module2.styled";

const Module2 = ({ user }: any) => {
  const [course, setCourse] = useState<any>([]);

  useEffect(() => {
    if (user) {
      getViewedCourses(user.id).then((res: any) => {
        setCourse(res);
      });
    }
  }, [user]);

  const goTo = (course: any) => {
    if (user) {
      router.push({
        pathname: 'Lesson',
        query: { id: course.documentID, season: course.season, lesson: course.lesson },
      });
    }
  }

  return (
    <>
      {course.length > 0 &&
        <Container>
          <ContinueText>
            Continua viendo
          </ContinueText>
          <CardContainer>
            {course.map((x: any) => {
              return (
                <Video>
                  <VideoContain>
                    <ImageContain>
                      <Background
                        src="/images/Preview/card1.png"
                        width={400}
                        height={240}
                      />
                    </ImageContain>
                    <PlayIconS />
                    <PlayIcon onClick={() => {
                      goTo(x)
                    }} />
                    <Progress style={{ width: '50%' }} />
                  </VideoContain>
                  <VideoTitle>
                    Lección {x.lesson + 1}: {x.seasons[x.season].lessons[x.lesson].title}
                  </VideoTitle>
                  <VideoInfo>
                    Curso: {x.courseTittle}
                  </VideoInfo>
                </Video>
              )
            })}

          </CardContainer>
        </Container>
      }
    </>
  )
}
export default Module2;