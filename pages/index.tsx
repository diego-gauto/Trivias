import { useEffect, useState } from "react";

import { Container } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";

import { GonvarPlusModule } from "../components/Home/GonvarPlusModule/GonvarPlusModule";
import { Module2 } from "../components/Home/Module2/Module2";
import { Module4_Carousel } from "../components/Home/Module4_Carousel/Module4_Carousel";
import { Module5 } from "../components/Home/Module5/Module5";
import { Module6 } from "../components/Home/Module6/Module6";
import {
  DRY_MANICURE_COURSE_ID,
  EXPERTS_ESCULTURAL_COURSE_ID,
  NAILS_MASTER_COURSE_ID,
  SEP_COURSE_ID,
} from "../constants/gonvar";
import { CourseModuleContainer } from "../containers/Home/CourseModuleContainer/CourseModuleContainer";
import { FirstSectionContainer } from "../containers/Home/FirstSectionContainer/FirstSectionContainer";
import { Background, LoaderContain, LoaderImage } from "../screens/Login.styled";
import { getWholeCourse, getWholeCourses } from "../store/actions/courseActions";
import { getLandingData } from "../store/actions/LandingActions";

const Homepage = () => {
  const [loading, setLoading] = useState(true);
  const [landingData, setLandingData] = useState<any>({});
  const [courseData, setCourseData] = useState<any>({});
  const [courses, setCourses] = useState<any>({});

  const responsive380 = useMediaQuery({ query: "(max-width: 390px)" });
  const responsive520 = useMediaQuery({ query: "(max-width: 520px)" });
  const responsive600 = useMediaQuery({ query: "(max-width: 600px)" });
  const responsive800 = useMediaQuery({ query: "(max-width: 800px)" });
  const responsive1023 = useMediaQuery({ query: "(max-width: 1023px)" });

  const fetchLandingData = async () => {
    const landingData = await getLandingData();
    setLandingData(landingData);
    const courseData = await getWholeCourse('dvns4pbd0ZHjFqR9VMks');
    setCourseData(courseData);
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

  useEffect(() => {
    getCourses();
  }, [])

  useEffect(() => {
    fetchLandingData();
  }, []);

  if (loading) {
    return (
      <Background>
        <LoaderImage>
          <LoaderContain />
        </LoaderImage>
      </Background>
    )
  }
  return (
    <Container
      fluid
      style={{
        width: "100%",
        padding: "0",
        maxWidth: "100% !important",
        margin: "0 auto"
      }}>
      <FirstSectionContainer />
      <Module2 featureShowcaseSectionData={landingData.featureShowcaseSectionData} />
      {/* Gonvar Plus Module Card */}
      <GonvarPlusModule />
      {courses &&
        <Module4_Carousel isInfinite={true} slideData={
          courses.map((course: any) => {
            return (
              { isNew: false, title: course.courseTittle, subtitle: "", imgURL: course.coursePath }
            )
          })
        } />
      }

      {/* Nails Master Module Card */}
      <CourseModuleContainer courseId={NAILS_MASTER_COURSE_ID} />

      {courses &&
        <Module4_Carousel isInfinite={true} slideData={
          courses.map((course: any) => {
            return (
              { isNew: false, title: course.courseTittle, subtitle: "", imgURL: course.coursePath }
            )
          })
        } />
      }
      {/* SEP Module Card */}
      {/* <CourseModuleContainer courseId="trY3l4ytjrNbCXXnTBew" /> */}

      {/* Dry's Manicure Module Card */}

      {/* Experts Escultural Module Card */}

      <CourseModuleContainer courseId={SEP_COURSE_ID} />

      {courses &&
        <Module4_Carousel isInfinite={true} slideData={
          courses.map((course: any) => {
            return (
              { isNew: false, title: course.courseTittle, subtitle: "", imgURL: course.coursePath }
            )
          })
        } />
      }
      <CourseModuleContainer courseId={DRY_MANICURE_COURSE_ID} />


      {courses &&
        <Module4_Carousel isInfinite={true} slideData={
          courses.map((course: any) => {
            return (
              { isNew: false, title: course.courseTittle, subtitle: "", imgURL: course.coursePath }
            )
          })
        } />
      }

      <CourseModuleContainer courseId={EXPERTS_ESCULTURAL_COURSE_ID} />

      {courses &&
        <Module4_Carousel isInfinite={true} slideData={
          courses.map((course: any) => {
            return (
              { isNew: false, title: course.courseTittle, subtitle: "", imgURL: course.coursePath }
            )
          })
        } />
      }
      <Module5 reviewsData={landingData.reseniasSectionData} />
      <Module6 slideData={landingData.productosDestacadosData} />
    </Container>
  )
}
export default Homepage;