

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
import { getCourses, getWholeCourses } from "../../store/actions/courseActions";
import Module6 from "./Module6/Module6";


const Preview = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [courses, setCourses] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [firstLoad, setFirstLoad] = useState(true);
  const [secondLoad, setSecondLoad] = useState(true);
  const [thirdLoad, setThirdLoad] = useState(true);
  const [fourthLoad, setFourthLoad] = useState(true);
  const [fifthLoad, setFifthLoad] = useState(true);
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

  const getCourses = async () => {
    let tempCourses: Array<any> = [];
    getWholeCourses().then((response) => {
      response.forEach((element: any) => {
        if (element.totalLessons > 0) {
          element.totalDuration = hms(element.totalDuration)
          tempCourses.push(element)
        }
      });
      setCourses(tempCourses);
      setIsLoading(false);
    })
  }

  useEffect(() => {
    getCourses();
  }, [])

  useEffect(() => {
    fetchDB_data()
  }, [loggedIn])

  return (
    <>
      {/* <Background>
        <LoaderImage>
          <LoaderContain />
        </LoaderImage>
      </Background> : */}
      <PreviewContain>
        <Module1 user={userData} allCourses={courses[0]} isLoading={isLoading} />
        <ModuleContain>
          {userData && <Module2 user={userData} allCourses={courses} isLoading={isLoading} />}
          {userData && <Module3 user={userData} allCourses={courses} isLoading={isLoading} />}
          <Module4 user={userData} allCourses={courses} isLoading={isLoading} />
          <Module6 user={userData} allCourses={courses} isLoading={isLoading} setFirstLoad={setFirstLoad} />
          <Module5 user={userData} course={courses} isLoading={isLoading} firstLoad={firstLoad} />
        </ModuleContain>
      </PreviewContain>
    </>
  )
}
export default Preview;