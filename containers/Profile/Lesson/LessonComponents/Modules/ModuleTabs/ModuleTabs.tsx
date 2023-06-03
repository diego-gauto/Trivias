import React from 'react'
import { PositionTitle, Titles } from '../Module.styled'
import { BsPlayBtn } from 'react-icons/bs'
import { SlNotebook } from 'react-icons/sl'
import { TfiCommentAlt } from 'react-icons/tfi'
import { IoPlaySkipBackSharp, IoPlaySkipForwardSharp } from 'react-icons/io5'
import { useRouter } from 'next/router'

interface IModule {
  value: number;
  changeValue: (val: number) => void;
  nextLesson: any;
  previousLesson: any;
  course: any;
  firstLesson: boolean;
  lastLesson: boolean;
  blockForNextSeason: boolean
}
const ModuleTabs = (props: IModule) => {
  const { value, changeValue, blockForNextSeason, nextLesson, previousLesson, course, firstLesson, lastLesson } = props;
  const router = useRouter();
  const moveToNextLesson = () => {
    if (!lastLesson && !blockForNextSeason) {
      router.push({
        pathname: 'Lesson',
        query: { id: course.id, season: nextLesson.seasonIndex, lesson: nextLesson.lessonIndex },
      })
    }
  }
  const moveToPreviousLesson = () => {
    if (!firstLesson) {
      router.push({
        pathname: 'Lesson',
        query: { id: course.id, season: previousLesson.seasonIndex, lesson: previousLesson.lessonIndex },
      })
    }
  }
  console.log(course);
  return (
    <div className='tab-container'>
      <div className='tabs'>
        <Titles style={value === 1 ? { fontWeight: 600 } : {}} onClick={() => {
          changeValue(1)
        }}>
          <BsPlayBtn></BsPlayBtn>
          Acerca del curso
        </Titles>
        <Titles style={value === 3 ? { fontWeight: 600 } : {}} onClick={() => {
          changeValue(3)
        }}>
          <SlNotebook></SlNotebook>
          Evaluación
        </Titles>
        <Titles style={value === 4 ? { fontWeight: 600 } : {}} onClick={() => {
          changeValue(4)
        }}>
          <TfiCommentAlt></TfiCommentAlt>
          Comentarios
        </Titles>
      </div>
      {
        (course.sequential === 0) &&
        <div className='button-container'>
          <div className='button-data' onClick={moveToPreviousLesson}>
            <IoPlaySkipBackSharp className='btn-icon' style={firstLesson ? { color: "gray" } : {}} />
            <p className={'btn-text ' + (firstLesson ? "gray" : "")} style={{ maxWidth: 57 }}>Lección <br />anterior</p>
          </div>
          <div className='button-data' onClick={moveToNextLesson}>
            <p className={'btn-text ' + ((lastLesson || blockForNextSeason) ? "gray" : "")} style={{ maxWidth: 67 }}> Siguiente<br />Lección</p>
            <IoPlaySkipForwardSharp className='btn-icon' style={(lastLesson || blockForNextSeason) ? { color: "gray" } : {}} />
          </div>
        </div>
      }
    </div>
  )
}
export default ModuleTabs;