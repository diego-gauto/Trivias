import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { GonvarPlusModule } from "../components/Home/GonvarPlusModule/GonvarPlusModule";
import { Module2_1 } from "../components/Home/Module2_1/Module2_1";
import { Module3_1 } from "../components/Home/Module3_1/Module3_1";
import { Module4_Carousel } from "../components/Home/Module4_Carousel/Module4_Carousel";
import { Module5_1 } from "../components/Home/Module5_1/Module5_1";
import { Module6_1 } from "../components/Home/Module6_1/Module6_1";
import { CourseModuleContainer } from "../containers/Home/CourseModuleContainer/CourseModuleContainer";
import { getUserApi } from "../components/api/users";
import { getLandingCoursesApi } from "../components/api/lessons";
import { getLandingProductApi, getLandingReviewApi } from "../components/api/admin";
import WelcomeModal from "../components/WelcomeModal/WelcomeModal";

const Homepage = () => {
  const [loading, setLoading] = useState(true);
  const [courseNailsData, setCourseNailsData] = useState<any>([]);
  const [courseGonvarPlus, setCourseGonvarPlus] = useState<any>([]);
  const [courseSEPData, setCourseSEPData] = useState<any>([]);
  const [reviews, setReviews] = useState<any>([]);
  const [product, setProduct] = useState<any>([]);
  const [userData, setUserData] = useState<any>(null);
  const [welcomeModal, setWelcomeModal] = useState<boolean>(false);
  const [loggedIn, setLoggedIn] = useState(false);

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
    if (localStorage.getItem("email")) {
      getUserApi(localStorage.getItem("email")).then((res) => {
        setLoggedIn(true);
        setUserData(res);
        getLandingCoursesApi(res.id).then((data) => {
          data.gonvar_courses.forEach((course: any) => {
            course.totalDuration = hms(course.totalDuration);
          })
          setCourseGonvarPlus(data.gonvar_courses);
          data.nails_master.totalDuration = hms(data.nails_master.totalDuration);
          setCourseNailsData(data.nails_master);
          data.alineacion_cert.totalDuration = hms(data.alineacion_cert.totalDuration)
          setCourseSEPData(data.alineacion_cert);
          setLoading(true);
        })
      })
    }
    else {
      setWelcomeModal(true)
      getLandingCoursesApi(null).then((data) => {
        data.gonvar_courses.forEach((course: any) => {
          course.totalDuration = hms(course.totalDuration);
        })
        setCourseGonvarPlus(data.gonvar_courses);
        data.nails_master.totalDuration = hms(data.nails_master.totalDuration);
        setCourseNailsData(data.nails_master);
        data.alineacion_cert.totalDuration = hms(data.alineacion_cert.totalDuration)
        setCourseSEPData(data.alineacion_cert);
        setLoading(true);
      })
    }
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
    // fetchLandingData();
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
        overflow: "hidden",
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
      <WelcomeModal show={welcomeModal} setShow={setWelcomeModal} />
      {/* <Footer /> */}
    </Container>
  )
}
export default Homepage;