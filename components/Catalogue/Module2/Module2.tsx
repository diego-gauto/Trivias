

import { DocumentData } from "firebase/firestore";
import router from "next/router";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { getViewedCourses } from "../../../store/actions/courseActions";
import { RespContain } from "../Module5/Module5.styled";
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
  const [width, setWidth] = useState<any>(0);
  const ref = useRef(null);
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
  window.addEventListener('resize', function (event) {
    let cardWidth: any = document.getElementById('card-container')?.offsetWidth;
    let cardStyle: any = document.getElementById('shadow');
    if (window.innerWidth < cardWidth) {
      cardStyle.style.display = 'flex';
    } else {
      cardStyle.style.display = 'none';
    }
  },);

  useLayoutEffect(() => {
    let cardWidth: any = document.getElementById('card-container')?.offsetWidth;
    let cardStyle: any = document.getElementById('shadow');
    if (window.innerWidth < cardWidth) {
      cardStyle.style.display = 'flex';
    } else {
      cardStyle.style.display = 'none';
    }
  }, [])

  return (
    <>
      {course.length > 0 &&
        <Container>
          <ContinueText>
            Continua viendo
          </ContinueText>
          <RespContain>
            <CardContainer id="card-container">
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
              <div id="shadow" className="right-shadow"></div>
            </CardContainer>
          </RespContain>
        </Container>
      }
    </>
  )
}
export default Module2;