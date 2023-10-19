import React, { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { Background, LoaderContain, LoaderImage } from "../../../screens/Login.styled";
import { LeftSide, MainContainer } from "./LessonNew.styled";
import { useCourse } from "../../../hooks/useLesson";
import Video from "./components/Video/Video";
import Modules from "./components/Modules/Modules";
import ActivityModal from "./ActivityModal/ActivityModal";
import RightComponent from "./components/RightComponent/RightComponent";

const Lesson = () => {
  const context = useAuth();
  const { course, isLoading, tempLesson } = useCourse();
  const [show, setShow] = useState(false);
  return (
    <>
      {isLoading ? <Background style={{ justifyContent: "center", alignItems: "center" }}>
        <LoaderImage >
          <LoaderContain />
        </LoaderImage>
      </Background> :
        <MainContainer>
          <LeftSide>
            <Video actualLesson={tempLesson} user={context.user} course={course} openModal={() => { setShow(true) }} />
            <Modules lesson={tempLesson} course={course} />
          </LeftSide>
          <RightComponent />
          <ActivityModal show={show} setShow={() => { setShow(false) }} lesson={tempLesson} />
        </MainContainer>}
    </>
  )
}
export default Lesson;