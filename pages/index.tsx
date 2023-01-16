import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { GonvarPlusModule } from "../components/Home/GonvarPlusModule/GonvarPlusModule";
import { Module2_1 } from "../components/Home/Module2_1/Module2_1";
import { Module3_1 } from "../components/Home/Module3_1/Module3_1";
import { Module4_Carousel } from "../components/Home/Module4_Carousel/Module4_Carousel";
import { Module5_1 } from "../components/Home/Module5_1/Module5_1";
import { Module6_1 } from "../components/Home/Module6_1/Module6_1";
import { Module6 } from "../components/Home/Module6/Module6";
import {
  DRY_MANICURE_COURSE_ID,
  EXPERTS_ESCULTURAL_COURSE_ID,
  NAILS_MASTER_COURSE_ID,
  SEP_COURSE_ID,
  GONVAR_PLUS_COURSE_ID,
} from "../constants/gonvar";
import { CourseModuleContainer } from "../containers/Home/CourseModuleContainer/CourseModuleContainer";
import { db } from "../firebase/firebaseConfig";
import { useAuth } from "../hooks/useAuth";
import { getWholeCourse, getWholeCourses } from "../store/actions/courseActions";
import { getLandingData } from "../store/actions/LandingActions";
import Footer from "../components/Footer/Footer";

const Homepage = () => {
  const [loading, setLoading] = useState(true);
  const [landingData, setLandingData] = useState<any>({});
  const [courseData, setCourseData] = useState<any>({});
  const [courses, setCourses] = useState<any>([]);
  const [courseNailsData, setCourseNailsData] = useState<any>([]);
  const [courseGonvarPlus, setCourseGonvarPlus] = useState<any>([]);
  const [courseSEPData, setCourseSEPData] = useState<any>([]);
  const [courseDryData, setCourseDryData] = useState<any>([]);
  const [courseExpData, setCourseExpData] = useState<any>([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  try {
    var userDataAuth = useAuth();
    useEffect(() => {
      if (userDataAuth.user !== null) {
        setLoggedIn(true)
      } else {
        setLoggedIn(false)
      }
    }, [])

  } catch (error) {
    setLoggedIn(false)
  }
  const fetchDB_data = async () => {
    try {
      const query_1 = query(collection(db, "users"), where("uid", "==", userDataAuth.user.id));
      return onSnapshot(query_1, (response: any) => {
        response.forEach((e: any) => {
          setUserData({ ...e.data(), id: e.id });
        });
      })
    } catch (error) {
      return false
    }
  }
  const fetchLandingData = async () => {
    const landingData = await getLandingData();
    setLandingData(landingData);
    const courseData = await getWholeCourse('dvns4pbd0ZHjFqR9VMks');
    setCourseData(courseData);
    const courseGonvarPlus = await getWholeCourse(GONVAR_PLUS_COURSE_ID);
    courseGonvarPlus.totalDuration = hms(courseGonvarPlus.totalDuration)
    setCourseGonvarPlus(courseGonvarPlus);
    const courseNailsData = await getWholeCourse(NAILS_MASTER_COURSE_ID);
    courseNailsData.totalDuration = hms(courseNailsData.totalDuration)
    setCourseNailsData(courseNailsData);
    const courseSEPData = await getWholeCourse(SEP_COURSE_ID);
    courseSEPData.totalDuration = hms(courseSEPData.totalDuration)
    setCourseSEPData(courseSEPData);
    const courseDryData = await getWholeCourse(DRY_MANICURE_COURSE_ID);
    courseDryData.totalDuration = hms(courseDryData.totalDuration)
    setCourseDryData(courseDryData);
    const courseExpData = await getWholeCourse(EXPERTS_ESCULTURAL_COURSE_ID);
    courseExpData.totalDuration = hms(courseExpData.totalDuration)
    setCourseExpData(courseExpData);
    setLoading(false);
  }
  const getCourses = async () => {
    let tempCourses: Array<any> = [];
    getWholeCourses().then((response) => {
      response.forEach((element: any) => {
        if (element.totalLessons > 0) {
          tempCourses.push(element)
        }
      });
      setCourses(tempCourses);
    })
  }

  var obj_1: any =
  {
    "tituloInicial": "hola",
    "parrafoInicial": "hola",
    "parrafoFinal": "hola",
    "botonPrimario": "hola",
    "botonSecundario": "hola",
    "primerCaracteristica": "hola",
    "segundaCaracteristica": "hola",
    "terceraCaracteristica": "hola",
  };

  useEffect(() => {
    getCourses();
  }, [])

  useEffect(() => {
    fetchLandingData();
    fetchDB_data();
  }, []);

  const hms = (totalSeconds: any) => {
    if (typeof totalSeconds == 'string') return totalSeconds
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    let result = `${minutes
      .toString()
      .padStart(1, '0')} min`;
    if (!!hours) {
      result = `${hours.toString()} hr ${minutes} min`;
    }
    return result;
  }


  return (
    <Container
      fluid
      style={{
        width: "100%",
        padding: "0",
        maxWidth: "100% !important",
        margin: "0 auto",
        backgroundColor: "#ede7f2",
      }} id="landing">
      <Module2_1 title="" features={[]} img="landing/HeroImage" data={obj_1} user={userData} />
      <Module3_1 />
      {/* Gonvar Plus Module Card */}
      <GonvarPlusModule loggedIn={loggedIn} user={userData} courseId={courseGonvarPlus} />
      {courses &&
        <Module4_Carousel type={'subscription'} isInfinite={true} title={courseGonvarPlus.courseTittle} slideData={
          courses
        } />
      }
      {/* Nails Master Module Card */}
      <CourseModuleContainer courseId={NAILS_MASTER_COURSE_ID} num={1} loggedIn={loggedIn} user={userData} />
      {courseNailsData &&
        <Module4_Carousel type={"product"} isInfinite={true} title={courseNailsData.courseTittle} slideData={
          courseNailsData.lessons
        } />
      }
      {/* SEP Module Card */}
      <CourseModuleContainer courseId={SEP_COURSE_ID} num={2} loggedIn={loggedIn} user={userData} />
      {courseSEPData &&
        <Module4_Carousel type={"product"} isInfinite={true} title={courseSEPData.courseTittle} slideData={
          courseSEPData.lessons
        } />
      }
      {/* Dry's Manicure Module Card */}
      <CourseModuleContainer courseId={DRY_MANICURE_COURSE_ID} num={3} loggedIn={loggedIn} user={userData} />
      {courses &&
        <Module4_Carousel type={"product"} isInfinite={true} title={courseDryData.courseTittle} slideData={
          courseDryData.lessons
        } />
      }
      {/* Experts Escultural Module Card */}
      <CourseModuleContainer courseId={EXPERTS_ESCULTURAL_COURSE_ID} num={4} loggedIn={loggedIn} user={userData} />
      {courses &&
        <Module4_Carousel type={"product"} isInfinite={true} title={courseExpData.courseTittle} slideData={
          courseExpData.lessons
        } />
      }
      <Module5_1 slideData={landingData.experienciasSectionData} />
      <Module6_1 slideData={landingData.productosDestacadosData} />
      {/* <Footer /> */}
    </Container>
  )
}
export default Homepage;