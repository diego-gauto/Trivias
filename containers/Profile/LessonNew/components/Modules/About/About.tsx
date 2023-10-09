import React, { useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { AboutContain, LessonContent, LessonTitle, TextContainer } from "./About.styled";
import ModalMaterials from "../../../../../../components/Modals/CourseModal/Materials/ModalMaterials";

interface IAbout {
  lesson: any,
  course: any,
}
const About = (props: IAbout) => {
  const { lesson, course } = props;
  const defaultImg = "/images/teachers/Brenda_instructora.jpg";
  const [showMaterial, setShowMaterial] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);

  const openMaterial = () => {
    setShowMaterial(true);
  }


  return (
    <AboutContain>
      <TextContainer>
        <LessonTitle>
          {course.title}, <span>de {course.professors[index].name}</span>
        </LessonTitle>
        <LessonContent>
          <p className='title'>Objetivo principal</p>
          <p>{course.about}.</p>
          {
            lesson.lesson_material.length > 0 &&
            <>
              <p className='support-material'>Material de Apoyo</p>
              <div className="order-material">
                {
                  lesson.lesson_material.map((extra: any, index: number) => {
                    return (
                      <a key={"extra_material_" + index} className='pdf' target="_blank" download={extra.material} href={extra.material}>{index + 1}. {extra.title}</a>
                    )
                  })
                }
              </div>
            </>
          }
          <p className='title'>Materiales</p>
          <p>Da click en el botón de abajo para que puedas ver los materiales que necesitarás para este curso.</p>
          <button className="btn-material" onClick={openMaterial}>
            Ver materiales
          </button>
        </LessonContent>
      </TextContainer>
      <div className='teacher-container'>
        <img src={course.professors[index]?.image ? course.professors[index]?.image : defaultImg} alt="" />
        {course.professors.length > 1 && <MdKeyboardArrowLeft className='left' onClick={() => {
          if (index === 0) {
            setIndex(course.professors.length - 1)
          } else {
            setIndex(index - 1)
          }
        }} />}
        {course.professors.length > 1 && < MdKeyboardArrowRight className='right' onClick={() => {
          if (index === course.professors.length - 1) {
            setIndex(0)
          } else {
            setIndex(index + 1)
          }
        }} />}
        <p className='title'>Conoce a <br />
          <span>tu instructor</span>
        </p>
        <p>{course.professors[index]?.about}</p>
      </div>
      <ModalMaterials
        show={showMaterial}
        setShow={setShowMaterial}
        materials={course.materials}
        route={course.material_route}
      />
    </AboutContain>
  )
}
export default About;