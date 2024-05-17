import React, { useContext, useEffect, useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import {
  Background,
  LoaderContain,
  LoaderImage,
} from '../../../screens/Login.styled';
import { LeftSide, MainContainer } from './LessonNew.styled';
import { useCourse } from '../../../hooks/useLesson';
import Video from './components/Video/Video';
import Modules from './components/Modules/Modules';
import RightComponent from './components/RightComponent/RightComponent';
import { IUserInfoResult } from '../../../interfaces/IUser';
import { IUseAuthProps } from '../../../interfaces/IUseAuthProps';
import {
  HomeworksContext,
  HomeworksProvider,
} from '../../../hooks/useHomeworks';

const Lesson = () => {
  const context = useAuth();
  const { course, isLoading, tempLesson } = useCourse();
  const [show, setShow] = useState(false);
  const { loadHomeworks } = useContext(HomeworksContext);

  useEffect(() => {
    if (!context || !course) {
      return;
    }
    const params = {
      user_id: context.user!.id,
      course_id: course.id,
    };
    if (!isLoading) loadHomeworks(params);
  }, [isLoading]);

  return (
    <>
      {isLoading ? (
        <Background style={{ justifyContent: 'center', alignItems: 'center' }}>
          <LoaderImage>
            <LoaderContain />
          </LoaderImage>
        </Background>
      ) : (
        <MainContainer>
          <LeftSide>
            <Video
              actualLesson={tempLesson}
              user={context.user as IUserInfoResult}
              course={course}
              openModal={() => {
                setShow(true);
              }}
            />
            <Modules
              lesson={tempLesson}
              course={course}
              show={show}
              setShow={setShow}
            />
          </LeftSide>
          <RightComponent context={context as IUseAuthProps} course={course} />
        </MainContainer>
      )}
    </>
  );
};

const LessonWrapper = () => {
  return (
    <HomeworksProvider>
      <Lesson />
    </HomeworksProvider>
  );
};

export default LessonWrapper;
