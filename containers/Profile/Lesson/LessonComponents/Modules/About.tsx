import React, { useState } from 'react'
import { AboutContain, TextContainer, LessonTitle, LessonContent } from './About.styled';
import { TitleContain } from './Module.styled';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, } from 'react-icons/md';
import ModuleTabs from './ModuleTabs/ModuleTabs';

const About = ({ value, blockForNextSeason, changeValue, data, teacherCreds, course, nextLesson, previousLesson, firstLesson, lastLesson }: any) => {
  const defaultImg = "/images/teachers/Brenda_instructora.jpg";
  const [index, setIndex] = useState<number>(0)
  return (
    <>
      <TitleContain>
        <ModuleTabs value={value} blockForNextSeason={blockForNextSeason} changeValue={changeValue} nextLesson={nextLesson} previousLesson={previousLesson} courseId={course.id} firstLesson={firstLesson} lastLesson={lastLesson} />
        <div className='line'></div>
      </TitleContain>
      <AboutContain>
        <TextContainer>
          <LessonTitle>
            {data.title}, <span>de {teacherCreds[0]?.name}</span>
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
      </AboutContain>
    </>
  )
}
export default About;