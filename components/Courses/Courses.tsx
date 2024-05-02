import React, { useEffect, useState } from 'react';

import { BsChevronDoubleDown, BsTriangle } from 'react-icons/bs';
import ReactPlayer from 'react-player';

import { useRouter } from 'next/router';

import {
  ANUAL_FORM,
  LESSON_PATH,
  LOGIN_PATH,
  NAILS_FORM,
  PLAN_PATH,
  PURCHASE_PATH,
} from '../../constants/paths';
import { getAllCourseDataApi, getCoursesApi } from '../api/lessons';
import { getUserApi } from '../api/users';
import CourseModal from '../Modals/CourseModal/CourseModal';
import {
  Container,
  CoursesContain,
  Gradient,
  PurpleButton,
  SubText,
  Title,
  TransparentButton,
} from './Courses.styled';
import { ICourses, ILessons, ISeasons } from './ICourses';
import Sliders from './Modules/Sliders';
import { useMediaQuery } from 'react-responsive';
import { haveAccess } from '../GlobalFunctions';

const Courses = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [courses, setCourses] = useState<any>([]);
  const [userData, setUserData] = useState<any>(null);
  const [videoCourse, setVideoCourse] = useState<any>([]);
  const [courseForModal, setCourseForModal] = useState<any>({});
  const [loggedIn, setLoggedIn] = useState(false);
  let today = new Date().getTime() / 1000;
  const responsive800 = useMediaQuery({ query: '(max-width: 800px)' });
  const [seasonIndex, setSeasonIndex] = useState<number>(0);
  const [lessonIndex, setLessonIndex] = useState<number>(0);

  const [show, setShow] = useState<boolean>(false);
  const router = useRouter();
  let courseSections = [
    'continue-watching',
    'free-courses',
    'product-courses',
    'special-courses',
    'art-courses',
    'structure-courses',
    'makeup-courses',
  ];
  window.addEventListener('resize', () => {
    setInnerWidth(window.innerWidth <= 400 ? 399 : window.innerWidth);
  });
  // aquí hay un problema
  // Agregar 10 dias de gracia (1, 4, 7)
  const goToNew = () => {
    if (userData) {
      if (
        haveAccess(
          userData.level,
          userData.final_date,
          userData.role,
          userData.method,
        )
      ) {
        router.push({
          pathname: LESSON_PATH,
          query: {
            id: videoCourse.id,
            season: seasonIndex,
            lesson: lessonIndex,
          },
        });
      } else {
        router.push(PLAN_PATH);
      }
    } else {
      localStorage.setItem('plan', 'true');
      router.push({ pathname: LOGIN_PATH });
    }
  };
  const handleOpen = () => {
    setShow(true);
  };
  useEffect(() => {
    if (localStorage.getItem('email')) {
      getUserApi(localStorage.getItem('email')).then((res) => {
        setLoggedIn(true);
        setUserData(res);
        // coursesAll(res);
        getAllCourseDataApi(res.id).then((data) => {
          setCourses(data);
          setVideoCourse(data.video_preview);
          setSeasonIndex(data.video_preview.currentSeason);
          setLessonIndex(data.video_preview.currentLesson);
          setLoading(false);
        });
      });
    } else {
      // coursesAll(null);
      getAllCourseDataApi(null).then((data) => {
        setCourses(data);
        setVideoCourse(data.video_preview);
        setSeasonIndex(0);
        setLessonIndex(0);
        setLoading(false);
      });
    }
  }, []);
  return (
    <CoursesContain>
      {/* VIDEO  */}
      <Container>
        <div
          className={
            loading ? 'skeleton-product video-display' : 'video-display'
          }
        >
          <div className='image-container'>
            <div className='video-container'>
              {!loading && (
                <ReactPlayer
                  url={
                    videoCourse.seasons[seasonIndex].lessons[lessonIndex].link
                  }
                  className='absolute'
                  playing={true}
                  muted={true}
                  loop={true}
                  playsinline
                  width='100%'
                  height='100%'
                />
              )}
            </div>
          </div>
          <div className='text-container'>
            <div className='grey-field'>
              <div className='top'>
                <img
                  style={{ margin: 0 }}
                  src='../images/purchase/logo.png'
                  alt=''
                />
                <h1>Gonvar+</h1>
              </div>
              <Title>{!loading && videoCourse.title}</Title>
            </div>
            <div className='grey-field'>
              <SubText>
                {!loading &&
                  (videoCourse.professors.length > 0
                    ? videoCourse.professors[0].name
                    : 'Arita Gonvar')}
              </SubText>
            </div>
            <div className='button-contain'>
              <div className='grey-field' style={{ maxWidth: 'fit-content' }}>
                <PurpleButton onClick={goToNew}>
                  <BsTriangle />
                  Reproducir
                </PurpleButton>
              </div>
              <div className='grey-field' style={{ maxWidth: 'fit-content' }}>
                <TransparentButton onClick={handleOpen}>
                  Más información
                </TransparentButton>
              </div>
            </div>
          </div>
          <Gradient></Gradient>
        </div>
      </Container>
      {!loading && (
        <div className='slide-down'>
          <p>
            Desliza hacia abajo {responsive800 && <br />}para ver todos los
            cursos disponibles
          </p>
          <BsChevronDoubleDown />
        </div>
      )}

      {/* SLIDERS */}
      <div className='module-contain'>
        {courseSections.map((slideType: string, index: number) => {
          return (
            <Sliders
              slideType={slideType}
              slideNumber={index}
              containLoader={loading}
              innerWidth={innerWidth}
              allCourses={courses}
              user={userData}
              key={'Course-slider-' + index}
            />
          );
        })}
      </div>
      <CourseModal
        show={show}
        setShow={setShow}
        course={videoCourse}
        user={userData}
      />
    </CoursesContain>
  );
};
export default Courses;
