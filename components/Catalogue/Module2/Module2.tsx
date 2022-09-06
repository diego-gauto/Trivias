

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
                    <PlayIcon />
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