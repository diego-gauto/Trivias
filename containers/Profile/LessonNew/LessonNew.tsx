import React, { useContext, useEffect, useState } from "react";
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
import { IUserInfoResult } from "../../../interfaces/IUser";
import { ICourseResponse, ILesson } from "../../../interfaces/ICourseNew";
import { IUseAuthProps } from "../../../interfaces/IUseAuthProps";
import { IReducedHomework } from "../../../interfaces/IHomeworkByUser";
import { getCourseHomeworksOfUser } from "../../../components/api/homeworks";
import { HomeworksContext, HomeworksProvider } from "../../../hooks/useHomeworks";

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
  const [position, setPosition] = useState(1);
  const { loadHomeworks } = useContext(HomeworksContext);

  useEffect(() => {
    if ((!context) || (!course)) {
      return;
    }
    const params = {
      user_id: context.user!.id,
      course_id: course.id
    }
    if (!isLoading) loadHomeworks(params);
  }, [isLoading]);

  return (
    <>
      {isLoading ? <Background style={{ justifyContent: "center", alignItems: "center" }}>
        <LoaderImage >
          <LoaderContain />
        </LoaderImage>
      </Background> :
        <MainContainer>
          <LeftSide>
            <Video actualLesson={tempLesson} user={context.user as IUserInfoResult} course={course} openModal={() => { setShow(true) }} />
            <Modules lesson={tempLesson} course={course} position={position} setPosition={setPosition} />
          </LeftSide>
          <RightComponent context={context as IUseAuthProps} course={course} />
          <ActivityModal show={show} setShow={() => { setShow(false) }} lesson={tempLesson} changeValue={setPosition} />
        </MainContainer>}
    </>
  )
}

const LessonWrapper = () => {
  return (
    <HomeworksProvider>
      <Lesson />
    </HomeworksProvider>
  )
}

export default LessonWrapper;