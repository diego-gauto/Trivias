import React, { useEffect, useState } from 'react'
import { createCoursesApi, getCoursesApi, updateCourseApi } from '../../api/courses';
import SideBar from '../SideBar';
import { AdminContain } from '../SideBar.styled';

const Courses = () => {
  const [courses, setCourses] = useState<any>([]);
  const course = {
    title: "",
    subtitle: "",
    about: "",
    certificate_color: "",
    difficulty: "",
    mandatory: false,
    image: "",
    phrase: "",
    price: 0,
    rating: 0,
    reviews: 0,
    type: "",
    sequential: false,
  }
  const courseForTest = {
    title: "Curso de prueba",
    subtitle: "Curso de prueba",
    about: "Curso de prueba",
    certificate_color: "#ffffff",
    difficulty: "Curso de prueba",
    mandatory: false,
    image: "Curso de prueba",
    phrase: "Curso de prueba",
    price: 10,
    rating: 50,
    reviews: 20,
    type: "Gratis",
    sequential: false,
  }
  const courseForUpdate = {
    title: "Curso de prueba actualizar",
    subtitle: "Curso de prueba actualizar",
    about: "Curso de prueba actualizar",
    certificate_color: "#ffffff",
    difficulty: "Curso de prueba actualizar",
    mandatory: false,
    image: "Curso de prueba actualizar",
    phrase: "Curso de prueba actualizar",
    price: 150,
    rating: 40,
    reviews: 30,
    type: "Gratis",
    sequential: true,
  }
  useEffect(() => {
    getCoursesApi().then((res) => {
      console.log(res.data.data[0]);
      setCourses(res.data.data[0]);
    });
  }, [])
  return (
    <AdminContain>
      <SideBar />
      Courses {courses?.title}
      <button onClick={() => createCoursesApi(courseForTest)}>addCourse</button>
      <button onClick={() => updateCourseApi(courseForUpdate)}>update Course</button>
    </AdminContain>

  )
}
export default Courses;