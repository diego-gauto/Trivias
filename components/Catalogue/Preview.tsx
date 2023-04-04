

import Module1 from "./Module1/Module1";
import Module2 from "./Module2/Module2";
import Module3 from "./Module3/Module3";
import Module4 from "./Module4/Module4";
import Module5 from "./Module5/Module5";
import { ModuleContain, PreviewContain } from "./Preview.styled";
import { Background, LoaderContain, LoaderImage } from "../../screens/Login.styled";
import { collection, onSnapshot, query, where, getDocs, orderBy, DocumentData } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { getTeacher, getWholeCourses } from "../../store/actions/courseActions";
import Module6 from "./Module6/Module6";
import { getUserApi } from "../api/users";
import { addCourse, getCoursesApi } from "../api/lessons";


const Preview = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [courses, setCourses] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [firstLoad, setFirstLoad] = useState(true);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

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

  useEffect(() => {
    if (localStorage.getItem("email")) {
      getUserApi(localStorage.getItem("email")).then((res) => {
        setLoggedIn(true);
        setUserData(res);
      })
    }
  }, [])


  window.addEventListener("resize", () => {
    setInnerWidth(window.innerWidth <= 400 ? 399 : window.innerWidth);
  });

  const add = () => {
    courses.forEach((element: any) => {
      let tempCoures = {
        title: element.courseTittle,
        subtitle: element.courseSubtittle,
        about: element.courseAbout,
        certificate_color: element.courseCertificateColor || "naranja",
        difficulty: element.courseDifficulty,
        mandatory: element.courseHomeWork,
        image: element.coursePath,
        phrase: element.coursePhrase,
        price: element.coursePrice,
        duration: element.courseDuration,
        rating: element.courseRating,
        reviews: 0,
        type: element.courseType,
        sequential: element.courseHomeWork,
        published: true,
        categories: element.courseCategory,
        materials: element.courseMaterial,
        seasons: element.seasons
      }
      addCourse(tempCoures).then((res) => {
        console.log(res);
      })
    });

  }

  const coursesAll = () => {
    getCoursesApi().then((res) => {
      setCourses(res.data.data);
      setIsLoading(false);
    })
  }

  useEffect(() => {
    coursesAll()
  }, [])

  return (
    <>
      <PreviewContain>
        {/* <Module1 user={userData} allCourses={courses[12]} isLoading={isLoading} professor={professors} /> */}
        <ModuleContain>
          {/* {userData && <Module2 user={userData} allCourses={courses} isLoading={isLoading} innerWidth={innerWidth} professor={professors} />}
          {userData && <Module3 user={userData} allCourses={courses} isLoading={isLoading} innerWidth={innerWidth} />}
          <Module4 user={userData} allCourses={courses} isLoading={isLoading} innerWidth={innerWidth} />
          <Module6 user={userData} allCourses={courses} isLoading={isLoading} setFirstLoad={setFirstLoad} innerWidth={innerWidth} /> */}
          <Module5 user={userData} course={courses} isLoading={isLoading} firstLoad={firstLoad} innerWidth={innerWidth} />
        </ModuleContain>
      </PreviewContain>
    </>
  )
}
export default Preview;