import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { GonvarPlusModule } from "../components/Home/GonvarPlusModule/GonvarPlusModule";
import { Module2_1 } from "../components/Home/Module2_1/Module2_1";
import { Module3_1 } from "../components/Home/Module3_1/Module3_1";
import { Module4_Carousel } from "../components/Home/Module4_Carousel/Module4_Carousel";
import { Module5_1 } from "../components/Home/Module5_1/Module5_1";
import { Module6 } from "../components/Home/Module6/Module6";
import {
  DRY_MANICURE_COURSE_ID,
  EXPERTS_ESCULTURAL_COURSE_ID,
  NAILS_MASTER_COURSE_ID,
  SEP_COURSE_ID,
} from "../constants/gonvar";
import { CourseModuleContainer } from "../containers/Home/CourseModuleContainer/CourseModuleContainer";
import { getWholeCourse, getWholeCourses } from "../store/actions/courseActions";
import { getLandingData } from "../store/actions/LandingActions";

const Homepage = () => {
  const [loading, setLoading] = useState(true);
  const [landingData, setLandingData] = useState<any>({});
  const [courseData, setCourseData] = useState<any>({});
  const [courses, setCourses] = useState<any>([]);
  const [courseNailsData, setCourseNailsData] = useState<any>([]);
  const [courseSEPData, setCourseSEPData] = useState<any>([]);


  const fetchLandingData = async () => {
    const landingData = await getLandingData();
    setLandingData(landingData);
    const courseData = await getWholeCourse('dvns4pbd0ZHjFqR9VMks');
    setCourseData(courseData);
    const courseNailsData = await getWholeCourse(NAILS_MASTER_COURSE_ID);
    setCourseNailsData(courseNailsData);
    const courseSEPData = await getWholeCourse(SEP_COURSE_ID);
    setCourseSEPData(courseSEPData);
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
  }, []);

  return (
    <Container
      fluid
      style={{
        width: "100%",
        padding: "0",
        maxWidth: "100% !important",
        margin: "0 auto"
      }}>
      <Module2_1 title="" features={[]} img="landing/HeroImage" data={obj_1} />
      <Module3_1 />
      {/* Gonvar Plus Module Card */}
      <GonvarPlusModule />
      {courses &&
        <Module4_Carousel type={'subscription'} isInfinite={true} slideData={
          courses
        } />
      }
      {/* Nails Master Module Card */}
      <CourseModuleContainer courseId={NAILS_MASTER_COURSE_ID} num={1} />
      {courseNailsData &&
        <Module4_Carousel type={"product"} isInfinite={true} slideData={
          courseNailsData.lessons
        } />
      }
      {/* SEP Module Card */}
      <CourseModuleContainer courseId={SEP_COURSE_ID} num={2} />
      {courseSEPData &&
        <Module4_Carousel type={"product"} isInfinite={true} slideData={
          courseSEPData.lessons
        } />
      }
      {/* Dry's Manicure Module Card */}
      <CourseModuleContainer courseId={DRY_MANICURE_COURSE_ID} num={3} />
      {courses &&
        <Module4_Carousel type={"subscription"} isInfinite={true} slideData={
          courses
        } />
      }
      {/* Experts Escultural Module Card */}
      <CourseModuleContainer courseId={EXPERTS_ESCULTURAL_COURSE_ID} num={4} />
      {courses &&
        <Module4_Carousel type={"subscription"} isInfinite={true} slideData={
          courses
        } />
      }
      <Module5_1 slideData={landingData.productosDestacadosData} />
      <Module6 slideData={landingData.productosDestacadosData} />
    </Container>
  )
}
export default Homepage;