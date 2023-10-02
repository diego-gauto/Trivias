import React, { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { Background, LoaderContain, LoaderImage } from "../../../screens/Login.styled";
import { LeftSide, MainContainer } from "./LessonNew.styled";
import { lessonGuard } from "./utils/functions";
import { useCourse } from "../../../hooks/useLesson";
import Video from "./components/Video/Video";
import Modules from "./components/Modules/Modules";

const Lesson = () => {
  const context = useAuth();
  const { course, isLoading, tempLesson } = useCourse();

  useEffect(() => {
    lessonGuard(context.user);
  }, [])

  return (
    <>
      {isLoading ? <Background style={{ justifyContent: "center", alignItems: "center" }}>
        <LoaderImage >
          <LoaderContain />
        </LoaderImage>
      </Background> :
        <MainContainer>
          <LeftSide>
            <Video lesson={tempLesson} user={context.user} />
            <Modules lesson={tempLesson} course={course} />
          </LeftSide>

        </MainContainer>}
    </>
  )
}
export default Lesson;