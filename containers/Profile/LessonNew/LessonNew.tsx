import React, { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { Background, LoaderContain, LoaderImage } from "../../../screens/Login.styled";
import { LeftSide, MainContainer } from "./LessonNew.styled";
import { useCourse } from "../../../hooks/useLesson";
import Video from "./components/Video/Video";
import Modules from "./components/Modules/Modules";
import ActivityModal from "./ActivityModal/ActivityModal";
import RightComponent from "./components/RightComponent/RightComponent";
import { getNotifications, createNotification } from "../../../components/api/notifications";
import lesson from "../../../pages/lesson";
import { useRouter } from "next/router";

const Lesson = () => {
  const context = useAuth();
  const { course, isLoading, tempLesson } = useCourse();
  const [show, setShow] = useState(false);
  const params: any = useRouter()

  const openActivityModal = () => {
    let notification = {
      userId: context.user.user_id,
      type: "14",
      notificationId: '',
      courseId: course.id,
      season: +params.query.season,
      lesson: +params.query.lesson,
      title: course.title,
    }
    getNotifications({ userId: context.user.user_id }).then((res) => {
      if (res.filter((x: any) => x.course_id !== null &&
        x.type === "14" &&
        x.course_id === course.id).length === 0) {
        createNotification(notification);
      }
    })
    setShow(true)
  }

  return (
    <>
      {isLoading ? <Background style={{ justifyContent: "center", alignItems: "center" }}>
        <LoaderImage >
          <LoaderContain />
        </LoaderImage>
      </Background> :
        <MainContainer>
          <LeftSide>
            <Video actualLesson={tempLesson} user={context.user} course={course} openModal={() => { openActivityModal(); }} />
            <Modules lesson={tempLesson} course={course} />
          </LeftSide>
          <RightComponent />
          <ActivityModal show={show} setShow={() => { setShow(false) }} lesson={tempLesson} />
        </MainContainer>}
    </>
  )
}
export default Lesson;