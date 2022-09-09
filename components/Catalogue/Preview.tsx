

import Module1 from "./Module1/Module1";
import Module2 from "./Module2/Module2";
import Module3 from "./Module3/Module3";
import Module4 from "./Module4/Module4";
import Module5 from "./Module5/Module5";
import { ModuleContain, PreviewContain } from "./Preview.styled";
import { Background, LoaderContain, LoaderImage } from "../../screens/Login.styled";
import { collection, onSnapshot, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { getWholeCourses } from "../../store/actions/courseActions";


const Preview = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [courses, setCourses] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  const getCourses = () => {
    getWholeCourses().then((response) => {
      setCourses(response);
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
      {isLoading ? <Background>
        <LoaderImage>
          <LoaderContain />
        </LoaderImage>
      </Background> :
        <PreviewContain>
          <Module1 user={userData} allCourses={courses[0]} />
          <ModuleContain>
            {userData && <Module2 user={userData} />}
            {userData && <Module3 user={userData} allCourses={courses} />}
            <Module4 user={userData} allCourses={courses} />
          </ModuleContain>
          <Module5 user={userData} course={courses} />
        </PreviewContain>}
    </>
  )
}
export default Preview;