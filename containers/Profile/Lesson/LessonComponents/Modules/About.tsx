import React, { useState } from "react";

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

import { AboutContain, LessonContent, LessonTitle, TextContainer } from "./About.styled";
import { TitleContain } from "./Module.styled";
import ModuleTabs from "./ModuleTabs/ModuleTabs";
import ModalMaterials from "../../../../../components/CourseModal/Materials/ModalMaterials";

const About = ({ value, blockForNextSeason, changeValue, data, teacherCreds, course, nextLesson, previousLesson, firstLesson, lastLesson, user }: any) => {
  const defaultImg = "/images/teachers/Brenda_instructora.jpg";
  const [showMaterial, setShowMaterial] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);
  const openMaterial = () => {
    setShowMaterial(true);
  }
  return (
    <>
      <TitleContain>
        <ModuleTabs data={data} user={user} value={value} blockForNextSeason={blockForNextSeason} changeValue={changeValue} nextLesson={nextLesson} previousLesson={previousLesson} course={course} firstLesson={firstLesson} lastLesson={lastLesson} />
        <div className='line'></div>
      </TitleContain>
      <AboutContain>
        <TextContainer>
          <LessonTitle>
            {course.title}, <span>de {teacherCreds[0]?.name}</span>
          </LessonTitle>
          <LessonContent>
            <p className='title'>Objetivo principal</p>
            <p>{course.about}.</p>
            {
              data.lesson_material.length > 0 &&
              <>
                <p className='support-material'>Material de Apoyo</p>
                <div className="order-material">
                  {
                    data.lesson_material.map((extra: any, index: number) => {
                      return (
                        <a key={"extra_material_" + index} className='pdf' target="_blank" download={extra.material} href={extra.material}>{index + 1}. {extra.title}</a>
                      )
                    })
                  }
                </div>
              </>
            }
            {/* <p className='title'>Materiales</p>
            <p>Da click en el botón de abajo para que puedas ver los materiales que necesitarás para este curso.</p>
            <button className="btn-material" onClick={openMaterial}>
              Comprar materiales
            </button> */}
          </LessonContent>
        </TextContainer>
        <div className='teacher-container'>
          <img src={teacherCreds[index]?.image ? teacherCreds[index]?.image : defaultImg} alt="" />
          {teacherCreds.length > 1 && <MdKeyboardArrowLeft className='left' onClick={() => {
            if (index === 0) {
              setIndex(teacherCreds.length - 1)
            } else {
              setIndex(index - 1)
            }
          }} />}
          {teacherCreds.length > 1 && < MdKeyboardArrowRight className='right' onClick={() => {
            if (index === teacherCreds.length - 1) {
              setIndex(0)
            } else {
              setIndex(index + 1)
            }
          }} />}
          <p className='title'>Conoce a <br />
            <span>tu instructor</span>
          </p>
          <p>{teacherCreds[index]?.about}</p>
        </div>
        <ModalMaterials
          show={showMaterial}
          setShow={setShowMaterial}
          materials={course.materials}
          route={course.material_route}
        />
      </AboutContain>
    </>
  )
}
export default About;