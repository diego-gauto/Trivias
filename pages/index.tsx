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
import { getTeacher, getWholeCourse, getWholeCourses } from "../store/actions/courseActions";
import { getLandingData } from "../store/actions/LandingActions";
import { getUserApi } from "../components/api/users";
import { getCoursesApi } from "../components/api/lessons";
import { getLandingProductApi, getLandingReviewApi } from "../components/api/admin";

const Homepage = () => {
  const [loading, setLoading] = useState(true);
  const [landingData, setLandingData] = useState<any>({});
  const [courseNailsData, setCourseNailsData] = useState<any>([]);
  const [courseGonvarPlus, setCourseGonvarPlus] = useState<any>([]);
  const [courseSEPData, setCourseSEPData] = useState<any>([]);
  const [reviews, setReviews] = useState<any>([]);
  const [product, setProduct] = useState<any>([]);
  const [userData, setUserData] = useState<any>(null);
  const [loggedIn, setLoggedIn] = useState(false);
  let today = new Date().getTime() / 1000;

  // try {
  //   var userDataAuth = useAuth();
  //   useEffect(() => {
  //     if (userDataAuth.user !== null) {
  //       setLoggedIn(true)
  //     } else {
  //       setLoggedIn(false)
  //     }
  //   }, [])

  // } catch (error) {
  //   setLoggedIn(false)
  // }
  // const fetchDB_data = async () => {
  //   try {
  //     const query_1 = query(collection(db, "users"), where("uid", "==", userDataAuth.user.id));
  //     return onSnapshot(query_1, (response: any) => {
  //       response.forEach((e: any) => {
  //         setUserData({ ...e.data(), id: e.id });
  //       });
  //     })
  //   } catch (error) {
  //     return false
  //   }
  // }
  const fetchLandingData = async () => {
    const landingData = await getLandingData();
    setLandingData(landingData);
    setLoading(false);
  }
  // const getCourses = async (professor: any) => {
  //   let tempCourses: Array<any> = [];
  //   let tempProfessor: Array<any> = professor;
  //   getWholeCourses().then((response) => {
  //     response.forEach((element: any) => {
  //       if (element.totalLessons > 0) {
  //         element.courseProfessor.map((profId: string, index: number) => {
  //           tempProfessor.map((val: any) => {
  //             if (profId.includes(val.id)) {
  //               element.courseProfessor[index] = val;
  //             }
  //           })
  //         })
  //         tempCourses.push(element)
  //       }
  //     });
  //     setCourses(tempCourses);
  //   })
  // }
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
  // const getProffessors = () => {
  //   getTeacher().then((res) => {
  //     getCourses(res);
  //     return res;
  //   })
  // }
  // useEffect(() => {
  //   getProffessors();
  // }, [])
  const coursesAll = (user: any) => {
    getCoursesApi().then((res) => {
      let tempCourses = res;
      let gonvarPlusCourses = [];
      let nailsMaster = tempCourses;
      let alineacionCert = tempCourses;
      gonvarPlusCourses = tempCourses.filter((course: any) => {
        course.totalDuration = hms(course.totalDuration) && 0
        return course.type === "Mensual"
      })
      nailsMaster = tempCourses.filter((course: any) => {
        if (course.id === 30) {
          course.lessons = [];
          if (user && user.user_courses) {
            user.user_courses.forEach((courses: any) => {
              if ((courses.final_date > today) && (course.id === courses.course_id)) {
                course.pay = true;
              }
              else {
                course.pay = false;
              }
            });
          }
          course.seasons.forEach((season: any) => {
            season.lessons.forEach((lesson: any) => {
              lesson.seasons = course.seasons;
              lesson.professors = course.professors;
              lesson.materials = course.materials;
              lesson.categories = course.categories;
              lesson.image = lesson.banner;
              course.lessons.push(lesson);
            });
          });
        }
        course.totalDuration = hms(course.totalDuration) && 0
        return course.id === 30
      })
      alineacionCert = tempCourses.filter((course: any) => {
        if (course.id === 45) {
          course.lessons = [];
          if (user && user.user_courses) {
            user.user_courses.forEach((courses: any) => {
              if ((courses.final_date > today) && (course.id === courses.course_id)) {
                course.pay = true;
              }
              else {
                course.pay = false;
              }
            });
          }
          course.seasons.forEach((season: any) => {
            season.lessons.forEach((lesson: any) => {
              lesson.seasons = course.seasons;
              lesson.professors = course.professors;
              lesson.materials = course.materials;
              lesson.categories = course.categories;
              lesson.image = lesson.banner;
              course.lessons.push(lesson);
            });
          });
        }
        course.totalDuration = hms(course.totalDuration) && 0
        return course.id === 45
      })
      setCourseGonvarPlus(gonvarPlusCourses);
      setCourseNailsData(nailsMaster[0]);
      setCourseSEPData(alineacionCert[0]);
      setLoading(true);
    })
  }
  useEffect(() => {
    getLandingReviewApi().then((res) => {
      let reviewData: any = [];
      res.forEach((review: any) => {
        let tempReview = {
          descripcion: review.about,
          id: review.id,
          convertedDate: review.date,
          imgURL: review.image,
          usrFacebookURL: review.facebook_url,
          isNew: review.new === 0 ? false : true,
          username: review.user_name,
          usrImgURL: review.user_image,
        }
        reviewData.push(tempReview)
      });
      setReviews(reviewData);
    })
    getLandingProductApi().then((res) => {
      let productData: any = [];
      res.forEach((product: any) => {
        let tempProduct = {
          clickURL: product.url,
          id: product.id,
          compraRapida: product.purchase === 0 ? false : true,
          currency: product.currency,
          disponible: product.available === 0 ? false : true,
          imgURL: product.image,
          title: product.title,
          isNew: product.is_new === 0 ? false : true,
          precio: product.price,
        }
        productData.push(tempProduct)
      });
      setProduct(productData);
    })
    fetchLandingData();
    if (localStorage.getItem("email")) {
      getUserApi(localStorage.getItem("email")).then((res) => {
        setLoggedIn(true);
        setUserData(res);
        coursesAll(res);
      })
    }
    else {
      coursesAll(null);
    }
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
      <GonvarPlusModule loggedIn={loggedIn} user={userData} courses={courseGonvarPlus} />
      {courseGonvarPlus &&
        <Module4_Carousel user={userData} courses={courseGonvarPlus} type={'subscription'} isInfinite={true} title={courseGonvarPlus.title} slideData={
          courseGonvarPlus
        } />
      }
      {/* Nails Master Module Card */}
      <CourseModuleContainer courses={courseNailsData} num={1} loggedIn={loggedIn} user={userData} />
      {courseNailsData &&
        <Module4_Carousel user={userData} courses={courseNailsData} type={"product"} isInfinite={true} title={courseNailsData.title}
          slideData={courseNailsData.lessons}
        />
      }
      {/* SEP Module Card */}
      <CourseModuleContainer courses={courseSEPData} num={2} loggedIn={loggedIn} user={userData} />
      {courseSEPData &&
        <Module4_Carousel user={userData} courses={courseSEPData} type={"product"} isInfinite={true} title={courseSEPData.title} slideData={
          courseSEPData.lessons
        } />
      }
      <Module5_1 slideData={reviews} />
      <Module6_1 slideData={product} />
      {/* <Footer /> */}
    </Container>
  )
}
export default Homepage;