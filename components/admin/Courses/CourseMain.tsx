import React, { useEffect, useState } from "react";

import { collection, onSnapshot, query, DocumentData } from "firebase/firestore";

import { db } from "../../../firebase/firebaseConfig";
import { Title } from "../General/General.styled";
import SideBar from "../SideBar";
import { AdminContain } from "../SideBar.styled";
import { AllCourses } from "./AllCourses";
import { CourseFormContain } from "./CourseMain.styled";
import CourseForm_Create from "./Form/CourseForm_Create";
import { getWholeCourses } from "../../../store/actions/courseActions";

const CourseMain = () => {


  const [courses, setCourses] = useState<any>(null);

  const fetchDB_data = () => {
    getWholeCourses().then((res) => {
      setCourses(res);
      return res;
    })
  }
  useEffect(() => {
    fetchDB_data()
  }, [])

  return (
    <AdminContain>
      <SideBar />
      <CourseFormContain>
        <CourseForm_Create></CourseForm_Create>
        {courses !== null
          ? <>
            {
              courses.map((e: any, i: any) => (
                <AllCourses key={"courses" + i}
                  course={e} />
              ))
            }
          </>
          :
          <>
            Sin cursos...
          </>
        }
      </CourseFormContain>
    </AdminContain>
  )
}
export default CourseMain;