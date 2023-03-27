import React, { useEffect, useState } from 'react'
import { createCoursesApi, deleteCourseApi, getCoursesApi, updateCourseApi } from '../../api/courses';
import { createProfessorApi, getProfessorApi, updateProfessorApi } from '../../api/professors';
import SideBar from '../SideBar';
import { AdminContain } from '../SideBar.styled';

const Courses = () => {
  const [courses, setCourses] = useState<any>([]);
  const [prof, setProf] = useState<any>([]);
  const [prof2, setProf2] = useState<any>([]);
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
  const professorDemo = {
    name: "Andrei",
    about: "Hola soy andrei",
    image: "Prueba prof",
    sign: "Prueba prof"
  }
  const actualizarProf = {
    name: "kevin",
    about: "Hola soy andrei",
    image: "Prueba prof",
    sign: "Prueba prof"
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
  console.log(prof)
  console.log(prof2)
  useEffect(() => {
    getProfessorApi().then((res) => {
      setProf(res.data.data[0])
      res.data.data[0] = {
        id: res.data.data[0].id,
        name: "Carlos",
        about: "Hola soy andrei",
        image: "Prueba prof",
        sign: "Prueba prof"
      }
      setProf2(res.data.data[0])
    })
    getCoursesApi().then((res) => {
      res.data.data[0] = {
        id: res.data.data[0].id,
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
      setCourses(res.data.data[0]);
    });
  }, [])
  return (
    <AdminContain>
      <SideBar />
      Prof {prof?.name}
      <button onClick={() => createProfessorApi(professorDemo)}>agregar prof</button>
      <button onClick={() => updateProfessorApi(prof2)}>actualizar prof</button>
      {/* <button onClick={() => createCoursesApi(courseForTest)}>addCourse</button>
      <button onClick={() => updateCourseApi(courses)}>update Course</button> */}
      {/* <button onClick={() => deleteCourseApi(courses.id)}>delete Course</button> */}
    </AdminContain>

  )
}
export default Courses;