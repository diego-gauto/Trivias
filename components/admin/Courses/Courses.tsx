import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { collection, doc, DocumentData, documentId, onSnapshot, query, where } from "firebase/firestore";

import { db } from "../../../firebase/firebaseConfig";
import SideBar from '../SideBar';
import { AdminContain } from '../SideBar.styled';
import { PurpleButton } from './AllCourses.styled';
import {
  BackgroundOverlay,
  ButtonContain,
  Container, CourseContain,
  ImageBack, Imagecontain, NewText, Subtitle,
  Title
} from './Courses.styled';
import CourseForm_Update from './Form/CourseForm_Update';
import Lessons from './Form/Lessons';


const Courses = () => {


  const [isLoading, setIsLoading] = useState(true);
  var courseID: any = ""


  try {
    var str: any = ""
    var arr: any = []
    str = window.location.search;
    arr = str.split("?documentID=")
    str = arr[1]
    courseID = str

  } catch (error) {
    courseID = "none"
  }

  const [courseData, setCoursesData] = useState<any>(null);

  useEffect(() => {
    console.log(courseID)
    fetchDB_data()
  }, [courseID])

  useEffect(() => {
    if (courseData !== null) {

      setIsLoading(false)
    }
  }, [courseData])

  //firestore query from specific document in a collection with ID
  const fetchDB_data = async () => {
    try {
      console.log("hello")
      return await db.collection('courses').get().then((response) => {
        var data: DocumentData = [];
        response.forEach((e) => {

          if (e.id == courseID) {

            var obj: any = {}
            obj = e.data()
            data.push(obj)
          }
        });
        setCoursesData(data)
        return data
      })
    } catch (error) {
      console.log(error)
      return false
    }
  }


  return (
    <>
      {!isLoading ? (

        <AdminContain>
          <SideBar />
          <CourseContain>
            <Imagecontain>
              <ImageBack
                src="/images/admin/Courses/DemoBack.png"
                layout="fill"
                priority />
              <BackgroundOverlay />
            </Imagecontain>

            <Container>
              <NewText>Nuevo</NewText>
              <Title>Curso de Uñas Francesas</Title>
              <Subtitle>Descubre un nuevo método para tus uñas este San Valentín</Subtitle>

            </Container>
            {/* Form de cursos */}
            {
              courseData !== null
                ?
                <CourseForm_Update courseTittle={courseData[0].courseTittle}
                  courseAbout={courseData[0].courseAbout}
                  courseCategory={courseData[0].courseCategory}
                  courseDuration={courseData[0].courseDuration}
                  coursePrice={courseData[0].coursePrice}
                  courseProfessor={courseData[0].courseProfessor}
                  coursePublishYear={courseData[0].coursePublishYear}
                  courseSubtittle={courseData[0].courseSubtittle}
                  index={0}
                  documentID={courseID} />
                :
                <></>
            }

            {/* Lista de lecciones */}
            <Lessons />
            <ButtonContain>
              <Link href="/admin/Courses">
                <PurpleButton>Regresar</PurpleButton>
              </Link>
            </ButtonContain>
          </CourseContain>
        </AdminContain>
      ) : (
        <></>
      )}
    </>
  )
}
export default Courses;