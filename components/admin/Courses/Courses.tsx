import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { collection, DocumentData, documentId, onSnapshot, query, where } from "firebase/firestore";

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
import CourseForm from './Form/CourseForm';
import Lessons from './Form/Lessons';


const Courses = () => {

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

  //declare any object in state
  const [courses, setCourses] = useState<any>(null);



  //Call firestore user data
  useEffect(() => {



    console.log(str)

    //fetchDB_data()
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
        <CourseForm />
        {/* Lista de lecciones */}
        <Lessons />
        <ButtonContain>
          <Link href="/admin/Courses">
            <PurpleButton>Regresar</PurpleButton>
          </Link>
        </ButtonContain>
      </CourseContain>
    </AdminContain>
  )
}
export default Courses;