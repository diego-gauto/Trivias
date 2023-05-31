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
  courseId: number;
  firstLesson: boolean;
  lastLesson: boolean;
}
const ModuleTabs = (props: IModule) => {
  const { value, changeValue, nextLesson, previousLesson, courseId, firstLesson, lastLesson } = props;
  const router = useRouter();
  const moveToNextLesson = () => {
    if (!lastLesson) {
      router.push({
        pathname: 'Lesson',
        query: { id: courseId, season: nextLesson.seasonIndex, lesson: nextLesson.lessonIndex },
      })
    }
  }
  const moveToPreviousLesson = () => {
    if (!firstLesson) {
      router.push({
        pathname: 'Lesson',
        query: { id: courseId, season: previousLesson.seasonIndex, lesson: previousLesson.lessonIndex },
      })
    }
  }
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
      <div className='button-container'>
        <div className='button-data' onClick={moveToPreviousLesson}>
          <IoPlaySkipBackSharp className='btn-icon' style={firstLesson ? { color: "gray" } : {}} />
          <p className={'btn-text ' + (firstLesson ? "gray" : "")} style={{ maxWidth: 57 }}>Lección <br />anterior</p>
        </div>
        <div className='button-data' onClick={moveToNextLesson}>
          <p className={'btn-text ' + (lastLesson ? "gray" : "")} style={{ maxWidth: 67 }}> Siguiente<br />Lección</p>
          <IoPlaySkipForwardSharp className='btn-icon' style={lastLesson ? { color: "gray" } : {}} />
        </div>
      </div>
    </div>
  )
}
export default ModuleTabs;