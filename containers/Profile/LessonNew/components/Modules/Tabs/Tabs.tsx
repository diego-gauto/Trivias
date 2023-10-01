

import { useEffect, useState } from "react";

import { BsPlayBtn } from "react-icons/bs";
import { IoPlaySkipBackSharp, IoPlaySkipForwardSharp } from "react-icons/io5";
import { SlNotebook } from "react-icons/sl";
import { TfiCommentAlt } from "react-icons/tfi";
import { FcSupport } from 'react-icons/fc'
import { user } from "firebase-functions/v1/auth";
import { useRouter } from "next/router";

import { getHomeworkUserApi } from "../../../../../../components/api/homeworks";
import { LESSON_PATH, SUPPORT_PATH } from "../../../../../../constants/paths";
import Link from "next/link";
import { Titles } from "../Modules.styled";

interface IModule {
  value: number;
  changeValue: (val: number) => void;
}
const ModuleTabs = (props: IModule) => {
  const { value, changeValue, } = props;

  return (
    <div className='tab-container'>
      <div className='tabs'>
        <Titles style={value === 1 ? { fontWeight: 800 } : {}} onClick={() => {
          changeValue(1)
        }}>
          <BsPlayBtn></BsPlayBtn>
          Acerca del curso
        </Titles>
        <Titles style={value === 3 ? { fontWeight: 800 } : {}} onClick={() => {
          changeValue(3)
        }}>
          <SlNotebook></SlNotebook>
          Evaluación
        </Titles>
        <Titles style={value === 4 ? { fontWeight: 800 } : {}} onClick={() => {
          changeValue(4)
        }}>
          <TfiCommentAlt></TfiCommentAlt>
          Comentarios
        </Titles>
        <Titles style={value === 5 ? { fontWeight: 800 } : {}} onClick={() => {
          changeValue(5)
        }}>
          <FcSupport className="icon" />
          Ayuda
        </Titles>
      </div>
      {/* {
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
      } */}
    </div>
  )
}
export default ModuleTabs;