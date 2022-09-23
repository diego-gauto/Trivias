

import { DocumentData } from "firebase/firestore";
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

const Module2 = ({ user, allCourses }: any) => {
  const [course, setCourse] = useState<any>([]);

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
              element.progress = tempCourse[0].seasons[element.season].lessons[element.lesson].progress
            }
            tempCourses.push(element)
          }
        });
        setCourse(tempCourses);
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
                <Video onClick={() => {
                  goTo(x)
                }}>
                  <VideoContain>
                    <ImageContain>
                      <Background
                        src={x.coursePath}
                        width={400}
                        height={240}
                      />
                    </ImageContain>
                    <PlayIconS />
                    <PlayIcon />
                    <Progress style={{ width: `${x.progress}%` }} />
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