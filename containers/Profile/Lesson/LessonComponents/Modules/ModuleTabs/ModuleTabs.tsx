

import { useEffect, useState } from "react";

import { BsPlayBtn } from "react-icons/bs";
import { IoPlaySkipBackSharp, IoPlaySkipForwardSharp } from "react-icons/io5";
import { SlNotebook } from "react-icons/sl";
import { TfiCommentAlt } from "react-icons/tfi";

import { user } from "firebase-functions/v1/auth";
import { useRouter } from "next/router";

import { getHomeworkUserApi } from "../../../../../../components/api/homeworks";
import { LESSON_PATH } from "../../../../../../constants/paths";
import { Titles } from "../Module.styled";

interface IModule {
  value: number;
  changeValue: (val: number) => void;
  nextLesson: any;
  previousLesson: any;
  course: any;
  firstLesson: boolean;
  lastLesson: boolean;
  user: any;
  blockForNextSeason: boolean
  data: any;
}
const ModuleTabs = (props: IModule) => {
  const { data, user, value, changeValue, blockForNextSeason, nextLesson, previousLesson, course, firstLesson, lastLesson } = props;
  const router = useRouter();

  const [approvedHw, setApprovedHw] = useState(false)

  const params = window.location.search
  const urlParams = new URLSearchParams(params)
  let szn = urlParams.get('season')
  let less = urlParams.get('lesson')

  const moveToNextLesson = () => {
    if (!lastLesson && !blockForNextSeason && checkComplete() && !!approvedHw) {
      router.push({
        pathname: LESSON_PATH,
        query: { id: course.id, season: nextLesson.seasonIndex, lesson: nextLesson.lessonIndex },
      })
    }

  }
  const moveToPreviousLesson = () => {
    if (!firstLesson) {
      router.push({
        pathname: LESSON_PATH,
        query: { id: course.id, season: previousLesson.seasonIndex, lesson: previousLesson.lessonIndex },
      })
    }
  }

  const checkHw = () => {
    if (course.sequential === 1) {
      setApprovedHw(false)
      if (!!data.lesson_homeworks) {
        let tempData = {
          lessonId: data.id,
          user_id: user.user_id
        }
        getHomeworkUserApi(tempData).then((res) => {
          if (res.data.data.length > 0) {
            if (res.data.data[0].approved === 1 && res.data.data[0].status === 1) {
              setApprovedHw(true)
            } else {
              setApprovedHw(false)
            }
          } else {
            setApprovedHw(false);
          }
        }
        )
      } else {
        setApprovedHw(true)
      }
    } else {
      setApprovedHw(true)
    }
  }

  useEffect(() => {
    checkHw()
  }, [setApprovedHw])

  const checkComplete = () => {
    if (course.sequential === 1) {
      if (szn && less) {
        let s = parseInt(szn)
        let l = parseInt(less)
        let check: any
        course.seasons[s].lessons[l].users.forEach((e: any) => {
          if (user.user_id === e) {
            check = true
          }
        });
        if (check === undefined) {
          return false
        } else {
          return check
        }
      }
    } else {
      return true
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
      {
        course.sequential === 0 &&
        <div className='button-container'>
          <div className='button-data' onClick={moveToPreviousLesson}>
            <IoPlaySkipBackSharp className='btn-icon' style={firstLesson ? { color: "gray" } : {}} />
            <p className={'btn-text ' + (firstLesson ? "gray" : "")} style={{ maxWidth: 57 }}>Lección <br />anterior</p>
          </div>
          <div className='button-data' onClick={moveToNextLesson}>
            <p className={'btn-text ' + ((lastLesson || blockForNextSeason || !checkComplete() || !approvedHw) ? "gray" : "")} style={{ maxWidth: 67 }}> Siguiente<br />Lección</p>
            <IoPlaySkipForwardSharp className='btn-icon' style={(lastLesson || blockForNextSeason || !checkComplete() || !approvedHw) ? { color: "gray" } : {}} />
          </div>
        </div>
      }

    </div>
  )
}
export default ModuleTabs;