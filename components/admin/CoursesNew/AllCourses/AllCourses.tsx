import React, { useState } from 'react'
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';
import { IAllCourses } from './IAllCourses';
const AllCourses = (props: IAllCourses) => {
  const {
    title,
    subtitle,
    about,
    difficulty,
    sequential,
    certificate_color,
    rating,
    reviews,
    image,
    type,
    price,
    duration,
    phrase,
    mandatory,
    id,
    index,
  } = props;
  const [openCourseEdit, setOpenCourseEdit] = useState<number>(-1);
  const GonvarImg = "/images/purchase/logo.png";
  const openCourse = (courseIndex: number) => {
    setOpenCourseEdit(courseIndex);
  }
  const editCourse = () => {

  }
  const deleteCourse = () => {

  }
  return (
    <div className="edit-course">
      <div className="title-contain">
        <p className="title">{title} {type === "Monthly" && <img src={GonvarImg} style={{ width: 30 }} />}</p>
        {
          index === openCourseEdit
            ? <RiArrowDropUpLine className="arrow" onClick={() => openCourse(-1)} />
            : <RiArrowDropDownLine className="arrow" onClick={() => openCourse(index)} />
        }
      </div>
      {
        index === openCourseEdit &&
        <div className="course-content">
          <div className="rows">
            <div className="course-data">
              <label className="course-data-title">
                Título
              </label>
              <p className="content">
                {title}
              </p>
            </div>
            <div className="course-data">
              <label className="course-data-title">
                Subtítulo
              </label>
              <p className="content">
                {subtitle}
              </p>
            </div>
            <div className="course-data">
              <label className="course-data-title">
                Descripción
              </label>
              <p className="content">
                {about}
              </p>
            </div>
          </div>
          <div className="rows">
            <div className="course-data">
              <label className="course-data-title">
                Dificultad
              </label>
              <p className="content">
                {difficulty}
              </p>
            </div>
            <div className="course-data">
              <label className="course-data-title">
                Secuencial
              </label>
              <p className="content">
                {sequential ? "Secuencial" : "No secuencial"}
              </p>
            </div>
            <div className="course-data">
              <label className="course-data-title">
                Color
              </label>
              <p className="content">
                {certificate_color}
              </p>
            </div>
          </div>
          <div className="rows">
            <div className="course-data">
              <label className="course-data-title">
                Calificación
              </label>
              <p className="content">
                {rating}
              </p>
            </div>
            <div className="course-data">
              <label className="course-data-title">
                Reviews
              </label>
              <p className="content">
                {reviews}
              </p>
            </div>
            <div className="course-data">
              <label className="course-data-title">
                Tipo
              </label>
              <p className="content">
                {type}
              </p>
            </div>
          </div>
          <div className="rows">
            <div className="course-data">
              <label className="course-data-title">
                Precio
              </label>
              <p className="content">
                {price}
              </p>
            </div>
            <div className="course-data">
              <label className="course-data-title">
                Duracion
              </label>
              <p className="content">
                {type === "Monthly" ? "30 Dias" : duration}
              </p>
            </div>
            <div className="course-data">
              <label className="course-data-title">
                Frase descriptiva
              </label>
              <p className="content">
                {phrase}
              </p>
            </div>
          </div>
          <div className="rows" style={{ justifyContent: "center" }}>
            <div className="button-data">
              <button
                className="edit-button"
                onClick={() => editCourse()}
              >
                Editar
              </button>
            </div>
            <div className="button-data">
              <button
                className="delete-button"
                onClick={() => deleteCourse()}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      }
    </div>
  )
}
export default AllCourses;