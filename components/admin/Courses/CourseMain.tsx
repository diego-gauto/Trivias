import React, { useEffect, useState } from 'react'
import { collection, DocumentData, documentId, onSnapshot, query, where } from "firebase/firestore";

import { db } from "../../../firebase/firebaseConfig";
import SideBar from '../SideBar';
import { AdminContain } from '../SideBar.styled';
import { AllCourses } from './AllCourses';
import {
  CourseFormContain, InputForm, InputContain,
  Label, Input, InputBig, InputContain2,
  IconContain, Folder, InputIcon,
  Button, ButtonContain, Title,
} from './CourseMain.styled';
import
CourseForm_Create
  from './Form/CourseForm_Create';
const CourseMain = () => {



  //declare any object in state
  const [courses, setCourses] = useState<any>(null);



  //Call firestore user data
  useEffect(() => {
    fetchDB_data()
  }, [])

  //firestore query from auth data
  const fetchDB_data = async () => {
    try {
      const query_1 = query(collection(db, "courses"));
      return onSnapshot(query_1, (response) => {
        var data: DocumentData = [];

        response.forEach((e) => {
          var obj: any = {}
          obj = e.data()
          obj["documentID"] = e.id
          data.push(obj)
        });
        setCourses(data)
        console.log(data)
        return data
      })
    } catch (error) {
      return false
    }
  }


  return (
    <AdminContain>
      <SideBar />
      <CourseFormContain>

        <CourseForm_Create></CourseForm_Create>

        {courses !== null
          ? <>
            {
              courses.map((e: any, i: any) => (


                <AllCourses courseTittle={e.courseTittle}
                  courseAbout={e.courseAbout}
                  courseCategory={e.courseCategory}
                  courseDuration={e.courseDuration}
                  coursePrice={e.coursePrice}
                  courseProfessor={e.courseProfessor}
                  coursePublishYear={e.coursePublishYear}
                  courseSubtittle={e.courseSubtittle}
                  index={i}
                  documentID={e.documentID} />

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